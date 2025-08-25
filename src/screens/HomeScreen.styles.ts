// Em: src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme/theme';

const styles = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // O fundo cinza claro da tela inteira
  },

  // ===================================
  // Estilos do Cabeçalho
  // ===================================
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingTexts: {
    marginLeft: 16,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: 'grey',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    margin: 0,
  },

   searchBar: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 30,
    elevation: 0,
  },

  // ===================================
  // Estilos da Seção e do Menu
  // ===================================
  section: {
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24, // Padding para o título "Menu"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    marginRight: -12, // Compensa o padding interno do botão para alinhar visualmente
  },
  menuItem: {
    alignItems: 'center',    
    width: 90,
    marginRight: 16,
  },
  menuIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: theme.colors.secundary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    height: 32, // Garante espaço para duas linhas
  },

  // ===================================
  // Estilos da Seção Ranking
  // ===================================

  rankingCard: {
    backgroundColor: '#e8f0fe', // O azul bem claro do card
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 24, // Adiciona as margens laterais do card
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  // Estilo para o último item da lista não ter margem embaixo
  lastRankingItem: {
    marginBottom: 0,
  },
  rankingAvatarContainer: {
    marginRight: 16,
  },
  rankingTexts: {
    flex: 1, // Ocupa o espaço que sobra no meio
  },
  rankingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  rankingXp: {
    fontSize: 14,
    color: 'grey',
  },
  rankingBadge: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

});

export default styles;