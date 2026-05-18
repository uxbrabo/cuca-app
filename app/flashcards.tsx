import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Animated, PanResponder, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

const { width: SCREEN_W } = Dimensions.get('window');

type Deck = {
  id: string; subject: string; icon: string; color: string;
  total: number; due: number; mastered: number;
};

type Card = { id: string; front: string; back: string; difficulty?: 'facil' | 'medio' | 'dificil' };

const DECKS: Deck[] = [
  { id: '1', subject: 'Matemática', icon: 'calculator-variant', color: Colors.primary, total: 48, due: 12, mastered: 30 },
  { id: '2', subject: 'Física', icon: 'atom', color: '#7B1FA2', total: 35, due: 8, mastered: 22 },
  { id: '3', subject: 'Química', icon: 'flask', color: '#E91E63', total: 28, due: 5, mastered: 18 },
  { id: '4', subject: 'Biologia', icon: 'dna', color: Colors.success, total: 42, due: 15, mastered: 20 },
  { id: '5', subject: 'História', icon: 'book-open-variant', color: Colors.warning, total: 30, due: 3, mastered: 26 },
  { id: '6', subject: 'Português', icon: 'pen', color: Colors.info, total: 25, due: 10, mastered: 12 },
];

const SAMPLE_CARDS: Card[] = [
  { id: '1', front: 'O que é a Lei de Ohm?', back: 'A Lei de Ohm estabelece que a tensão (V) em um resistor é proporcional à corrente (I): V = R × I, onde R é a resistência.' },
  { id: '2', front: 'Qual é a fórmula da área do círculo?', back: 'A = π × r², onde r é o raio do círculo e π ≈ 3,14159.' },
  { id: '3', front: 'O que é mitose?', back: 'Mitose é o processo de divisão celular que origina duas células-filhas geneticamente idênticas à célula-mãe, com o mesmo número de cromossomos.' },
  { id: '4', front: 'Quem foi Dom Pedro II?', back: 'Dom Pedro II foi o segundo e último Imperador do Brasil (1841–1889), conhecido por modernizar o país e abolir a escravidão com a Lei Áurea em 1888.' },
  { id: '5', front: 'O que é a tabela periódica?', back: 'É uma tabela que organiza os elementos químicos em ordem crescente de número atômico, agrupados por propriedades similares em períodos e grupos.' },
];

type ScreenView = 'decks' | 'study';

function FlipCard({ card, onResult }: { card: Card; onResult: (r: 'facil' | 'medio' | 'dificil') => void }) {
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flip = () => {
    if (flipped) return;
    Animated.spring(flipAnim, { toValue: 1, useNativeDriver: true, friction: 8 }).start();
    setFlipped(true);
  };

  const frontInterp = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterp = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  return (
    <View style={fc.wrap}>
      <TouchableOpacity onPress={flip} activeOpacity={0.9} style={{ alignItems: 'center' }}>
        {/* FRONT */}
        <Animated.View style={[fc.card, { transform: [{ rotateY: frontInterp }] }, flipped && fc.hidden]}>
          <Icon name="help-circle-outline" size={40} color={Colors.primary} style={{ marginBottom: Spacing.md }} />
          <Text style={fc.cardLabel}>PERGUNTA</Text>
          <Text style={fc.cardText}>{card.front}</Text>
          <View style={fc.tapHint}>
            <Icon name="gesture-tap" size={16} color={Colors.textDisabled} />
            <Text style={fc.tapHintText}>Toque para revelar</Text>
          </View>
        </Animated.View>

        {/* BACK */}
        <Animated.View style={[fc.card, fc.cardBack, { transform: [{ rotateY: backInterp }] }, !flipped && fc.hidden]}>
          <Icon name="lightbulb-on" size={40} color={Colors.success} style={{ marginBottom: Spacing.md }} />
          <Text style={[fc.cardLabel, { color: Colors.success }]}>RESPOSTA</Text>
          <Text style={fc.cardText}>{card.back}</Text>
        </Animated.View>
      </TouchableOpacity>

      {flipped && (
        <View style={fc.ratingRow}>
          <Text style={fc.ratingLabel}>Como foi?</Text>
          <View style={fc.ratingBtns}>
            <TouchableOpacity style={[fc.ratingBtn, { backgroundColor: Colors.error + '15', borderColor: Colors.error }]} onPress={() => onResult('dificil')}>
              <Icon name="emoticon-confused-outline" size={20} color={Colors.error} />
              <Text style={[fc.ratingBtnText, { color: Colors.error }]}>Difícil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[fc.ratingBtn, { backgroundColor: Colors.warning + '15', borderColor: Colors.warning }]} onPress={() => onResult('medio')}>
              <Icon name="emoticon-neutral-outline" size={20} color={Colors.warning} />
              <Text style={[fc.ratingBtnText, { color: Colors.warning }]}>Médio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[fc.ratingBtn, { backgroundColor: Colors.success + '15', borderColor: Colors.success }]} onPress={() => onResult('facil')}>
              <Icon name="emoticon-happy-outline" size={20} color={Colors.success} />
              <Text style={[fc.ratingBtnText, { color: Colors.success }]}>Fácil</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default function FlashcardsScreen() {
  const [view, setView] = useState<ScreenView>('decks');
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [results, setResults] = useState<Record<string, 'facil' | 'medio' | 'dificil'>>({});
  const [finished, setFinished] = useState(false);

  const startDeck = (deck: Deck) => {
    setActiveDeck(deck);
    setCardIndex(0);
    setResults({});
    setFinished(false);
    setView('study');
  };

  const handleResult = (r: 'facil' | 'medio' | 'dificil') => {
    const card = SAMPLE_CARDS[cardIndex];
    setResults(prev => ({ ...prev, [card.id]: r }));
    if (cardIndex + 1 >= SAMPLE_CARDS.length) {
      setFinished(true);
    } else {
      setCardIndex(i => i + 1);
    }
  };

  const facil = Object.values(results).filter(r => r === 'facil').length;
  const medio = Object.values(results).filter(r => r === 'medio').length;
  const dificil = Object.values(results).filter(r => r === 'dificil').length;

  if (view === 'study') {
    return (
      <SafeAreaView style={s.container} edges={['bottom']}>
        {/* HEADER STUDY */}
        <View style={s.studyHeader}>
          <TouchableOpacity onPress={() => setView('decks')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={s.studyTitle}>{activeDeck?.subject}</Text>
          {!finished && (
            <Text style={s.studyCount}>{cardIndex + 1}/{SAMPLE_CARDS.length}</Text>
          )}
        </View>

        {!finished ? (
          <>
            {/* PROGRESS */}
            <View style={s.studyProgressBg}>
              <View style={[s.studyProgressFill, { width: `${(cardIndex / SAMPLE_CARDS.length) * 100}%` }]} />
            </View>

            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
              <FlipCard key={cardIndex} card={SAMPLE_CARDS[cardIndex]} onResult={handleResult} />
            </ScrollView>
          </>
        ) : (
          <View style={s.finishWrap}>
            <View style={s.finishIcon}>
              <Icon name="check-decagram" size={56} color={Colors.success} />
            </View>
            <Text style={s.finishTitle}>Sessão concluída!</Text>
            <Text style={s.finishSub}>{SAMPLE_CARDS.length} cards revisados em {activeDeck?.subject}</Text>

            <View style={s.finishStats}>
              <View style={[s.finishStat, { backgroundColor: Colors.success + '15' }]}>
                <Text style={[s.finishStatValue, { color: Colors.success }]}>{facil}</Text>
                <Text style={s.finishStatLabel}>Fácil</Text>
              </View>
              <View style={[s.finishStat, { backgroundColor: Colors.warning + '15' }]}>
                <Text style={[s.finishStatValue, { color: Colors.warning }]}>{medio}</Text>
                <Text style={s.finishStatLabel}>Médio</Text>
              </View>
              <View style={[s.finishStat, { backgroundColor: Colors.error + '15' }]}>
                <Text style={[s.finishStatValue, { color: Colors.error }]}>{dificil}</Text>
                <Text style={s.finishStatLabel}>Difícil</Text>
              </View>
            </View>

            <Text style={s.nextReviewText}>
              {dificil > 0
                ? `${dificil} card(s) marcado(s) como difícil voltarão amanhã.`
                : 'Ótimo! Todos os cards estão em dia.'}
            </Text>

            <TouchableOpacity style={s.finishBtn} onPress={() => setView('decks')}>
              <Text style={s.finishBtnText}>Voltar aos baralhos</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* RESUMO */}
        <View style={s.summaryCard}>
          <View style={s.summaryItem}>
            <Text style={s.summaryValue}>89</Text>
            <Text style={s.summaryLabel}>para revisar hoje</Text>
          </View>
          <View style={s.summaryDivider} />
          <View style={s.summaryItem}>
            <Text style={[s.summaryValue, { color: Colors.success }]}>128</Text>
            <Text style={s.summaryLabel}>dominados</Text>
          </View>
          <View style={s.summaryDivider} />
          <View style={s.summaryItem}>
            <Text style={[s.summaryValue, { color: Colors.warning }]}>53</Text>
            <Text style={s.summaryLabel}>em revisão</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Meus baralhos</Text>
        {DECKS.map(deck => (
          <TouchableOpacity key={deck.id} style={s.deckCard} onPress={() => startDeck(deck)} activeOpacity={0.85}>
            <View style={[s.deckIcon, { backgroundColor: deck.color + '18' }]}>
              <Icon name={deck.icon} size={26} color={deck.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.deckTitleRow}>
                <Text style={s.deckSubject}>{deck.subject}</Text>
                {deck.due > 0 && (
                  <View style={s.dueBadge}>
                    <Text style={s.dueBadgeText}>{deck.due} para revisar</Text>
                  </View>
                )}
              </View>
              <View style={s.deckProgressBg}>
                <View style={[s.deckProgressFill, { width: `${(deck.mastered / deck.total) * 100}%`, backgroundColor: deck.color }]} />
              </View>
              <Text style={s.deckMeta}>{deck.mastered}/{deck.total} dominados</Text>
            </View>
            <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const fc = StyleSheet.create({
  wrap: { paddingHorizontal: Spacing.lg, gap: Spacing.lg },
  card: {
    width: SCREEN_W - Spacing.lg * 2,
    minHeight: 280,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    ...Shadows.md,
  },
  cardBack: { backgroundColor: Colors.surfaceVariant },
  hidden: { position: 'absolute', opacity: 0 },
  cardLabel: { ...Typography.overline, color: Colors.primary, fontWeight: '700', letterSpacing: 1.5, marginBottom: Spacing.sm },
  cardText: { ...Typography.body1, color: Colors.textPrimary, textAlign: 'center', lineHeight: 26 },
  tapHint: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: Spacing.lg },
  tapHintText: { ...Typography.caption, color: Colors.textDisabled },
  ratingRow: { gap: Spacing.sm },
  ratingLabel: { ...Typography.label, color: Colors.textSecondary, textAlign: 'center' },
  ratingBtns: { flexDirection: 'row', gap: Spacing.sm },
  ratingBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 10, borderRadius: Radius.md, borderWidth: 1.5,
  },
  ratingBtnText: { ...Typography.label, fontWeight: '700' },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: Spacing.sm },

  summaryCard: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
    justifyContent: 'space-around', alignItems: 'center',
  },
  summaryItem: { alignItems: 'center', gap: 3 },
  summaryValue: { ...Typography.h3, color: Colors.primary },
  summaryLabel: { ...Typography.caption, color: Colors.textSecondary },
  summaryDivider: { width: 1, height: 32, backgroundColor: Colors.divider },

  deckCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  deckIcon: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  deckTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 6, flexWrap: 'wrap' },
  deckSubject: { ...Typography.label, color: Colors.textPrimary },
  dueBadge: { backgroundColor: Colors.primary, borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  dueBadgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700', fontSize: 10 },
  deckProgressBg: { height: 4, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden', marginBottom: 3 },
  deckProgressFill: { height: 4, borderRadius: Radius.full },
  deckMeta: { ...Typography.caption, color: Colors.textSecondary },

  studyHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  studyTitle: { ...Typography.h4, color: Colors.textPrimary },
  studyCount: { ...Typography.label, color: Colors.textSecondary },
  studyProgressBg: { height: 4, backgroundColor: Colors.divider },
  studyProgressFill: { height: 4, backgroundColor: Colors.primary },

  finishWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  finishIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.success + '18', justifyContent: 'center', alignItems: 'center' },
  finishTitle: { ...Typography.h3, color: Colors.textPrimary },
  finishSub: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center' },
  finishStats: { flexDirection: 'row', gap: Spacing.md },
  finishStat: { flex: 1, alignItems: 'center', borderRadius: Radius.md, padding: Spacing.md, gap: 4 },
  finishStatValue: { ...Typography.h3, fontWeight: '700' },
  finishStatLabel: { ...Typography.caption, color: Colors.textSecondary },
  nextReviewText: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center' },
  finishBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.xl, paddingVertical: 14 },
  finishBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});
