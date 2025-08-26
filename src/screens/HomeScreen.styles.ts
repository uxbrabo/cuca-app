// Em: src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // O fundo cinza claro da tela inteira
  },
  // Estilo para o conteúdo do ScrollView para garantir que o último item não seja cortado
  scrollViewContent: {
    flexGrow: 1, // Garante que o conteúdo do ScrollView ocupe todo o espaço disponível
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
    textAlign: 'center',
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
    marginBottom: 4, // Adiciona um espaçamento entre o nome e o XP
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

  // ===================================
  // Estilos de Leituras e Artigos
  // ===================================
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24, // Padding para alinhar com os títulos
  },
  lastArticleCard: {
    marginBottom: 0,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  articleTextContainer: {
    flex: 1, // Ocupa o espaço que sobra
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1c1c1c',
  },
  articleDescription: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 8,
  },
  articleMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleMetaText: {
    fontSize: 12,
    color: 'grey',
    marginLeft: 4,
  },

  // ===================================
  // Estilos das Vídeo Aulas
  // ===================================
  videoCard: {
    width: 280, // Largura maior para os cards de vídeo
    marginRight: 16,
    backgroundColor: theme.colors.background, // Garante o fundo branco do card
    marginBottom: 16, // Adiciona espaço para o ícone de play que vaza para baixo
    elevation: 0, // Remove a sombra no Android
    shadowOpacity: 0, // Remove a sombra no iOS
    borderWidth: 1, // Adiciona uma borda para compensar a falta de sombra
    borderColor: '#e0e0e0', // Cor da borda
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#1c1c1c',
    textAlign: 'left', // Alinha o título à esquerda
  },
  videoSubtitle: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'left', // Alinha o subtítulo à esquerda
  },
  playIconContainer: {
    position: 'absolute',
    bottom: -16, // Posiciona o ícone metade para fora
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 20, // Deixa o container do ícone redondo
  },
  videoCardCover: {
    // Garante que a imagem não seja esticada ou cortada
    resizeMode: 'contain',
    backgroundColor: theme.colors.secundary, // Cor de fundo para a área não preenchida pela imagem
  },

});

export default styles;