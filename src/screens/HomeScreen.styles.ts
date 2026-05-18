// Em: src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  // =================================================================
  // CONTAINER PRINCIPAL
  // =================================================================
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  // =================================================================
  // CABEÇALHO (GREETING + SEARCHBAR)
  // =================================================================
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
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
    color: theme.colors.onSurface,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    margin: 0,
  },
  notificationMenu: {
    marginTop: 40,
  },
  searchBar: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 30,
    elevation: 0,
  },

  // =================================================================
  // SEÇÃO GENÉRICA (USADA POR VÁRIOS COMPONENTES)
  // =================================================================
  section: {
    paddingVertical: 24,
    backgroundColor: theme.colors.surface,
  },
  sectionHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // =================================================================
  // MENU PRINCIPAL (CARROSSEL)
  // =================================================================
  menuItem: {
    alignItems: 'center',
    width: 96,
    marginRight: 16,
  },
  menuIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    height: 32,
    textAlign: 'left',
    width: '100%',
  },

  // =================================================================
  // RANKING (ARENA DE QUIZZES)
  // =================================================================
  rankingCard: {
    backgroundColor: '#e8f0fe',
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 24,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lastRankingItem: {
    marginBottom: 0,
  },
  rankingAvatarContainer: {
    marginRight: 16,
  },
  rankingTexts: {
    flex: 1,
  },
  rankingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  rankingXp: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  rankingBadge: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  // =================================================================
  // LEITURAS E ARTIGOS
  // =================================================================
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
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
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.onSurface,
  },
  articleDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  articleMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleMetaText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 4,
  },

  // =================================================================
  // VÍDEO AULAS
  // =================================================================
  videoCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: theme.colors.background,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: theme.colors.onSurface,
    textAlign: 'left',
  },
  videoSubtitle: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'left',
  },
  playIconContainer: {
    position: 'absolute',
    bottom: -16,
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },
  videoCardCover: {
    resizeMode: 'contain',
    backgroundColor: theme.colors.secondary,
  },

  // =================================================================
  // DRAWER (MENU LATERAL MODAL)
  // =================================================================
  modalBackdrop: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
    alignItems: 'flex-end',
  },
  drawerContainer: {
    width: 300,
    height: '100%',
    backgroundColor: theme.colors.surface,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: theme.colors.onSurface,
  },
  drawerUserEmail: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  drawerUserXp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 8,
  },
  drawerSection: {
    marginTop: 16,
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 24,
  },
});

export default styles;