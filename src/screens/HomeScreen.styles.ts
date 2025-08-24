// Em: src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

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
    paddingHorizontal: 24, // Padding para o título "Menu"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
});

export default styles;