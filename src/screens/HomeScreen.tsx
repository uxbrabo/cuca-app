// Em: src/screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, IconButton, Avatar, Button, Card, Menu, Drawer, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '~/theme/theme';
import styles from './HomeScreen.styles';
import { RootStackParamList } from '~/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipo para garantir que a propriedade 'screen' seja uma chave válida de RootStackParamList
type MenuItem = {
  id: string;
  title: string;
  icon: string;
  screen: keyof RootStackParamList;
};

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = React.useState(false);

  const menuItems: MenuItem[] = [
    { id: '1', title: 'Meu Desempenho', icon: 'chart-line-variant', screen: 'Performance' },
    { id: '2', title: 'Minhas Disciplinas', icon: 'book-open-variant', screen: 'Subjects' },
    { id: '3', title: 'HUB de Conteúdo', icon: 'school-outline', screen: 'ContentHub' },
    { id: '4', title: 'Arena de Quizzes', icon: 'trophy-outline', screen: 'QuizArena' },
    { id: '5', title: 'Estudo colaborativo', icon: 'account-group-outline', screen: 'CollaborativeStudy' },
    { id: '6', title: 'Portal da família', icon: 'web', screen: 'FamilyPortal' },
  ];

  const rankingData = [
    {
      id: '1',
      name: 'Maria Eduarda',
      xp: '4833 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      badge: require('~/assets/badge_gold.png'),
    },
    {
      id: '2',
      name: 'João Pedro',
      xp: '4203 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      badge: require('~/assets/badge_silver.png'),
    },
    {
      id: '3',
      name: 'Paulo André',
      xp: '3933 XP',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      badge: require('~/assets/badge_bronze.png'),
    },
  ];

  // 2. Adicionamos os dados para a nova seção
  const articlesData = [
    {
      id: '1',
      title: 'Matemática',
      description: '12 resoluções de equações logarítmicas',
      time: '3 min atrás • 33 min',
      image: require('~/assets/artigo_matematica.png'),
    },
    {
      id: '2',
      title: 'Literatura',
      description: 'Memorize o poema de Carlos Drummond de Andrade',
      time: '1d e 3 horas atrás • 33 min',
      image: require('~/assets/artigo_literatura.png'),
    },
  ];

  const videoData = [
    {
      id: '1',
      title: 'Matemática',
      subtitle: 'Aula 33 - Algoritmo e Álgebra',
      image: require('~/assets/video_matematica.png'),
    },
    {
      id: '2',
      title: 'Literatura',
      subtitle: 'Aula 12 - Romantismo no Brasil',
      image: require('~/assets/video_literatura.png'),
    },
  ];

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const openNotificationsMenu = () => setIsNotificationsVisible(true);
  const closeNotificationsMenu = () => setIsNotificationsVisible(false);


  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent} // Adiciona este estilo
      >
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
              <Menu
                visible={isNotificationsVisible}
                onDismiss={closeNotificationsMenu}
                anchor={
                  <IconButton
                    icon="bell-outline"
                    size={24}
                    style={styles.iconButton}
                    onPress={openNotificationsMenu}
                  />
                }
                contentStyle={styles.notificationMenu}
              >
                <Menu.Item
                  leadingIcon="school-outline"
                  title="Aula de Matemática cancelada"
                  onPress={() => {}}
                />
                <Menu.Item
                  leadingIcon="message-text-outline"
                  title="Nova mensagem de 'Prof. Silva'"
                  onPress={() => {}}
                />
                <Divider />
                <Menu.Item
                  leadingIcon="trophy-outline"
                  title="Você subiu no Ranking!"
                  onPress={() => {}}
                />
                <Menu.Item
                  leadingIcon="calendar-check-outline"
                  title="Lembrete: Prova de Biologia amanhã"
                  onPress={() => {}}
                />
              </Menu>
              <IconButton icon="menu" size={24} style={styles.iconButton} onPress={openDrawer} />
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
              <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.menuItem}>
                  <View style={styles.menuIconContainer}>
                    <Icon name={item.icon} size={32} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
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
            <TouchableOpacity>
              <Icon name="arrow-right" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
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
        
    
        {/* =================== SEÇÃO DE LEITURAS E ARTIGOS =================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Leituras e artigos</Text>
            <TouchableOpacity>
              <Icon name="arrow-right" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {articlesData.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.articleCard,
                index === articlesData.length - 1 && styles.lastArticleCard
              ]}
            >
              <Image source={item.image} style={styles.articleImage} />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDescription}>{item.description}</Text>
                <View style={styles.articleMetaContainer}>
                  <Icon name="clock-outline" size={14} color={theme.colors.onSurfaceVariant} />
                  <Text style={styles.articleMetaText}>{item.time}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="lightgrey" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ======================= SEÇÃO DE VÍDEO AULAS ======================= */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vídeo aulas</Text>
            <TouchableOpacity>
              <Icon name="arrow-right" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={videoData}
            renderItem={({ item }) => (
              <Card style={styles.videoCard}>
                <View>
                  <Card.Cover source={item.image} style={styles.videoCardCover} />
                  <View style={styles.playIconContainer}>
                    <IconButton icon="play" iconColor="#FFFFFF" size={24} />
                  </View>
                </View>
                <Card.Content>
                  <Text style={styles.videoTitle}>{item.title}</Text>
                  <Text style={styles.videoSubtitle}>{item.subtitle}</Text>
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 8 }}
          />
        </View>

      </ScrollView>

      {/* ======================= DRAWER (MENU LATERAL) ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={closeDrawer}
      >
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.drawerContainer}>
                <View style={styles.drawerHeader}>
                  <Avatar.Image size={64} source={{ uri: 'https://i.pravatar.cc/150' }} />
                  <Text style={styles.drawerUserName}>João</Text>
                  <Text style={styles.drawerUserEmail}>joao.silva@email.com</Text>
                  <Text style={styles.drawerUserXp}>4833 XP</Text>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                  <Drawer.Item
                    icon="cog-outline"
                    label="Configurações"
                    onPress={() => { closeDrawer(); console.log('Navegar para Configurações'); }}
                  />
                  <Drawer.Item
                    icon="account-circle-outline"
                    label="Perfil"
                    onPress={() => { closeDrawer(); console.log('Navegar para Perfil'); }}
                  />
                </Drawer.Section>

                <Drawer.Section title="Menu Principal" style={styles.drawerSection}>
                  {menuItems.map(item => (
                    <Drawer.Item
                      key={item.id}
                      icon={item.icon}
                      label={item.title}
                      onPress={() => { closeDrawer(); navigation.navigate(item.screen); }}
                    />
                  ))}
                </Drawer.Section>

                <Drawer.Section style={styles.drawerFooter}>
                  <Drawer.Item
                    icon="logout"
                    label="Sair do app"
                    onPress={() => {
                      closeDrawer();
                      console.log('Sair do app');
                    }}
                  />
                </Drawer.Section>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default HomeScreen;