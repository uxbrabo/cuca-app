// Em: src/screens/PerformanceScreen.styles.ts

import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
  },
  // Cards de Resumo (Topo)
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8, // Espaço antes dos filtros
  },
  summaryCard: {
    width: '48.5%', // Para ter 2 cards por linha com espaço
    marginBottom: 16,
    backgroundColor: theme.colors.background,
  },
  summaryCardContent: {
    alignItems: 'flex-start',
    paddingVertical: 12, // Ajuste de padding
    paddingHorizontal: 16,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 4,
  },
  summaryIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  positiveChange: {
    color: theme.colors.success,
  },
  negativeChange: {
    color: theme.colors.error,
  },
  // Botões Segmentados (Filtros)
  segmentedButtons: {
    marginBottom: 24,
  },
  // Cards de Gráfico
  chartCard: {
    marginBottom: 24,
    backgroundColor: theme.colors.background,
    padding: 16,
    borderRadius: 12,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.grey,
  },
  // Cards de Recomendação
  recommendationSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 16,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  recommendationCardGood: {
    backgroundColor: '#e6f4ea', // Verde claro
    borderColor: '#b7d8c2',
    borderWidth: 1,
  },
  recommendationCardImprove: {
    backgroundColor: '#fdecea', // Vermelho claro
    borderColor: '#f7c5c0',
    borderWidth: 1,
  },
  recommendationIcon: {
    marginRight: 16,
  },
  recommendationTextContainer: {
    flex: 1,
  },
  recommendationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1c1c1c',
  },
  recommendationDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onSurfaceVariant,
  },
  recommendationLink: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  // Botões de Ação Final
  actionButtonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonMiddle: {
    marginLeft: 8,
  },
});

export default styles;