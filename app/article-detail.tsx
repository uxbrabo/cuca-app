import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

const ARTICLE_CONTENT = `As equações logarítmicas são fundamentais para o ENEM e vestibulares. Neste artigo, vamos resolver 12 exemplos passo a passo.

**O que é um logaritmo?**

O logaritmo de um número N na base a é o expoente x ao qual devemos elevar a base a para obter N. Em símbolos: logₐ N = x ⟺ aˣ = N.

**Propriedades fundamentais**

1. log(A · B) = log A + log B
2. log(A / B) = log A − log B
3. log(Aⁿ) = n · log A
4. Mudança de base: logₐ b = log b / log a

**Exemplo 1 — Resolução básica**

Resolva: log₂(x) = 3

Solução: 2³ = x → x = 8

**Exemplo 2 — Equação com produto**

Resolva: log₃(x) + log₃(x − 2) = 1

log₃(x · (x − 2)) = 1
x(x − 2) = 3¹
x² − 2x − 3 = 0
(x − 3)(x + 1) = 0
x = 3 ou x = −1 (descartamos −1, pois o logaritmo exige x > 0)

**Resultado: x = 3**

**Exemplo 3 — Mudança de base**

log₄(8) = log 8 / log 4 = 3 log 2 / 2 log 2 = 3/2

Continue praticando com os próximos exemplos abaixo...`;

export default function ArticleDetailScreen() {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(47);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CAPA */}
        <View style={styles.cover}>
          <View style={styles.coverBadge}>
            <Icon name="calculator-variant" size={48} color={Colors.primary} />
          </View>
          <View style={styles.coverOverlay}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>Matemática</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* META */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={14} color={Colors.textDisabled} />
              <Text style={styles.metaText}>8 min de leitura</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="calendar-outline" size={14} color={Colors.textDisabled} />
              <Text style={styles.metaText}>2h atrás</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="account-outline" size={14} color={Colors.textDisabled} />
              <Text style={styles.metaText}>Prof. Silva</Text>
            </View>
          </View>

          {/* TÍTULO */}
          <Text style={styles.title}>12 resoluções de equações logarítmicas</Text>
          <Text style={styles.subtitle}>
            Aprenda as principais técnicas com exemplos práticos que caem no ENEM e nos vestibulares mais concorridos.
          </Text>

          {/* AÇÕES */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, liked && styles.actionBtnActive]}
              onPress={() => { setLiked(v => !v); setLikes(v => liked ? v - 1 : v + 1); }}
            >
              <Icon name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? Colors.error : Colors.textSecondary} />
              <Text style={[styles.actionText, liked && { color: Colors.error }]}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, saved && styles.actionBtnActive]}
              onPress={() => setSaved(v => !v)}
            >
              <Icon name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? Colors.primary : Colors.textSecondary} />
              <Text style={[styles.actionText, saved && { color: Colors.primary }]}>
                {saved ? 'Salvo' : 'Salvar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="share-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.actionText}>Compartilhar</Text>
            </TouchableOpacity>
          </View>

          {/* CONTEÚDO */}
          <View style={styles.content}>
            {ARTICLE_CONTENT.split('\n\n').map((paragraph, i) => {
              const isBold = paragraph.startsWith('**') && paragraph.includes('**');
              const cleanText = paragraph.replace(/\*\*/g, '');
              const isExample = paragraph.startsWith('**Exemplo');
              return (
                <Text
                  key={i}
                  style={[
                    styles.paragraph,
                    isBold && styles.heading,
                    isExample && styles.exampleHeading,
                  ]}
                >
                  {cleanText}
                </Text>
              );
            })}
          </View>

          {/* TAGS */}
          <View style={styles.tags}>
            <Text style={styles.tagsLabel}>Tópicos:</Text>
            {['Logaritmo', 'ENEM', 'Álgebra', 'Vestibular'].map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* AVALIAÇÃO */}
          <View style={styles.ratingBox}>
            <Text style={styles.ratingLabel}>Este conteúdo foi útil?</Text>
            <View style={styles.ratingBtns}>
              <TouchableOpacity style={[styles.ratingBtn, { backgroundColor: Colors.successLight }]}>
                <Icon name="thumb-up-outline" size={20} color={Colors.success} />
                <Text style={[styles.ratingBtnText, { color: Colors.success }]}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ratingBtn, { backgroundColor: Colors.errorLight }]}>
                <Icon name="thumb-down-outline" size={20} color={Colors.error} />
                <Text style={[styles.ratingBtnText, { color: Colors.error }]}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  cover: {
    height: 200,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coverBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverOverlay: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
  },
  categoryPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  categoryText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  body: { padding: Spacing.lg },
  metaRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...Typography.caption, color: Colors.textDisabled },
  title: { ...Typography.h2, color: Colors.textPrimary, marginBottom: Spacing.sm },
  subtitle: { ...Typography.body1, color: Colors.textSecondary, marginBottom: Spacing.lg },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
    marginBottom: Spacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceVariant,
  },
  actionBtnActive: { backgroundColor: Colors.primaryLight },
  actionText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  content: { gap: Spacing.md, marginBottom: Spacing.lg },
  paragraph: { ...Typography.body1, color: Colors.textPrimary, lineHeight: 26 },
  heading: { ...Typography.h4, color: Colors.primary, marginTop: Spacing.sm },
  exampleHeading: {
    backgroundColor: Colors.primaryLight,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.lg },
  tagsLabel: { ...Typography.label, color: Colors.textSecondary },
  tag: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  tagText: { ...Typography.caption, color: Colors.textSecondary },
  ratingBox: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.md,
  },
  ratingLabel: { ...Typography.label, color: Colors.textPrimary },
  ratingBtns: { flexDirection: 'row', gap: Spacing.md },
  ratingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  ratingBtnText: { ...Typography.label },
});
