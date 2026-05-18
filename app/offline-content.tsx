import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type ContentType = 'video' | 'pdf' | 'audio';

type OfflineItem = {
  id: string; title: string; subject: string; type: ContentType;
  size: string; duration?: string; downloaded: boolean; downloading?: boolean;
};

const TYPE_CONFIG: Record<ContentType, { icon: string; color: string; label: string }> = {
  video: { icon: 'play-circle', color: Colors.error, label: 'Vídeo' },
  pdf: { icon: 'file-pdf-box', color: Colors.warning, label: 'PDF' },
  audio: { icon: 'headphones', color: Colors.info, label: 'Podcast' },
};

const initialItems: OfflineItem[] = [
  { id: '1', title: 'Aula 33 — Algoritmo e Álgebra', subject: 'Matemática', type: 'video', size: '142 MB', duration: '38min', downloaded: true },
  { id: '2', title: 'Resumo — Equações Logarítmicas', subject: 'Matemática', type: 'pdf', size: '2,4 MB', downloaded: true },
  { id: '3', title: 'Podcast — Guerras Mundiais', subject: 'História', type: 'audio', size: '18 MB', duration: '52min', downloaded: true },
  { id: '4', title: 'Aula 12 — Romantismo no Brasil', subject: 'Literatura', type: 'video', size: '98 MB', duration: '26min', downloaded: false },
  { id: '5', title: 'Guia — Tabela Periódica Completa', subject: 'Química', type: 'pdf', size: '5,1 MB', downloaded: false },
  { id: '6', title: 'Aula 07 — Eletrostática', subject: 'Física', type: 'video', size: '115 MB', duration: '31min', downloaded: false },
  { id: '7', title: 'Podcast — Filosofia Antiga', subject: 'Filosofia', type: 'audio', size: '22 MB', duration: '64min', downloaded: false },
  { id: '8', title: 'Apostila — Genética e Evolução', subject: 'Biologia', type: 'pdf', size: '8,3 MB', downloaded: false },
];

type FilterTab = 'baixados' | 'disponiveis' | 'todos';

export default function OfflineContentScreen() {
  const [items, setItems] = useState<OfflineItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<FilterTab>('todos');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'todos'>('todos');

  const downloaded = items.filter(i => i.downloaded);
  const totalSize = '162,4 MB';
  const maxSize = '2 GB';

  const toggleDownload = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (item.downloaded) {
      Alert.alert('Remover download', `Deseja remover "${item.title}" do armazenamento offline?`, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => setItems(prev => prev.map(i => i.id === id ? { ...i, downloaded: false } : i)) },
      ]);
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, downloading: true } : i));
      setTimeout(() => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, downloading: false, downloaded: true } : i));
      }, 2000);
    }
  };

  const filtered = items.filter(item => {
    const tabOk = activeTab === 'todos' ? true : activeTab === 'baixados' ? item.downloaded : !item.downloaded;
    const typeOk = typeFilter === 'todos' ? true : item.type === typeFilter;
    return tabOk && typeOk;
  });

  const usedPct = Math.round((downloaded.length / items.length) * 100);

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* STORAGE CARD */}
        <View style={s.storageCard}>
          <View style={s.storageHeader}>
            <Icon name="download-circle" size={28} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={s.storageTitle}>Armazenamento offline</Text>
              <Text style={s.storageSub}>{totalSize} usados de {maxSize}</Text>
            </View>
            <Text style={s.storageCount}>{downloaded.length} itens</Text>
          </View>
          <View style={s.storageBarBg}>
            <View style={[s.storageBarFill, { width: `${usedPct}%` }]} />
          </View>
          <View style={s.storageStats}>
            <View style={s.storageStat}>
              <Icon name="play-circle" size={14} color={Colors.error} />
              <Text style={s.storageStatText}>{downloaded.filter(i => i.type === 'video').length} vídeos</Text>
            </View>
            <View style={s.storageStat}>
              <Icon name="file-pdf-box" size={14} color={Colors.warning} />
              <Text style={s.storageStatText}>{downloaded.filter(i => i.type === 'pdf').length} PDFs</Text>
            </View>
            <View style={s.storageStat}>
              <Icon name="headphones" size={14} color={Colors.info} />
              <Text style={s.storageStatText}>{downloaded.filter(i => i.type === 'audio').length} podcasts</Text>
            </View>
          </View>
        </View>

        {/* INFO BANNER */}
        <View style={s.infoBanner}>
          <Icon name="wifi-off" size={18} color={Colors.primary} />
          <Text style={s.infoText}>Conteúdo baixado fica disponível sem conexão com internet.</Text>
        </View>

        {/* TABS */}
        <View style={s.tabRow}>
          {(['todos', 'baixados', 'disponiveis'] as FilterTab[]).map(t => (
            <TouchableOpacity key={t} style={[s.tabBtn, activeTab === t && s.tabBtnActive]} onPress={() => setActiveTab(t)}>
              <Text style={[s.tabBtnText, activeTab === t && s.tabBtnTextActive]}>
                {t === 'todos' ? 'Todos' : t === 'baixados' ? 'Baixados' : 'Disponíveis'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TYPE FILTER */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.typeFilterRow}>
          {(['todos', 'video', 'pdf', 'audio'] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[s.typeChip, typeFilter === t && s.typeChipActive]}
              onPress={() => setTypeFilter(t)}
            >
              {t !== 'todos' && <Icon name={TYPE_CONFIG[t].icon} size={13} color={typeFilter === t ? Colors.white : TYPE_CONFIG[t].color} />}
              <Text style={[s.typeChipText, typeFilter === t && s.typeChipTextActive]}>
                {t === 'todos' ? 'Todos os tipos' : TYPE_CONFIG[t].label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LIST */}
        <View style={s.list}>
          {filtered.length === 0 ? (
            <View style={s.empty}>
              <Icon name="download-off-outline" size={40} color={Colors.textDisabled} />
              <Text style={s.emptyText}>Nenhum conteúdo encontrado</Text>
            </View>
          ) : (
            filtered.map(item => {
              const cfg = TYPE_CONFIG[item.type];
              return (
                <View key={item.id} style={s.itemCard}>
                  <View style={[s.itemIcon, { backgroundColor: cfg.color + '18' }]}>
                    <Icon name={cfg.icon} size={24} color={cfg.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <View style={s.itemMeta}>
                      <Text style={s.itemSubject}>{item.subject}</Text>
                      {item.duration && <Text style={s.itemDot}>·</Text>}
                      {item.duration && <Text style={s.itemDuration}>{item.duration}</Text>}
                      <Text style={s.itemDot}>·</Text>
                      <Text style={s.itemSize}>{item.size}</Text>
                    </View>
                    {item.downloading && (
                      <View style={s.downloadingRow}>
                        <View style={s.downloadingBar}>
                          <View style={s.downloadingFill} />
                        </View>
                        <Text style={s.downloadingText}>Baixando...</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={[s.downloadBtn, item.downloaded && s.downloadBtnDone]}
                    onPress={() => toggleDownload(item.id)}
                    disabled={item.downloading}
                  >
                    <Icon
                      name={item.downloading ? 'loading' : item.downloaded ? 'check-circle' : 'download'}
                      size={22}
                      color={item.downloaded ? Colors.success : Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  storageCard: {
    backgroundColor: Colors.white, margin: Spacing.md,
    borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm, gap: Spacing.sm,
  },
  storageHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  storageTitle: { ...Typography.label, color: Colors.textPrimary },
  storageSub: { ...Typography.caption, color: Colors.textSecondary },
  storageCount: { ...Typography.h4, color: Colors.primary },
  storageBarBg: { height: 8, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  storageBarFill: { height: 8, backgroundColor: Colors.primary, borderRadius: Radius.full },
  storageStats: { flexDirection: 'row', gap: Spacing.md },
  storageStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  storageStatText: { ...Typography.caption, color: Colors.textSecondary },

  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primaryLight, marginHorizontal: Spacing.md,
    borderRadius: Radius.md, padding: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.primary,
  },
  infoText: { ...Typography.caption, color: Colors.primary, flex: 1, lineHeight: 18 },

  tabRow: { flexDirection: 'row', backgroundColor: Colors.white, margin: Spacing.md, borderRadius: Radius.md, padding: 4, ...Shadows.sm },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: Radius.sm },
  tabBtnActive: { backgroundColor: Colors.primary },
  tabBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  tabBtnTextActive: { color: Colors.white, fontWeight: '700' },

  typeFilterRow: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm, gap: Spacing.sm },
  typeChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.divider },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  typeChipTextActive: { color: Colors.white, fontWeight: '700' },

  list: { padding: Spacing.md, gap: Spacing.sm },
  empty: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xl },
  emptyText: { ...Typography.body2, color: Colors.textDisabled },

  itemCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  itemIcon: { width: 48, height: 48, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  itemTitle: { ...Typography.label, color: Colors.textPrimary, lineHeight: 20 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2, flexWrap: 'wrap' },
  itemSubject: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  itemDot: { ...Typography.caption, color: Colors.textDisabled },
  itemDuration: { ...Typography.caption, color: Colors.textSecondary },
  itemSize: { ...Typography.caption, color: Colors.textDisabled },
  downloadingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 4 },
  downloadingBar: { flex: 1, height: 3, backgroundColor: Colors.divider, borderRadius: Radius.full, overflow: 'hidden' },
  downloadingFill: { width: '60%', height: 3, backgroundColor: Colors.primary, borderRadius: Radius.full },
  downloadingText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  downloadBtn: { padding: Spacing.sm },
  downloadBtnDone: {},
});
