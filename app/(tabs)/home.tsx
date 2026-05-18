import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { HomeStackParamList, TabParamList } from '~/navigation/types';
import { Searchbar, IconButton, Avatar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';
import homeStyles from '~/screens/HomeScreen.styles';
import { useProfile } from '~/context/ProfileContext';
import HomeFamiliaScreen from './home-familia';
import HomeEscolaScreen from './home-escola';
import HomeProfessorScreen from './home-professor';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

type MenuItem = {
  id: string;
  title: string;
  icon: string;
  screen: keyof HomeStackParamList;
};

const ACTIVITY_ICONS: Record<string, string> = {
  video:      'play-circle-outline',
  artigo:     'file-document-outline',
  quiz:       'help-circle-outline',
  flashcard:  'cards-outline',
};

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { studyPlan } = useProfile();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isDrawerVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    }
  }, [isDrawerVisible]);

  const menuItems: MenuItem[] = [
    { id: '1',  title: 'Tutor Virtual',       icon: 'robot-excited-outline',   screen: 'TutorVirtual' },
    { id: '2',  title: 'Meu Desempenho',       icon: 'chart-line-variant',      screen: 'Performance' },
    { id: '3',  title: 'Minhas Disciplinas',   icon: 'book-open-variant',       screen: 'Subjects' },
    { id: '4',  title: 'HUB de Conteúdo',      icon: 'school-outline',          screen: 'ContentHub' },
    { id: '5',  title: 'Arena de Quizzes',     icon: 'trophy-outline',          screen: 'QuizArena' },
    { id: '6',  title: 'Conquistas',           icon: 'trophy-award',            screen: 'Achievements' },
    { id: '7',  title: 'Pomodoro',             icon: 'timer-sand',              screen: 'Pomodoro' },
    { id: '8',  title: 'Flashcards',           icon: 'cards-outline',           screen: 'Flashcards' },
    { id: '9',  title: 'Redação IA',           icon: 'pencil-box-outline',      screen: 'EssayAI' },
    { id: '10', title: 'Calendário',           icon: 'calendar-month-outline',  screen: 'SchoolCalendar' },
    { id: '11', title: 'Offline',              icon: 'download-circle-outline', screen: 'OfflineContent' },
    { id: '12', title: 'Estudo Colaborativo',  icon: 'account-group-outline',   screen: 'CollaborativeStudy' },
    { id: '13', title: 'Minha Trilha',         icon: 'map-marker-path',         screen: 'LearningTrail' },
  ];

  const rankingData = [
    { id: '1', name: 'Maria Eduarda', xp: '4833 XP', avatarUrl: 'https://i.pravatar.cc/150?img=1', badge: require('~/assets/badge_gold.png') },
    { id: '2', name: 'João Pedro', xp: '4203 XP', avatarUrl: 'https://i.pravatar.cc/150?img=2', badge: require('~/assets/badge_silver.png') },
    { id: '3', name: 'Paulo André', xp: '3933 XP', avatarUrl: 'https://i.pravatar.cc/150?img=3', badge: require('~/assets/badge_bronze.png') },
  ];

  const articlesData = [
    { id: '1', title: 'Matemática', description: '12 resoluções de equações logarítmicas', time: '3 min atrás • 33 min', image: require('~/assets/artigo_matematica.png') },
    { id: '2', title: 'Literatura', description: 'Memorize o poema de Carlos Drummond de Andrade', time: '1d e 3 horas atrás • 33 min', image: require('~/assets/artigo_literatura.png') },
  ];

  const videoData = [
    { id: '1', title: 'Matemática', subtitle: 'Aula 33 - Algoritmo e Álgebra', image: require('~/assets/video_matematica.png') },
    { id: '2', title: 'Literatura', subtitle: 'Aula 12 - Romantismo no Brasil', image: require('~/assets/video_literatura.png') },
  ];

  const openDrawer = () => {
    slideAnim.setValue(300);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setIsDrawerVisible(false));
  };

  const navigateTo = (screen: keyof HomeStackParamList) => {
    closeDrawer();
    setTimeout(() => navigation.navigate(screen as any), 200);
  };

  const navigateToTab = (tab: keyof TabParamList) => {
    closeDrawer();
    setTimeout(() => navigation.navigate(tab as any), 200);
  };

  return (
    <SafeAreaView style={homeStyles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={homeStyles.scrollViewContent}>

        {/* CABEÇALHO */}
        <View style={homeStyles.header}>
          <View style={homeStyles.headerTopRow}>
            <View style={homeStyles.greetingContainer}>
              <Avatar.Image size={48} source={{ uri: 'https://i.pravatar.cc/150' }} />
              <View style={homeStyles.greetingTexts}>
                <Text style={homeStyles.greetingTitle}>Olá, João</Text>
                <Text style={homeStyles.greetingSubtitle}>Bem-vindo ao Cuca!</Text>
              </View>
            </View>
            <View style={homeStyles.headerIcons}>
              <View style={{ position: 'relative' }}>
                <IconButton
                  icon="bell-outline"
                  size={24}
                  style={homeStyles.iconButton}
                  onPress={() => navigation.navigate('Notifications')}
                />
                <View style={notifDotStyle} />
              </View>
              <IconButton
                icon="menu"
                size={24}
                style={homeStyles.iconButton}
                onPress={openDrawer}
              />
            </View>
          </View>
          <Searchbar
            placeholder="Faça a sua pesquisa"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={homeStyles.searchBar}
            right={() => <IconButton icon="microphone-outline" onPress={() => {}} />}
          />
        </View>

        {/* MENU */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Menu</Text>
          </View>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => {
              const isHighlight = item.screen === 'TutorVirtual';
              return (
                <TouchableOpacity onPress={() => navigation.navigate(item.screen as any)} activeOpacity={0.8}>
                  <View style={homeStyles.menuItem}>
                    <View style={[homeStyles.menuIconContainer, isHighlight && tutorMenuStyles.iconContainer]}>
                      <Icon name={item.icon} size={32} color={Colors.primary} />
                    </View>
                    <Text style={homeStyles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 8 }}
          />
        </View>

        {/* TRILHA DE HOJE */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Sua Trilha de Hoje</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LearningTrail')}>
              <Icon name="arrow-right" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          {(() => {
            const trail = studyPlan?.firstTrail;
            const subject    = trail?.subject            ?? 'História do Brasil';
            const topic      = trail?.topic              ?? 'República Velha';
            const total      = trail?.totalActivities    ?? 11;
            const completed  = trail?.completedActivities ?? 3;
            const xp         = trail?.xp                ?? 450;
            const dotColor   = trail?.color             ?? Colors.warning;
            const nextTitle  = trail?.nextActivityTitle  ?? 'Vídeo · República Velha';
            const nextType   = trail?.nextActivityType   ?? 'video';
            const nextIcon   = ACTIVITY_ICONS[nextType] ?? 'play-circle-outline';
            const progressPct = `${total > 0 ? Math.round((completed / total) * 100) : 0}%` as `${number}%`;
            const aiBadgeLabel = studyPlan
              ? `Plano IA · ${studyPlan.planTitle}`
              : 'Sugerido pela IA · baseado no seu desempenho';

            return (
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => navigation.navigate('LearningTrail')}
                style={trailStyles.card}
              >
                <View style={trailStyles.aiBadge}>
                  <Icon name="robot-outline" size={13} color={Colors.primary} />
                  <Text style={trailStyles.aiBadgeText}>{aiBadgeLabel}</Text>
                </View>
                <View style={trailStyles.trailInfo}>
                  <View style={[trailStyles.subjectDot, { backgroundColor: dotColor }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={trailStyles.trailName}>{subject} · {topic}</Text>
                    <Text style={trailStyles.trailSub}>{completed} de {total} atividades concluídas</Text>
                  </View>
                  <View style={trailStyles.xpPill}>
                    <Icon name="star-circle" size={14} color="#FFD700" />
                    <Text style={trailStyles.xpPillText}>+{xp} XP</Text>
                  </View>
                </View>
                <View style={trailStyles.progressBg}>
                  <View style={[trailStyles.progressFill, { width: progressPct }]} />
                </View>
                <View style={trailStyles.footer}>
                  <View style={trailStyles.nextNode}>
                    <Icon name={nextIcon} size={15} color={Colors.primary} />
                    <Text style={trailStyles.nextNodeText} numberOfLines={1}>Próxima: {nextTitle}</Text>
                  </View>
                  <View style={trailStyles.continueBtn}>
                    <Text style={trailStyles.continueBtnText}>
                      {completed === 0 ? 'Começar' : 'Continuar'}
                    </Text>
                    <Icon name="chevron-right" size={14} color={Colors.white} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })()}
        </View>

        {/* RANKING */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Ranking Arena de Quizzes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('QuizArena')}>
              <Icon name="arrow-right" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={homeStyles.rankingCard}>
            {rankingData.map((item, index) => (
              <View key={item.id} style={[homeStyles.rankingItem, index === rankingData.length - 1 && homeStyles.lastRankingItem]}>
                <View style={homeStyles.rankingAvatarContainer}>
                  <Avatar.Image size={48} source={{ uri: item.avatarUrl }} />
                </View>
                <View style={homeStyles.rankingTexts}>
                  <Text style={homeStyles.rankingName}>{item.name}</Text>
                  <Text style={homeStyles.rankingXp}>{item.xp}</Text>
                </View>
                <Image source={item.badge} style={homeStyles.rankingBadge} />
              </View>
            ))}
          </View>
        </View>

        {/* ARTIGOS */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Leituras e artigos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ContentHub')}>
              <Icon name="arrow-right" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          {articlesData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[homeStyles.articleCard, index === articlesData.length - 1 && homeStyles.lastArticleCard]}
              onPress={() => navigation.navigate('ContentHub')}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={homeStyles.articleImage} />
              <View style={homeStyles.articleTextContainer}>
                <Text style={homeStyles.articleTitle}>{item.title}</Text>
                <Text style={homeStyles.articleDescription}>{item.description}</Text>
                <View style={homeStyles.articleMetaContainer}>
                  <Icon name="clock-outline" size={14} color={Colors.textSecondary} />
                  <Text style={homeStyles.articleMetaText}>{item.time}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={Colors.textDisabled} />
            </TouchableOpacity>
          ))}
        </View>

        {/* VÍDEO AULAS */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Vídeo aulas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ContentHub')}>
              <Icon name="arrow-right" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={videoData}
            renderItem={({ item }) => (
              <Card style={homeStyles.videoCard} onPress={() => navigation.navigate('ContentHub')}>
                <View>
                  <Card.Cover source={item.image} style={homeStyles.videoCardCover} />
                  <View style={homeStyles.playIconContainer}>
                    <IconButton icon="play" iconColor="#FFFFFF" size={24} />
                  </View>
                </View>
                <Card.Content>
                  <Text style={homeStyles.videoTitle}>{item.title}</Text>
                  <Text style={homeStyles.videoSubtitle}>{item.subtitle}</Text>
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

      {/* DRAWER LATERAL DIREITO */}
      <Modal
        animationType="none"
        transparent
        visible={isDrawerVisible}
        onRequestClose={closeDrawer}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={drawerStyles.backdrop}>
            <TouchableWithoutFeedback>
              <Animated.View style={[drawerStyles.drawer, { paddingTop: insets.top, transform: [{ translateX: slideAnim }] }]}>

                {/* CABEÇALHO DO DRAWER */}
                <View style={drawerStyles.header}>
                  <TouchableOpacity style={drawerStyles.closeBtn} onPress={closeDrawer}>
                    <Icon name="close" size={22} color={Colors.white} />
                  </TouchableOpacity>
                  <Avatar.Image size={72} source={{ uri: 'https://i.pravatar.cc/150' }} style={drawerStyles.avatar} />
                  <Text style={drawerStyles.userName}>João Silva</Text>
                  <Text style={drawerStyles.userEmail}>joao.silva@email.com</Text>
                  <View style={drawerStyles.xpRow}>
                    <Icon name="star-circle" size={16} color="#FFD700" />
                    <Text style={drawerStyles.xpText}>4.833 XP · Nível 12</Text>
                  </View>
                </View>

                <ScrollView style={drawerStyles.body} showsVerticalScrollIndicator={false}>

                  {/* ATALHOS */}
                  <Text style={drawerStyles.sectionLabel}>Acesso rápido</Text>
                  <TouchableOpacity style={drawerStyles.item} onPress={() => navigateTo('Notifications')}>
                    <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.primaryLight }]}>
                      <Icon name="bell-outline" size={20} color={Colors.primary} />
                    </View>
                    <Text style={drawerStyles.itemLabel}>Notificações</Text>
                    <View style={drawerStyles.notifBadge}><Text style={drawerStyles.notifBadgeText}>2</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity style={drawerStyles.item} onPress={() => navigateToTab('Mensagens')}>
                    <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.primaryLight }]}>
                      <Icon name="message-text-outline" size={20} color={Colors.primary} />
                    </View>
                    <Text style={drawerStyles.itemLabel}>Mensagens</Text>
                    <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
                  </TouchableOpacity>
                  <TouchableOpacity style={drawerStyles.item} onPress={() => navigateToTab('Perfil')}>
                    <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.primaryLight }]}>
                      <Icon name="account-outline" size={20} color={Colors.primary} />
                    </View>
                    <Text style={drawerStyles.itemLabel}>Meu Perfil</Text>
                    <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
                  </TouchableOpacity>

                  <View style={drawerStyles.divider} />

                  {/* MENU PRINCIPAL */}
                  <Text style={drawerStyles.sectionLabel}>Menu principal</Text>
                  {menuItems.map(item => (
                    <TouchableOpacity key={item.id} style={drawerStyles.item} onPress={() => navigateTo(item.screen)}>
                      <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.surfaceVariant }]}>
                        <Icon name={item.icon} size={20} color={Colors.textSecondary} />
                      </View>
                      <Text style={drawerStyles.itemLabel}>{item.title}</Text>
                      <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
                    </TouchableOpacity>
                  ))}

                  <View style={drawerStyles.divider} />

                  {/* RODAPÉ */}
                  <TouchableOpacity style={drawerStyles.item} onPress={() => {}}>
                    <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.surfaceVariant }]}>
                      <Icon name="cog-outline" size={20} color={Colors.textSecondary} />
                    </View>
                    <Text style={drawerStyles.itemLabel}>Configurações</Text>
                    <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[drawerStyles.item, drawerStyles.logoutItem]} onPress={closeDrawer}>
                    <View style={[drawerStyles.itemIcon, { backgroundColor: Colors.errorLight }]}>
                      <Icon name="logout" size={20} color={Colors.error} />
                    </View>
                    <Text style={[drawerStyles.itemLabel, { color: Colors.error }]}>Sair do app</Text>
                  </TouchableOpacity>

                  <View style={{ height: insets.bottom + Spacing.lg }} />
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const tutorMenuStyles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1.5,
    borderColor: Colors.primary + '40',
    backgroundColor: Colors.primaryLight,
  },
});

const notifDotStyle = {
  position: 'absolute' as const,
  top: 8,
  right: 8,
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: Colors.error,
  borderWidth: 2,
  borderColor: Colors.white,
};

const trailStyles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.sm,
    gap: Spacing.sm,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  aiBadgeText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  trailInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  subjectDot: { width: 10, height: 10, borderRadius: 5 },
  trailName: { ...Typography.label, color: Colors.textPrimary },
  trailSub: { ...Typography.caption, color: Colors.textSecondary },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  xpPillText: { ...Typography.caption, color: '#F57F17', fontWeight: '700' },
  progressBg: {
    height: 6,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  footer: { flexDirection: 'column', gap: Spacing.sm },
  nextNode: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  nextNodeText: { ...Typography.caption, color: Colors.textSecondary, flex: 1 },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: Radius.md,
    gap: 6,
  },
  continueBtnText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
});

const drawerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawer: {
    width: 300,
    backgroundColor: Colors.white,
    ...Shadows.lg,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    alignItems: 'flex-start',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  avatar: { marginBottom: Spacing.sm },
  userName: { ...Typography.h4, color: Colors.white, marginBottom: 2 },
  userEmail: { ...Typography.body2, color: 'rgba(255,255,255,0.75)', marginBottom: Spacing.sm },
  xpRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  xpText: { ...Typography.caption, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  body: { flex: 1, paddingTop: Spacing.sm },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textDisabled,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    gap: Spacing.md,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: { ...Typography.body1, color: Colors.textPrimary, flex: 1 },
  notifBadge: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notifBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.white },
  divider: { height: 1, backgroundColor: Colors.divider, marginHorizontal: Spacing.lg, marginVertical: Spacing.sm },
  logoutItem: { marginBottom: Spacing.sm },
});

function HomeRouter(): React.JSX.Element {
  const { profile } = useProfile();
  if (profile === 'familia') return <HomeFamiliaScreen />;
  if (profile === 'escola') return <HomeEscolaScreen />;
  if (profile === 'professor') return <HomeProfessorScreen />;
  return <HomeScreen />;
}

export default HomeRouter;
