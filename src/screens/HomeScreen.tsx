// Em: src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Searchbar, IconButton, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '~/theme/theme';
import styles from './HomeScreen.styles';

function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');

  const menuItems = [
    { id: '1', title: 'Meu Desempenho', icon: 'chart-line-variant' },
    { id: '2', title: 'Minhas Disciplinas', icon: 'book-open-variant' },
    { id: '3', title: 'HUB de Conteúdo', icon: 'school-outline' },
    { id: '4', title: 'Arena de Quizzes', icon: 'trophy-outline' },
    { id: '5', title: 'Estudo colaborativo', icon: 'account-group-outline' },
    { id: '6', title: 'Portal da família', icon: 'web' },
  ];

  return (
    // Usamos uma View normal aqui, pois o Navegador de Abas já cuida da área segura
    <View style={styles.container}>
      <ScrollView>
        {/* ==================================================================== */}
        {/* ======================= SEÇÃO DO CABEÇALHO ========================= */}
        {/* ==================================================================== */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.greetingContainer}>
              <Avatar.Image
                size={48}
                source={{ uri: 'https://i.pravatar.cc/150' }}
              />
              <View style={styles.greetingTexts}>
                <Text style={styles.greetingTitle}>Olá, João</Text>
                <Text style={styles.greetingSubtitle}>Bem-vindo ao Cuca!</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <IconButton icon="bell-outline" size={24} style={styles.iconButton} />
              <IconButton icon="menu" size={24} style={styles.iconButton} />
            </View>
          </View>
          <Searchbar
            placeholder="Faça a sua pesquisa"
            onChangeText={setSearchQuery}
            value={searchQuery}
            traileringIcon="microphone-outline"
            onTraileringIconPress={() => console.log('Pesquisa por voz')}
            style={styles.searchBar}
          />
        </View>

        {/* ==================================================================== */}
        {/* =================== SEÇÃO DE MENU (CARROSSEL) ====================== */}
        {/* ==================================================================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Menu</Text>
          </View>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Icon name={item.icon} size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 8 }}
          />
        </View>

        {/* O resto do conteúdo (Ranking, Leituras, etc.) virá aqui depois */}

      </ScrollView>
    </View>
  );
}

export default HomeScreen;