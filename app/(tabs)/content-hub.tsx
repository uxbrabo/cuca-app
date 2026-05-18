import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useMateriais } from '~/hooks/useCollection';
import type { Material } from '~/services/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

type ContentType = 'artigos' | 'videos' | 'podcasts' | 'pdfs' | 'infograficos';

type Article = {
  id: string; subject: string; title: string;
  description: string; readTime: string;
  saved: boolean; subjectColor: string;
};

type Video = {
  id: string; subject: string; title: string;
  teacher: string; duration: string;
  watched: boolean; subjectColor: string;
};

type Podcast = {
  id: string; subject: string; title: string;
  host: string; duration: string;
  subjectColor: string; icon: string;
};

type PDF = {
  id: string; subject: string; title: string;
  pages: number; size: string;
  subjectColor: string; downloaded: boolean;
};

type Infographic = {
  id: string; subject: string; title: string;
  description: string; subjectColor: string;
};

const ARTICLES: Article[] = [
  { id: '1', subject: 'Matemática', title: '12 resoluções de equações logarítmicas', description: 'Aprenda passo a passo com exemplos práticos do ENEM.', readTime: '8 min', saved: true, subjectColor: Colors.primary },
  { id: '2', subject: 'Literatura', title: 'Poesia concreta e modernismo: guia completo', description: 'Entenda os movimentos literários que caem no vestibular.', readTime: '12 min', saved: false, subjectColor: '#7B1FA2' },
  { id: '3', subject: 'Biologia', title: 'Mitose e meiose: diferenças que você precisa saber', description: 'Uma comparação visual dos dois processos de divisão celular.', readTime: '6 min', saved: false, subjectColor: Colors.success },
  { id: '4', subject: 'História', title: 'Brasil Colônia: do pau-brasil à crise do açúcar', description: 'Linha do tempo completa do período colonial brasileiro.', readTime: '15 min', saved: true, subjectColor: Colors.warning },
  { id: '5', subject: 'Física', title: 'Leis de Newton: aplicações no ENEM', description: 'Os tipos de questões mais cobrados e como resolvê-los.', readTime: '10 min', saved: false, subjectColor: Colors.info },
];

const VIDEOS: Video[] = [
  { id: '1', subject: 'Matemática', title: 'Aula 33 — Algoritmo e Álgebra Linear', teacher: 'Prof. Silva', duration: '32 min', watched: true, subjectColor: Colors.primary },
  { id: '2', subject: 'Literatura', title: 'Aula 12 — Romantismo no Brasil', teacher: 'Profa. Lima', duration: '28 min', watched: false, subjectColor: '#7B1FA2' },
  { id: '3', subject: 'Física', title: 'Aula 07 — Eletromagnetismo', teacher: 'Prof. Marcos', duration: '45 min', watched: false, subjectColor: Colors.info },
  { id: '4', subject: 'Química', title: 'Aula 15 — Equilíbrio Químico', teacher: 'Profa. Renata', duration: '38 min', watched: true, subjectColor: '#AD1457' },
  { id: '5', subject: 'História', title: 'Aula 22 — Segunda Guerra Mundial', teacher: 'Prof. Carlos', duration: '41 min', watched: false, subjectColor: Colors.warning },
];

const PODCASTS: Podcast[] = [
  { id: '1', subject: 'Ciências', title: 'Curiosidades da Física Quântica', host: 'Prof. Rodrigo', duration: '24 min', subjectColor: Colors.info, icon: 'atom' },
  { id: '2', subject: 'História', title: 'Brasil República: Do início ao fim', host: 'Profa. Ana', duration: '38 min', subjectColor: Colors.warning, icon: 'bank' },
  { id: '3', subject: 'Filosofia', title: 'Sócrates, Platão e Aristóteles para o ENEM', host: 'Prof. Eduardo', duration: '31 min', subjectColor: '#5C6BC0', icon: 'thought-bubble-outline' },
  { id: '4', subject: 'Biologia', title: 'Ecossistemas e impacto ambiental', host: 'Profa. Carla', duration: '27 min', subjectColor: Colors.success, icon: 'leaf' },
];

const PDFS: PDF[] = [
  { id: '1', subject: 'Matemática', title: 'Formulário Completo — Geometria Analítica', pages: 12, size: '2,4 MB', subjectColor: Colors.primary, downloaded: true },
  { id: '2', subject: 'Física', title: 'Tabela de Constantes Físicas', pages: 4, size: '0,8 MB', subjectColor: Colors.info, downloaded: false },
  { id: '3', subject: 'Química', title: 'Tabela Periódica Completa e Anotada', pages: 6, size: '3,1 MB', subjectColor: '#AD1457', downloaded: true },
  { id: '4', subject: 'História', title: 'Linha do Tempo — História do Brasil', pages: 20, size: '5,2 MB', subjectColor: Colors.warning, downloaded: false },
];

const INFOGRAPHICS: Infographic[] = [
  { id: '1', subject: 'Biologia', title: 'Fotossíntese e Respiração Celular', description: 'Diagrama comparativo dos dois processos celulares fundamentais.', subjectColor: Colors.success },
  { id: '2', subject: 'Física', title: 'Ondas Eletromagnéticas', description: 'Espectro eletromagnético com frequências e aplicações.', subjectColor: Colors.info },
  { id: '3', subject: 'Química', title: 'Reações Orgânicas Básicas', description: 'Tipos de reações com exemplos e grupos funcionais.', subjectColor: '#AD1457' },
  { id: '4', subject: 'Matemática', title: 'Fórmulas de Trigonometria', description: 'Identidades, relações fundamentais e tabela de ângulos notáveis.', subjectColor: Colors.primary },
];

const TABS: { id: ContentType; icon: string; label: string }[] = [
  { id: 'artigos', icon: 'file-document-outline', label: 'Artigos' },
  { id: 'videos', icon: 'play-circle-outline', label: 'Vídeos' },
  { id: 'podcasts', icon: 'microphone-outline', label: 'Podcasts' },
  { id: 'pdfs', icon: 'file-pdf-box', label: 'PDFs' },
  { id: 'infograficos', icon: 'image-outline', label: 'Infográficos' },
];

function ArticleCard({ item, onPress }: { item: Article; onPress: () => void }) {
  const [saved, setSaved] = useState(item.saved);
  return (
    <TouchableOpacity style={styles.articleCard} activeOpacity={0.85} onPress={onPress}>
      <View style={[styles.subjectStripe, { backgroundColor: item.subjectColor }]} />
      <View style={styles.articleBody}>
        <View style={styles.articleHeader}>
          <Text style={[styles.subjectTag, { color: item.subjectColor }]}>{item.subject}</Text>
          <TouchableOpacity onPress={() => setSaved(v => !v)}>
            <Icon name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? Colors.primary : Colors.textDisabled} />
          </TouchableOpacity>
        </View>
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.articleDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.metaRow}>
          <Icon name="clock-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.metaText}>{item.readTime} de leitura</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function VideoCard({ item, onPress }: { item: Video; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.videoCard} activeOpacity={0.85} onPress={onPress}>
      <View style={[styles.videoThumb, { backgroundColor: item.subjectColor + '22' }]}>
        <Icon name="play-circle" size={40} color={item.subjectColor} />
        {item.watched && (
          <View style={styles.watchedBadge}>
            <Icon name="check" size={12} color={Colors.white} />
          </View>
        )}
        <Text style={[styles.duration, { color: item.subjectColor }]}>{item.duration}</Text>
      </View>
      <View style={styles.videoBody}>
        <Text style={[styles.subjectTag, { color: item.subjectColor }]}>{item.subject}</Text>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="account-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.metaText}>{item.teacher}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PodcastCard({ item, onPress }: { item: Podcast; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.podcastCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={[styles.podcastIconWrap, { backgroundColor: item.subjectColor + '18' }]}>
        <Icon name="microphone" size={26} color={item.subjectColor} />
      </View>
      <View style={styles.podcastBody}>
        <Text style={[styles.subjectTag, { color: item.subjectColor }]}>{item.subject}</Text>
        <Text style={styles.podcastTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="account-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.metaText}>{item.host}</Text>
          <Icon name="clock-outline" size={13} color={Colors.textDisabled} style={{ marginLeft: Spacing.xs }} />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.playPodcastBtn}>
        <Icon name="play" size={16} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
}

function PDFCard({ item, onOpen }: { item: PDF; onOpen: () => void }) {
  const [downloaded, setDownloaded] = useState(item.downloaded);
  return (
    <TouchableOpacity
      style={styles.pdfCard}
      activeOpacity={0.85}
      onPress={onOpen}
    >
      <View style={[styles.pdfIconWrap, { backgroundColor: item.subjectColor + '18' }]}>
        <Icon name="file-pdf-box" size={26} color={item.subjectColor} />
      </View>
      <View style={styles.pdfBody}>
        <Text style={[styles.subjectTag, { color: item.subjectColor }]}>{item.subject}</Text>
        <Text style={styles.pdfTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="file-outline" size={13} color={Colors.textDisabled} />
          <Text style={styles.metaText}>{item.pages} páginas</Text>
          <Icon name="database-outline" size={13} color={Colors.textDisabled} style={{ marginLeft: Spacing.xs }} />
          <Text style={styles.metaText}>{item.size}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setDownloaded(v => !v)} style={styles.downloadBtn}>
        <Icon
          name={downloaded ? 'check-circle' : 'download-outline'}
          size={22}
          color={downloaded ? Colors.success : Colors.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function InfographicCard({ item }: { item: Infographic }) {
  return (
    <TouchableOpacity
      style={styles.infographicCard}
      activeOpacity={0.85}
      onPress={() => Alert.alert(item.title, item.description)}
    >
      <View style={[styles.infographicPreview, { backgroundColor: item.subjectColor + '14' }]}>
        <Icon name="image-area" size={40} color={item.subjectColor} />
        <View style={[styles.infographicBadge, { backgroundColor: item.subjectColor }]}>
          <Text style={styles.infographicBadgeText}>Infográfico</Text>
        </View>
      </View>
      <View style={styles.infographicBody}>
        <Text style={[styles.subjectTag, { color: item.subjectColor }]}>{item.subject}</Text>
        <Text style={styles.infographicTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.infographicDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── PODCAST PLAYER ──────────────────────────────────────────────────────────

function PodcastPlayer({
  podcast,
  visible,
  onClose,
}: {
  podcast: Podcast | null;
  visible: boolean;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible) { setPlaying(false); progressAnim.setValue(0); }
    return () => animRef.current?.stop();
  }, [visible]);

  const togglePlay = () => {
    if (playing) {
      animRef.current?.stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      animRef.current = Animated.timing(progressAnim, {
        toValue: 1,
        duration: 24000 / speed,
        easing: Easing.linear,
        useNativeDriver: false,
      });
      animRef.current.start(({ finished }) => { if (finished) setPlaying(false); });
    }
  };

  const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

  if (!podcast) return null;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={playerStyles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={playerStyles.sheet}>
        <View style={playerStyles.handle} />

        <View style={[playerStyles.artworkWrap, { backgroundColor: podcast.subjectColor + '18' }]}>
          <Icon name="microphone" size={52} color={podcast.subjectColor} />
        </View>

        <Text style={[playerStyles.subject, { color: podcast.subjectColor }]}>{podcast.subject}</Text>
        <Text style={playerStyles.title}>{podcast.title}</Text>
        <Text style={playerStyles.host}>{podcast.host}</Text>

        {/* Progress */}
        <View style={playerStyles.progressWrap}>
          <View style={playerStyles.progressTrack}>
            <Animated.View
              style={[playerStyles.progressFill, {
                width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
                backgroundColor: podcast.subjectColor,
              }]}
            />
            <Animated.View style={[playerStyles.progressThumb, {
              left: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '97%'] }),
              backgroundColor: podcast.subjectColor,
            }]} />
          </View>
          <View style={playerStyles.timeRow}>
            <Text style={playerStyles.timeText}>0:00</Text>
            <Text style={playerStyles.timeText}>{podcast.duration}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={playerStyles.controls}>
          <TouchableOpacity onPress={() => progressAnim.setValue(Math.max(0, (progressAnim as any)._value - 0.1))}>
            <Icon name="rewind-15" size={32} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[playerStyles.playBtn, { backgroundColor: podcast.subjectColor }]} onPress={togglePlay}>
            <Icon name={playing ? 'pause' : 'play'} size={32} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => progressAnim.setValue(Math.min(1, (progressAnim as any)._value + 0.1))}>
            <Icon name="fast-forward-15" size={32} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Speed */}
        <View style={playerStyles.speedRow}>
          {SPEEDS.map(s => (
            <TouchableOpacity
              key={s}
              style={[playerStyles.speedBtn, speed === s && { backgroundColor: podcast.subjectColor }]}
              onPress={() => setSpeed(s)}
            >
              <Text style={[playerStyles.speedText, speed === s && playerStyles.speedTextActive]}>{s}x</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

// ─── SCHOOL MATERIAL CARD (Firestore) ────────────────────────────────────────

function tipoIcon(tipo: string): { icon: string; color: string } {
  switch (tipo) {
    case 'PDF':    return { icon: 'file-pdf-box',        color: Colors.error };
    case 'Vídeo':  return { icon: 'play-circle-outline',  color: Colors.primary };
    case 'Áudio':  return { icon: 'microphone-outline',   color: '#8E24AA' };
    case 'Imagem': return { icon: 'image-outline',        color: Colors.success };
    case 'Slides': return { icon: 'presentation',         color: Colors.warning };
    case 'Link':   return { icon: 'link-variant',         color: Colors.info };
    default:       return { icon: 'file-outline',         color: Colors.textSecondary };
  }
}

function SchoolMaterialCard({ item }: { item: Material }) {
  const { icon, color } = tipoIcon(item.tipo);
  const hasLink = !!item.url;
  const handlePress = () => {
    if (hasLink) Linking.openURL(item.url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o link.'));
    else Alert.alert('Material', 'Arquivo armazenado localmente.');
  };
  return (
    <TouchableOpacity style={styles.schoolMatCard} activeOpacity={0.82} onPress={handlePress}>
      <View style={[styles.schoolMatIcon, { backgroundColor: color + '18' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.schoolMatBody}>
        <Text style={[styles.subjectTag, { color }]}>{item.disciplina}</Text>
        <Text style={styles.schoolMatTitle} numberOfLines={2}>{item.titulo}</Text>
        <View style={styles.metaRow}>
          {item.turma ? (
            <>
              <Icon name="google-classroom" size={12} color={Colors.textDisabled} />
              <Text style={styles.metaText}>{item.turma}</Text>
            </>
          ) : null}
          {item.tamanho ? (
            <>
              <Icon name="database-outline" size={12} color={Colors.textDisabled} style={{ marginLeft: 6 }} />
              <Text style={styles.metaText}>{item.tamanho}</Text>
            </>
          ) : null}
        </View>
      </View>
      <Icon name={hasLink ? 'open-in-new' : 'download-outline'} size={18} color={Colors.textDisabled} />
    </TouchableOpacity>
  );
}

// ─── PDF VIEWER ───────────────────────────────────────────────────────────────

function PDFViewer({ pdf, visible, onClose }: { pdf: PDF | null; visible: boolean; onClose: () => void }) {
  const [page, setPage] = useState(1);
  if (!pdf) return null;
  const totalPages = pdf.pages;

  const PAGE_CONTENT: Record<number, { heading: string; lines: number[] }> = {
    1: { heading: `${pdf.title} — Página 1`, lines: [80, 60, 75, 55, 70, 40, 65, 50] },
    2: { heading: `${pdf.title} — Página 2`, lines: [70, 55, 80, 45, 65, 75, 50, 60] },
    3: { heading: `${pdf.title} — Página 3`, lines: [60, 80, 50, 70, 55, 75, 40, 65] },
  };
  const content = PAGE_CONTENT[Math.min(page, 3)];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F0EDE8' }}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <TouchableOpacity style={pdfStyles.closeBtn} onPress={onClose}>
            <Icon name="close" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={pdfStyles.headerTitle} numberOfLines={1}>{pdf.title}</Text>
          <Text style={pdfStyles.pageCounter}>{page}/{totalPages}</Text>
        </View>

        {/* Page */}
        <ScrollView contentContainerStyle={pdfStyles.pageScroll}>
          <View style={pdfStyles.page}>
            <Text style={pdfStyles.pageHeading}>{content.heading}</Text>
            <View style={pdfStyles.dividerLine} />
            {content.lines.map((w, i) => (
              <View key={i} style={[pdfStyles.textLine, { width: `${w}%` as any, marginBottom: i % 4 === 3 ? 16 : 8 }]} />
            ))}
            <View style={pdfStyles.blockBox} />
            {[65, 80, 50, 70, 40].map((w, i) => (
              <View key={`b${i}`} style={[pdfStyles.textLine, { width: `${w}%` as any, marginBottom: 8 }]} />
            ))}
          </View>
        </ScrollView>

        {/* Nav */}
        <View style={pdfStyles.navBar}>
          <TouchableOpacity
            style={[pdfStyles.navBtn, page <= 1 && pdfStyles.navBtnDisabled]}
            onPress={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <Icon name="chevron-left" size={24} color={page <= 1 ? Colors.textDisabled : Colors.primary} />
            <Text style={[pdfStyles.navBtnText, page <= 1 && { color: Colors.textDisabled }]}>Anterior</Text>
          </TouchableOpacity>

          <View style={pdfStyles.pageIndicator}>
            <Text style={pdfStyles.pageIndicatorText}>{page} / {totalPages}</Text>
          </View>

          <TouchableOpacity
            style={[pdfStyles.navBtn, page >= totalPages && pdfStyles.navBtnDisabled]}
            onPress={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            <Text style={[pdfStyles.navBtnText, page >= totalPages && { color: Colors.textDisabled }]}>Próxima</Text>
            <Icon name="chevron-right" size={24} color={page >= totalPages ? Colors.textDisabled : Colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────

export default function ContentHubScreen() {
  const navigation = useNavigation<Nav>();
  const [activeTab, setActiveTab] = useState<ContentType>('artigos');
  const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
  const [activePDF, setActivePDF] = useState<PDF | null>(null);
  const { data: materiaisData, loading: materiaisLoading } = useMateriais();

  const schoolPDFs    = materiaisData.filter(m => m.tipo === 'PDF');
  const schoolVideos  = materiaisData.filter(m => m.tipo === 'Vídeo');
  const schoolAudios  = materiaisData.filter(m => m.tipo === 'Áudio');
  const schoolImages  = materiaisData.filter(m => m.tipo === 'Imagem');
  const schoolSlides  = materiaisData.filter(m => m.tipo === 'Slides' || m.tipo === 'Link');

  const count = {
    artigos:     ARTICLES.length,
    videos:      VIDEOS.length + schoolVideos.length,
    podcasts:    PODCASTS.length + schoolAudios.length,
    pdfs:        PDFS.length + schoolPDFs.length + schoolSlides.length,
    infograficos: INFOGRAPHICS.length + schoolImages.length,
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollWrap}
        contentContainerStyle={styles.tabScrollContent}
      >
        {TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, activeTab === t.id && styles.tabActive]}
            onPress={() => setActiveTab(t.id)}
            activeOpacity={0.8}
          >
            <Icon name={t.icon} size={16} color={activeTab === t.id ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === t.id && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.sectionLabel}>
          {count[activeTab]} {activeTab} disponíveis
        </Text>

        {activeTab === 'artigos' && ARTICLES.map(a => (
          <ArticleCard
            key={a.id}
            item={a}
            onPress={() => navigation.navigate('ArticleDetail', { id: a.id, title: a.title, subject: a.subject })}
          />
        ))}

        {activeTab === 'videos' && (
          <>
            {materiaisLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />}
            {schoolVideos.length > 0 && (
              <>
                <Text style={styles.schoolSection}>Enviados pela escola</Text>
                {schoolVideos.map(m => <SchoolMaterialCard key={m.id} item={m} />)}
                <Text style={styles.schoolSection}>Conteúdo geral</Text>
              </>
            )}
            {VIDEOS.map(v => (
              <VideoCard
                key={v.id}
                item={v}
                onPress={() => navigation.navigate('VideoPlayer', { id: v.id, title: v.title, subject: v.subject })}
              />
            ))}
          </>
        )}

        {activeTab === 'podcasts' && (
          <>
            {materiaisLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />}
            {schoolAudios.length > 0 && (
              <>
                <Text style={styles.schoolSection}>Enviados pela escola</Text>
                {schoolAudios.map(m => <SchoolMaterialCard key={m.id} item={m} />)}
                <Text style={styles.schoolSection}>Conteúdo geral</Text>
              </>
            )}
            {PODCASTS.map(p => (
              <PodcastCard key={p.id} item={p} onPress={() => setActivePodcast(p)} />
            ))}
          </>
        )}

        {activeTab === 'pdfs' && (
          <>
            {materiaisLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />}
            {(schoolPDFs.length > 0 || schoolSlides.length > 0) && (
              <>
                <Text style={styles.schoolSection}>Enviados pela escola</Text>
                {[...schoolPDFs, ...schoolSlides].map(m => <SchoolMaterialCard key={m.id} item={m} />)}
                <Text style={styles.schoolSection}>Conteúdo geral</Text>
              </>
            )}
            {PDFS.map(p => (
              <PDFCard key={p.id} item={p} onOpen={() => setActivePDF(p)} />
            ))}
          </>
        )}

        {activeTab === 'infograficos' && (
          <>
            {materiaisLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />}
            {schoolImages.length > 0 && (
              <>
                <Text style={styles.schoolSection}>Enviados pela escola</Text>
                {schoolImages.map(m => <SchoolMaterialCard key={m.id} item={m} />)}
                <Text style={styles.schoolSection}>Conteúdo geral</Text>
              </>
            )}
            {INFOGRAPHICS.map(i => <InfographicCard key={i.id} item={i} />)}
          </>
        )}
      </ScrollView>

      <PodcastPlayer
        podcast={activePodcast}
        visible={activePodcast !== null}
        onClose={() => setActivePodcast(null)}
      />
      <PDFViewer
        pdf={activePDF}
        visible={activePDF !== null}
        onClose={() => setActivePDF(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  tabScrollWrap: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    flexGrow: 0,
  },
  tabScrollContent: { paddingHorizontal: Spacing.xs },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { ...Typography.label, color: Colors.textSecondary, fontSize: 13 },
  tabTextActive: { color: Colors.primary },
  list: { padding: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.xl },
  sectionLabel: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.xs },

  articleCard: { backgroundColor: Colors.white, borderRadius: Radius.md, flexDirection: 'row', overflow: 'hidden', ...Shadows.sm },
  subjectStripe: { width: 4 },
  articleBody: { flex: 1, padding: Spacing.md },
  articleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  subjectTag: { ...Typography.caption, fontWeight: '700' },
  articleTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  articleDesc: { ...Typography.body2, color: Colors.textSecondary, marginBottom: Spacing.sm },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...Typography.caption, color: Colors.textDisabled },

  videoCard: { backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadows.sm },
  videoThumb: { height: 120, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  watchedBadge: {
    position: 'absolute', top: Spacing.sm, right: Spacing.sm,
    width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.success,
    justifyContent: 'center', alignItems: 'center',
  },
  duration: { position: 'absolute', bottom: Spacing.sm, right: Spacing.sm, ...Typography.caption, fontWeight: '700' },
  videoBody: { padding: Spacing.md },
  videoTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },

  podcastCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  podcastIconWrap: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  podcastBody: { flex: 1 },
  podcastTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  playPodcastBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
  },

  pdfCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  pdfIconWrap: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  pdfBody: { flex: 1 },
  pdfTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  downloadBtn: { padding: Spacing.xs },

  infographicCard: { backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadows.sm },
  infographicPreview: {
    height: 110, justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  infographicBadge: {
    position: 'absolute', bottom: Spacing.sm, left: Spacing.sm,
    paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full,
  },
  infographicBadgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  infographicBody: { padding: Spacing.md },
  infographicTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  infographicDesc: { ...Typography.body2, color: Colors.textSecondary },

  schoolSection: {
    ...Typography.overline,
    color: Colors.textDisabled,
    textTransform: 'uppercase' as const,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  schoolMatCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  schoolMatIcon: {
    width: 48, height: 48,
    borderRadius: Radius.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    flexShrink: 0,
  },
  schoolMatBody: { flex: 1 },
  schoolMatTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
});

// ─── PLAYER STYLES ────────────────────────────────────────────────────────────

const playerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: Colors.divider, marginBottom: Spacing.sm,
  },
  artworkWrap: {
    width: 120, height: 120, borderRadius: Radius.lg,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  subject: { ...Typography.caption, fontWeight: '700' },
  title: { ...Typography.h4, color: Colors.textPrimary, textAlign: 'center' },
  host: { ...Typography.body2, color: Colors.textSecondary },
  progressWrap: { width: '100%', marginTop: Spacing.sm },
  progressTrack: {
    height: 4, backgroundColor: Colors.divider,
    borderRadius: Radius.full, overflow: 'visible',
    position: 'relative',
  },
  progressFill: { height: '100%', borderRadius: Radius.full },
  progressThumb: {
    position: 'absolute', top: -5,
    width: 14, height: 14, borderRadius: 7,
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  timeText: { ...Typography.caption, color: Colors.textDisabled },
  controls: {
    flexDirection: 'row', alignItems: 'center',
    gap: Spacing.xl, marginTop: Spacing.md,
  },
  playBtn: {
    width: 64, height: 64, borderRadius: 32,
    justifyContent: 'center', alignItems: 'center',
    ...Shadows.md,
  },
  speedRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  speedBtn: {
    paddingHorizontal: Spacing.sm, paddingVertical: 4,
    borderRadius: Radius.full, backgroundColor: Colors.surfaceVariant,
  },
  speedText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  speedTextActive: { color: Colors.white },
});

// ─── PDF STYLES ───────────────────────────────────────────────────────────────

const pdfStyles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
    gap: Spacing.sm,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.surfaceVariant,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { ...Typography.label, color: Colors.textPrimary, flex: 1 },
  pageCounter: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  pageScroll: { alignItems: 'center', padding: Spacing.md, paddingBottom: Spacing.xl },
  page: {
    width: '100%', maxWidth: 500,
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  pageHeading: { ...Typography.h4, color: Colors.textPrimary, marginBottom: Spacing.md },
  dividerLine: { height: 1, backgroundColor: Colors.divider, marginBottom: Spacing.md },
  textLine: {
    height: 12, backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
  },
  blockBox: {
    height: 80, backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm, marginVertical: Spacing.md,
  },
  navBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.divider,
  },
  navBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
  },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { ...Typography.label, color: Colors.primary },
  pageIndicator: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: Spacing.md, paddingVertical: 6,
    borderRadius: Radius.full,
  },
  pageIndicatorText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
});
