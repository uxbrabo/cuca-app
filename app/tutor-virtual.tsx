import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
};

type Suggestion = { id: string; label: string; icon: string };

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1', role: 'ai',
    text: 'Olá, João! Sou o seu Tutor Virtual com IA. Analisei seu desempenho recente e identifiquei algumas oportunidades de melhoria. Como posso te ajudar hoje?',
    time: 'Agora',
  },
];

const SUGGESTIONS: Suggestion[] = [
  { id: '1', icon: 'brain', label: 'Explicar um conceito' },
  { id: '2', icon: 'alert-circle-outline', label: 'Revisar meus erros' },
  { id: '3', icon: 'map-marker-path', label: 'Sugerir próximas aulas' },
  { id: '4', icon: 'test-tube', label: 'Criar exercício de fixação' },
];

const AI_RESPONSES: Record<string, string> = {
  'Explicar um conceito': 'Claro! Sobre qual disciplina ou tema você quer uma explicação? Posso adaptar a linguagem ao seu nível atual.',
  'Revisar meus erros': 'Analisando seus últimos quizzes, percebi que você errou 3 das 5 questões de Sistemas de Equações. Vamos revisar juntos? Posso montar um resumo do conceito e alguns exercícios práticos.',
  'Sugerir próximas aulas': 'Com base no seu plano de estudos e desempenho, recomendo: 1) Vídeo — Expansão Territorial (História, 28 min), 2) Leitura — Leis de Newton (Física, 10 min), 3) Quiz — Funções do 2º Grau (Matemática). Quer que eu priorize alguma disciplina?',
  'Criar exercício de fixação': 'Gerando um exercício personalizado para você com base nos tópicos com menor taxa de acerto...\n\n**Questão:** Em um triângulo retângulo, os catetos medem 6 e 8 cm. Qual é o valor da hipotenusa?\n\na) 9 cm\nb) 10 cm ✓\nc) 12 cm\nd) 14 cm',
};

const INSIGHTS = [
  { icon: 'trending-up', color: Colors.success, label: 'Acertos em Física', value: '+18% esta semana' },
  { icon: 'trending-down', color: Colors.error, label: 'Desempenho em História', value: '45% — abaixo da meta' },
  { icon: 'fire', color: Colors.warning, label: 'Sequência de estudos', value: '7 dias consecutivos' },
  { icon: 'book-check', color: Colors.info, label: 'Conteúdos concluídos', value: '3 de 11 nesta trilha' },
];

export default function TutorVirtualScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [tab, setTab] = useState<'chat' | 'insights'>('chat');
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      time: 'Agora',
    };
    const aiResponse = AI_RESPONSES[text] || 'Entendido! Vou analisar isso e te dar uma resposta personalizada. Com base no seu histórico de aprendizagem, posso sugerir um conteúdo específico que vai te ajudar nesse tópico.';
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: aiResponse,
      time: 'Agora',
    };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.tutorAvatar}>
          <Icon name="robot-excited-outline" size={28} color={Colors.primary} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Tutor Virtual</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>IA ativa · personalizado para você</Text>
          </View>
        </View>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>IA</Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, tab === 'chat' && styles.tabActive]} onPress={() => setTab('chat')}>
          <Icon name="message-text-outline" size={16} color={tab === 'chat' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabLabel, tab === 'chat' && styles.tabLabelActive]}>Conversar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'insights' && styles.tabActive]} onPress={() => setTab('insights')}>
          <Icon name="chart-line-variant" size={16} color={tab === 'insights' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabLabel, tab === 'insights' && styles.tabLabelActive]}>Meu Diagnóstico</Text>
        </TouchableOpacity>
      </View>

      {tab === 'chat' ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View key={msg.id} style={[styles.messageWrap, msg.role === 'user' && styles.messageWrapUser]}>
                {msg.role === 'ai' && (
                  <View style={styles.aiAvatar}>
                    <Icon name="robot-excited-outline" size={18} color={Colors.primary} />
                  </View>
                )}
                <View style={[styles.bubble, msg.role === 'user' ? styles.bubbleUser : styles.bubbleAI]}>
                  <Text style={[styles.bubbleText, msg.role === 'user' && styles.bubbleTextUser]}>{msg.text}</Text>
                  <Text style={[styles.bubbleTime, msg.role === 'user' && styles.bubbleTimeUser]}>{msg.time}</Text>
                </View>
              </View>
            ))}

            <Text style={styles.suggestionsLabel}>Sugestões rápidas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
              {SUGGESTIONS.map(s => (
                <TouchableOpacity key={s.id} style={styles.suggestionChip} onPress={() => sendMessage(s.label)}>
                  <Icon name={s.icon} size={14} color={Colors.primary} />
                  <Text style={styles.suggestionChipText}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Pergunte algo ao seu tutor..."
              placeholderTextColor={Colors.textDisabled}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => sendMessage(inputText)}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Icon name="send" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <ScrollView contentContainerStyle={styles.insightsContent} showsVerticalScrollIndicator={false}>
          <View style={styles.diagnosticBanner}>
            <Icon name="brain" size={32} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.diagnosticTitle}>Diagnóstico personalizado</Text>
              <Text style={styles.diagnosticSub}>Análise preditiva baseada no seu histórico de aprendizagem</Text>
            </View>
          </View>

          <Text style={styles.overlineLabel}>Indicadores de desempenho</Text>
          {INSIGHTS.map((item, i) => (
            <View key={i} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: item.color + '18' }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.insightLabel}>{item.label}</Text>
                <Text style={[styles.insightValue, { color: item.color }]}>{item.value}</Text>
              </View>
            </View>
          ))}

          <Text style={[styles.overlineLabel, { marginTop: Spacing.md }]}>Recomendações da IA</Text>
          {[
            { type: 'focus', icon: 'target-account', color: Colors.error, title: 'Foco necessário: História', body: 'Você está com 45% de aproveitamento. Recomendo retomar "Brasil Colônia" antes de avançar para o próximo módulo.' },
            { type: 'celebrate', icon: 'star-circle', color: Colors.success, title: 'Continue assim: Física', body: 'Subiu 18% esta semana! Sua estratégia de assistir vídeos antes dos quizzes está funcionando.' },
            { type: 'challenge', icon: 'lightning-bolt', color: Colors.warning, title: 'Novo desafio disponível', body: 'Você está pronto para o Simulado ENEM de Matemática. Sua taxa de acerto está acima de 80%.' },
          ].map((r, i) => (
            <TouchableOpacity key={i} style={[styles.recCard, { borderLeftColor: r.color }]}>
              <View style={[styles.recIcon, { backgroundColor: r.color + '18' }]}>
                <Icon name={r.icon} size={22} color={r.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.recTitle}>{r.title}</Text>
                <Text style={styles.recBody}>{r.body}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.chatCTA} onPress={() => setTab('chat')}>
            <Icon name="message-text-outline" size={20} color={Colors.white} />
            <Text style={styles.chatCTAText}>Conversar com o Tutor</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  header: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tutorAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  headerInfo: { flex: 1 },
  headerTitle: { ...Typography.h4, color: Colors.textPrimary },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  onlineText: { ...Typography.caption, color: Colors.textSecondary },
  aiBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  aiBadgeText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: Spacing.md, gap: Spacing.xs,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabLabel: { ...Typography.label, color: Colors.textSecondary },
  tabLabelActive: { color: Colors.primary },

  chatScroll: { flex: 1, backgroundColor: Colors.surfaceVariant },
  chatContent: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },

  messageWrap: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-end' },
  messageWrapUser: { flexDirection: 'row-reverse' },
  aiAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: 4,
  },
  bubbleAI: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, ...Shadows.sm },
  bubbleUser: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleText: { ...Typography.body2, color: Colors.textPrimary, lineHeight: 20 },
  bubbleTextUser: { color: Colors.white },
  bubbleTime: { ...Typography.caption, color: Colors.textDisabled, alignSelf: 'flex-end' },
  bubbleTimeUser: { color: 'rgba(255,255,255,0.7)' },

  suggestionsLabel: {
    ...Typography.overline, color: Colors.textSecondary,
    textTransform: 'uppercase', marginTop: Spacing.sm,
  },
  suggestionsRow: { gap: Spacing.xs, paddingVertical: Spacing.xs },
  suggestionChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.white,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderWidth: 1, borderColor: Colors.primaryLight,
    ...Shadows.sm,
  },
  suggestionChipText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body2,
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.divider },

  insightsContent: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  diagnosticBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.xs,
  },
  diagnosticTitle: { ...Typography.h4, color: Colors.textPrimary },
  diagnosticSub: { ...Typography.caption, color: Colors.textSecondary },
  overlineLabel: {
    ...Typography.overline, color: Colors.textSecondary,
    textTransform: 'uppercase', marginBottom: 4,
  },
  insightCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  insightIcon: { width: 44, height: 44, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  insightLabel: { ...Typography.body2, color: Colors.textSecondary },
  insightValue: { ...Typography.label, fontWeight: '700' },
  recCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    gap: Spacing.md, borderLeftWidth: 4, ...Shadows.sm,
  },
  recIcon: { width: 44, height: 44, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  recTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  recBody: { ...Typography.body2, color: Colors.textSecondary, lineHeight: 18 },
  chatCTA: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.sm,
  },
  chatCTAText: { ...Typography.label, color: Colors.white },
});
