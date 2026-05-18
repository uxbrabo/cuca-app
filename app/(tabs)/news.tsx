import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Category = 'Todos' | 'ENEM' | 'Vestibular' | 'Dicas' | 'Ciências';

type NewsItem = {
  id: string;
  category: Exclude<Category, 'Todos'>;
  title: string;
  summary: string;
  source: string;
  time: string;
  readTime: string;
  featured: boolean;
};

const CATEGORIES: Category[] = ['Todos', 'ENEM', 'Vestibular', 'Dicas', 'Ciências'];

const CATEGORY_COLORS: Record<string, string> = {
  ENEM: Colors.primary,
  Vestibular: '#7B1FA2',
  Dicas: Colors.success,
  Ciências: Colors.info,
};

const NEWS: NewsItem[] = [
  {
    id: '1', category: 'ENEM', featured: true,
    title: 'ENEM 2025: Tudo o que você precisa saber para se inscrever',
    summary: 'As inscrições para o ENEM 2025 abrem em maio. Veja datas, taxas e como se preparar.',
    source: 'MEC', time: '2h atrás', readTime: '5 min',
  },
  {
    id: '2', category: 'Vestibular', featured: false,
    title: 'USP abre inscrições para a Fuvest 2026',
    summary: 'A Fuvest divulgou o cronograma para 2026. Confira as principais datas e áreas do conhecimento.',
    source: 'Fuvest', time: '5h atrás', readTime: '4 min',
  },
  {
    id: '3', category: 'Dicas', featured: false,
    title: '10 técnicas de memorização que realmente funcionam',
    summary: 'Conheça métodos como o sistema Leitner, mapas mentais e repetição espaçada.',
    source: 'Cuca Blog', time: '1d atrás', readTime: '7 min',
  },
  {
    id: '4', category: 'ENEM', featured: false,
    title: 'Redação ENEM: os temas mais prováveis para 2025',
    summary: 'Especialistas apontam tendências com base em edições anteriores e contexto atual.',
    source: 'Cuca Blog', time: '2d atrás', readTime: '6 min',
  },
  {
    id: '5', category: 'Ciências', featured: false,
    title: 'Descoberta revolucionária em biologia celular pode mudar o ensino médio',
    summary: 'Pesquisadores identificaram um novo mecanismo de divisão celular que abre caminho para novas terapias.',
    source: 'Science Today', time: '3d atrás', readTime: '8 min',
  },
  {
    id: '6', category: 'Dicas', featured: false,
    title: 'Como montar um plano de estudos eficiente em 5 passos',
    summary: 'Organize sua rotina de forma inteligente e maximize seu rendimento nas provas.',
    source: 'Cuca Blog', time: '4d atrás', readTime: '5 min',
  },
];

function CategoryChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.85}>
      <View style={styles.featuredImage}>
        <View style={[styles.categoryPill, { backgroundColor: CATEGORY_COLORS[item.category] }]}>
          <Text style={styles.categoryPillText}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.featuredBody}>
        <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.featuredSummary} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.cardMeta}>
          <Icon name="newspaper-variant-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.cardMetaText}>{item.source}</Text>
          <Text style={styles.cardMetaDot}>·</Text>
          <Icon name="clock-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.cardMetaText}>{item.readTime} leitura</Text>
          <Text style={styles.cardMetaDot}>·</Text>
          <Text style={styles.cardMetaText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardLeft}>
        <View style={[styles.categoryDot, { backgroundColor: CATEGORY_COLORS[item.category] ?? Colors.primary }]} />
        <View style={styles.cardBody}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.cardMeta}>
            <Icon name="clock-outline" size={12} color={Colors.textDisabled} />
            <Text style={styles.cardMetaText}>{item.readTime} · {item.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardImagePlaceholder}>
        <Icon name="image-outline" size={28} color={Colors.divider} />
      </View>
    </TouchableOpacity>
  );
}

export default function NewsScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const featured = NEWS.find(n => n.featured);
  const list = NEWS.filter(n =>
    !n.featured && (activeCategory === 'Todos' || n.category === activeCategory)
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map(cat => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>

        {featured && (activeCategory === 'Todos' || activeCategory === featured.category) && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionLabel}>Destaque</Text>
            <FeaturedCard item={featured} />
          </View>
        )}

        <View style={styles.listSection}>
          <Text style={styles.sectionLabel}>Últimas notícias</Text>
          {list.length === 0 ? (
            <View style={styles.empty}>
              <Icon name="newspaper-remove-outline" size={48} color={Colors.textDisabled} />
              <Text style={styles.emptyText}>Nenhuma notícia nessa categoria</Text>
            </View>
          ) : (
            list.map(item => <NewsCard key={item.id} item={item} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  categories: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { ...Typography.label, color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  featuredSection: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  listSection: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  featuredCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  featuredImage: {
    height: 180,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: Spacing.md,
  },
  categoryPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  categoryPillText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  featuredBody: { padding: Spacing.md },
  featuredTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: Spacing.xs },
  featuredSummary: { ...Typography.body2, color: Colors.textSecondary, marginBottom: Spacing.sm },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  categoryDot: { width: 4, borderRadius: 2, alignSelf: 'stretch', marginRight: Spacing.sm, minHeight: 40 },
  cardBody: { flex: 1 },
  cardCategory: { ...Typography.caption, color: Colors.primary, fontWeight: '600', marginBottom: 2 },
  cardTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: Spacing.xs },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMetaText: { ...Typography.caption, color: Colors.textDisabled },
  cardMetaDot: { ...Typography.caption, color: Colors.textDisabled },
  cardImagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyText: { ...Typography.body2, color: Colors.textDisabled, marginTop: Spacing.md },
});
