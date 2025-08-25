// Em: src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { Searchbar, IconButton, Avatar, Button } from 'react-native-paper';
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

  const rankingData = [
    {
      id: '1',
      name: 'Maria Eduarda',
      xp: '4833 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      badge: require('@/assets/badge_gold.png'),
    },
    {
      id: '2',
      name: 'João Pedro',
      xp: '4203 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      badge: require('@/assets/badge_silver.png'),
    },
    {
      id: '3',
      name: 'Paulo André',
      xp: '3933 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      badge: require('@/assets/badge_bronze.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* ======================= SEÇÃO DO CABEÇALHO ========================= */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.greetingContainer}>
              <Avatar.Image size={48} source={{ uri: 'https://i.pravatar.cc/150' }} />
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

        {/* =================== SEÇÃO DE MENU (CARROSSEL) ====================== */}
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

        {/* ======================= SEÇÃO DE RANKING =========================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ranking Arena de Quizzes</Text>
            <Button
              mode="text"
              icon="arrow-right"
              onPress={() => console.log('Ver mais ranking pressionado')}
              contentStyle={{ flexDirection: 'row-reverse' }} // Coloca o ícone à direita
              labelStyle={{ fontWeight: 'bold' }}
              style={styles.seeMoreButton}
            >
              Ver mais
            </Button>
          </View>

          <View style={styles.rankingCard}>
            {rankingData.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.rankingItem,
                  index === rankingData.length - 1 && styles.lastRankingItem,
                ]}
              >
                <View style={styles.rankingAvatarContainer}>
                  <Avatar.Image size={48} source={{ uri: item.avatarUrl }} />
                </View>
                <View style={styles.rankingTexts}>
                  <Text style={styles.rankingName}>{item.name}</Text>
                  <Text style={styles.rankingXp}>{item.xp}</Text>
                </View>
                <Image source={item.badge} style={styles.rankingBadge} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;