import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';
import { useAlunos, useProfessores, useTurmas, useAulas, useMateriais } from '~/hooks/useCollection';
import { addAluno, addProfessor, addAula, addMaterial } from '~/services/db';
import type { Aluno, Professor } from '~/services/db';
import { uploadMaterial, maxSizeMB } from '~/services/storage';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';

type PortalTab = 'professor' | 'dashboard' | 'financeiro' | 'academico' | 'comunicacao' | 'pessoas' | 'aulas';
type PeopleTab = 'alunos' | 'professores' | 'turmas' | 'unidades';
type ContentSubTab = 'aulas' | 'materiais';

// ─── KIT DO PROFESSOR ────────────────────────────────────────────────────────

function TeacherKit() {
  const tools = [
    {
      icon: 'text-box-edit-outline', color: Colors.primary,
      title: 'Criador de Planos de Aula',
      desc: 'Gere planos de aula completos com objetivos, metodologia e avaliação — assistido por IA.',
      badge: 'IA',
    },
    {
      icon: 'folder-multiple-outline', color: Colors.info,
      title: 'Repositório de Conteúdo',
      desc: 'Biblioteca centralizada de materiais didáticos, vídeos, PDFs e exercícios por disciplina.',
      badge: null,
    },
    {
      icon: 'clipboard-text-clock-outline', color: '#7B1FA2',
      title: 'Gerador de Avaliações com IA',
      desc: 'Monte provas e exercícios automaticamente com base nos tópicos e nível de dificuldade.',
      badge: 'IA',
    },
    {
      icon: 'check-decagram-outline', color: Colors.success,
      title: 'Correção Automatizada',
      desc: 'Corrija questões objetivas e dissertativas com feedback gerado por inteligência artificial.',
      badge: 'IA',
    },
  ];

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionBanner}>
        <Icon name="briefcase-account-outline" size={28} color={Colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Kit de Ferramentas do Professor</Text>
          <Text style={styles.sectionBannerSub}>Planeje, crie e avalie com suporte de IA</Text>
        </View>
      </View>
      {tools.map((t, i) => (
        <TouchableOpacity
          key={i}
          style={styles.toolCard}
          activeOpacity={0.85}
          onPress={() => Alert.alert(t.title, t.desc)}
        >
          <View style={[styles.toolIcon, { backgroundColor: t.color + '18' }]}>
            <Icon name={t.icon} size={28} color={t.color} />
          </View>
          <View style={styles.toolBody}>
            <View style={styles.toolTitleRow}>
              <Text style={styles.toolTitle}>{t.title}</Text>
              {t.badge && (
                <View style={styles.aiBadge}>
                  <Icon name="robot-outline" size={11} color={Colors.primary} />
                  <Text style={styles.aiBadgeText}>{t.badge}</Text>
                </View>
              )}
            </View>
            <Text style={styles.toolDesc}>{t.desc}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
        </TouchableOpacity>
      ))}

      <Text style={[styles.overlineLabel, { marginTop: Spacing.md }]}>Atividade recente</Text>
      {[
        { icon: 'file-document-check', color: Colors.success, text: 'Plano de aula de Física — 2ºA criado', time: '1h atrás' },
        { icon: 'clipboard-check', color: Colors.primary, text: 'Avaliação de Matemática corrigida: 28 alunos', time: 'Hoje, 10h15' },
        { icon: 'folder-plus', color: Colors.info, text: 'Novo material adicionado: PDF Geometria Analítica', time: 'Ontem' },
      ].map((a, i) => (
        <View key={i} style={styles.activityRow}>
          <View style={[styles.activityIcon, { backgroundColor: a.color + '18' }]}>
            <Icon name={a.icon} size={18} color={a.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>{a.text}</Text>
            <Text style={styles.activityTime}>{a.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── DASHBOARD DA ESCOLA ─────────────────────────────────────────────────────

function SchoolDashboard() {
  const metrics = [
    { label: 'Alunos ativos', value: '1.247', icon: 'account-group', color: Colors.primary },
    { label: 'Média geral', value: '7,4', icon: 'chart-bar', color: Colors.success },
    { label: 'Frequência', value: '91%', icon: 'calendar-check', color: Colors.info },
    { label: 'Engajamento', value: '78%', icon: 'fire', color: Colors.warning },
  ];

  const alerts = [
    { level: 'danger', icon: 'alert-circle', color: Colors.error, text: '14 alunos com desempenho crítico em Matemática', action: 'Ver lista' },
    { level: 'warn', icon: 'alert', color: Colors.warning, text: '8 alunos com frequência abaixo de 75%', action: 'Ver detalhes' },
    { level: 'info', icon: 'information', color: Colors.info, text: 'Turma 2ºB melhorou 12% em Física este mês', action: 'Ver relatório' },
  ];

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionBanner}>
        <Icon name="view-dashboard-outline" size={28} color={Colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Dashboard de Análise</Text>
          <Text style={styles.sectionBannerSub}>Visão em tempo real da escola</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        {metrics.map((m, i) => (
          <View key={i} style={styles.metricCard}>
            <Icon name={m.icon} size={22} color={m.color} />
            <Text style={[styles.metricValue, { color: m.color }]}>{m.value}</Text>
            <Text style={styles.metricLabel}>{m.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.overlineLabel}>Sistema de Alerta Precoce · IA</Text>
      {alerts.map((a, i) => (
        <View key={i} style={[styles.alertCard, { borderLeftColor: a.color }]}>
          <Icon name={a.icon} size={20} color={a.color} />
          <Text style={styles.alertText}>{a.text}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Alerta', a.text)}>
            <Text style={[styles.alertAction, { color: a.color }]}>{a.action}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.overlineLabel}>Relatórios comparativos</Text>
      {[
        { label: 'Desempenho por turma', icon: 'chart-bar', sub: 'Matemática · Física · Português' },
        { label: 'Evolução mensal da escola', icon: 'chart-line', sub: 'Últimos 6 meses' },
        { label: 'Ranking de disciplinas', icon: 'trophy-outline', sub: 'Por taxa de aprovação' },
        { label: 'Engajamento na plataforma', icon: 'account-clock', sub: 'Horas de uso e conteúdo acessado' },
      ].map((r, i) => (
        <TouchableOpacity key={i} style={styles.reportRow} onPress={() => Alert.alert(r.label, r.sub)}>
          <Icon name={r.icon} size={20} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.reportTitle}>{r.label}</Text>
            <Text style={styles.reportSub}>{r.sub}</Text>
          </View>
          <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── GESTÃO FINANCEIRA ───────────────────────────────────────────────────────

type FinTab = 'visao' | 'inadimplencia' | 'boletos' | 'planos' | 'relatorios';

const INADIMPLENTES = [
  { name: 'Carlos Mendes', class: '2ºA', months: 2, value: 'R$ 1.980', status: 'Notificado', statusColor: Colors.warning },
  { name: 'Ana Paula Costa', class: '1ºB', months: 1, value: 'R$ 990', status: 'Em aberto', statusColor: Colors.error },
  { name: 'Rodrigo Lima', class: '3ºC', months: 3, value: 'R$ 2.970', status: 'Jurídico', statusColor: '#7B1FA2' },
  { name: 'Fernanda Souza', class: '2ºB', months: 1, value: 'R$ 990', status: 'Negociando', statusColor: Colors.info },
  { name: 'Marcos Oliveira', class: '1ºA', months: 2, value: 'R$ 1.980', status: 'Em aberto', statusColor: Colors.error },
];

const BOLETOS_RECENTES = [
  { ref: 'Mai/2026', total: 1247, pagos: 1183, pendentes: 51, cancelados: 13, valor: 'R$ 1.171.530', emissao: '01/05/2026' },
  { ref: 'Abr/2026', total: 1241, pagos: 1198, pendentes: 32, cancelados: 11, valor: 'R$ 1.165.818', emissao: '01/04/2026' },
  { ref: 'Mar/2026', total: 1238, pagos: 1220, pendentes: 11, cancelados: 7, valor: 'R$ 1.163.982', emissao: '01/03/2026' },
];

const PLANOS = [
  { name: 'Mensalidade Padrão', value: 'R$ 990,00', alunos: 980, vencimento: 'Dia 10', ativo: true },
  { name: 'Mensalidade Plus', value: 'R$ 1.290,00', alunos: 214, vencimento: 'Dia 10', ativo: true },
  { name: 'Bolsa Integral', value: 'R$ 0,00', alunos: 28, vencimento: '—', ativo: true },
  { name: 'Bolsa Parcial 50%', value: 'R$ 495,00', alunos: 25, vencimento: 'Dia 10', ativo: true },
];

const FLUXO_MENSAL = [
  { mes: 'Jan', receita: 1142, despesa: 820 },
  { mes: 'Fev', receita: 1158, despesa: 835 },
  { mes: 'Mar', receita: 1164, despesa: 841 },
  { mes: 'Abr', receita: 1166, despesa: 856 },
  { mes: 'Mai', receita: 1172, despesa: 863 },
];

// ─── DADOS: PESSOAS ──────────────────────────────────────────────────────────

const ALUNOS_DATA = [
  { name: 'Ana Beatriz Silva',    serie: '1º Ano', turma: '1ºA', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-001' },
  { name: 'Carlos Eduardo Lima',  serie: '1º Ano', turma: '1ºB', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-002' },
  { name: 'Fernanda Costa',       serie: '2º Ano', turma: '2ºA', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-003' },
  { name: 'Gabriel Mendes',       serie: '2º Ano', turma: '2ºB', unidade: 'Filial Norte', status: 'Ativo',   matricula: '2024-004' },
  { name: 'Helena Rocha',         serie: '3º Ano', turma: '3ºA', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-005' },
  { name: 'Igor Oliveira',        serie: '3º Ano', turma: '3ºC', unidade: 'Filial Norte', status: 'Inativo', matricula: '2024-006' },
  { name: 'Juliana Ferreira',     serie: '1º Ano', turma: '1ºA', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-007' },
  { name: 'Lucas Andrade',        serie: '2º Ano', turma: '2ºA', unidade: 'Filial Norte', status: 'Ativo',   matricula: '2024-008' },
  { name: 'Mariana Santos',       serie: '1º Ano', turma: '1ºB', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-009' },
  { name: 'Nathan Pereira',       serie: '3º Ano', turma: '3ºB', unidade: 'Filial Norte', status: 'Ativo',   matricula: '2024-010' },
  { name: 'Olivia Ramos',         serie: '2º Ano', turma: '2ºB', unidade: 'Sede',         status: 'Ativo',   matricula: '2024-011' },
  { name: 'Pedro Almeida',        serie: '1º Ano', turma: '1ºA', unidade: 'Filial Norte', status: 'Ativo',   matricula: '2024-012' },
];

const PROFESSORES_DATA = [
  { name: 'Prof. Rafael Silva',  subject: 'Matemática', classes: ['1ºA', '2ºA', '3ºB'], unidade: 'Sede',         status: 'Ativo',   email: 'rafael.silva@cuca.edu.br' },
  { name: 'Profa. Carla Lima',   subject: 'Português',  classes: ['1ºB', '2ºB'],         unidade: 'Sede',         status: 'Ativo',   email: 'carla.lima@cuca.edu.br' },
  { name: 'Prof. Marcos Neto',   subject: 'Física',     classes: ['2ºA', '3ºA', '3ºB'], unidade: 'Filial Norte', status: 'Ativo',   email: 'marcos.neto@cuca.edu.br' },
  { name: 'Profa. Ana Souza',    subject: 'Biologia',   classes: ['1ºA', '1ºB', '2ºA'], unidade: 'Sede',         status: 'Licença', email: 'ana.souza@cuca.edu.br' },
  { name: 'Prof. Bruno Costa',   subject: 'História',   classes: ['2ºB', '3ºC'],         unidade: 'Filial Norte', status: 'Ativo',   email: 'bruno.costa@cuca.edu.br' },
  { name: 'Profa. Lúcia Ramos',  subject: 'Química',    classes: ['1ºA', '2ºA', '3ºA'], unidade: 'Sede',         status: 'Ativo',   email: 'lucia.ramos@cuca.edu.br' },
  { name: 'Prof. Diego Alves',   subject: 'Inglês',     classes: ['1ºB', '2ºB', '3ºC'], unidade: 'Filial Norte', status: 'Ativo',   email: 'diego.alves@cuca.edu.br' },
];

const TURMAS_DATA = [
  { name: '1ºA', serie: '1º Ano', students: 32, teacher: 'Prof. Rafael Silva',  unidade: 'Sede',         horario: 'Manhã', freq: 94 },
  { name: '1ºB', serie: '1º Ano', students: 30, teacher: 'Profa. Carla Lima',   unidade: 'Sede',         horario: 'Tarde', freq: 91 },
  { name: '2ºA', serie: '2º Ano', students: 28, teacher: 'Profa. Lúcia Ramos',  unidade: 'Sede',         horario: 'Manhã', freq: 88 },
  { name: '2ºB', serie: '2º Ano', students: 29, teacher: 'Prof. Bruno Costa',   unidade: 'Filial Norte', horario: 'Tarde', freq: 90 },
  { name: '3ºA', serie: '3º Ano', students: 31, teacher: 'Prof. Marcos Neto',   unidade: 'Sede',         horario: 'Manhã', freq: 93 },
  { name: '3ºB', serie: '3º Ano', students: 27, teacher: 'Prof. Rafael Silva',  unidade: 'Filial Norte', horario: 'Noite', freq: 87 },
  { name: '3ºC', serie: '3º Ano', students: 26, teacher: 'Prof. Diego Alves',   unidade: 'Filial Norte', horario: 'Tarde', freq: 89 },
];

const UNIDADES_DATA = [
  { name: 'Sede Principal',  alias: 'Sede',         alunos: 748, turmas: 18, professores: 32, address: 'Rua das Flores, 456 — Centro',      color: Colors.primary },
  { name: 'Filial Norte',    alias: 'Filial Norte', alunos: 499, turmas: 12, professores: 16, address: 'Av. Ipiranga, 1200 — Zona Norte',   color: Colors.info },
];

// ─── DADOS: AULAS / MATERIAIS ────────────────────────────────────────────────

const TIPO_MATERIAL = [
  { id: 'PDF',          label: 'PDF',       icon: 'file-pdf-box',   color: Colors.error },
  { id: 'Vídeo',        label: 'Vídeo',     icon: 'video-box',      color: '#E91E63' },
  { id: 'Áudio',        label: 'Podcast',   icon: 'microphone',     color: Colors.info },
  { id: 'Imagem',       label: 'Imagem',    icon: 'image',          color: Colors.success },
  { id: 'Slides',       label: 'Slides',    icon: 'presentation',   color: '#7B1FA2' },
  { id: 'Link',         label: 'Link',      icon: 'link-variant',   color: Colors.warning },
];

const AULAS_DATA = [
  { id: '1', titulo: 'Funções do 2º Grau',        disciplina: 'Matemática', turmas: ['2ºA', '2ºB'], data: '12/05/2026', status: 'Publicada', materiais: 3 },
  { id: '2', titulo: 'Romantismo Brasileiro',      disciplina: 'Português',  turmas: ['1ºB'],         data: '11/05/2026', status: 'Publicada', materiais: 2 },
  { id: '3', titulo: 'Eletrostática — Cargas',     disciplina: 'Física',     turmas: ['3ºA', '3ºB'], data: '10/05/2026', status: 'Rascunho',  materiais: 1 },
  { id: '4', titulo: 'Ligações Químicas',          disciplina: 'Química',    turmas: ['2ºA'],         data: '09/05/2026', status: 'Publicada', materiais: 4 },
  { id: '5', titulo: 'Segunda Guerra Mundial',     disciplina: 'História',   turmas: ['3ºC'],         data: '08/05/2026', status: 'Publicada', materiais: 2 },
  { id: '6', titulo: 'Ecossistemas Brasileiros',   disciplina: 'Biologia',   turmas: ['1ºA', '2ºA'], data: '07/05/2026', status: 'Rascunho',  materiais: 0 },
];

const MATERIAIS_DATA = [
  { id: '1', titulo: 'Apostila Funções — Cap. 3',       tipo: 'PDF',     disciplina: 'Matemática', turma: '2ºA', tamanho: '2,4 MB',  data: '12/05/2026', icon: 'file-pdf-box',  color: Colors.error },
  { id: '2', titulo: 'Videoaula: Funções Quadráticas',  tipo: 'Vídeo',   disciplina: 'Matemática', turma: '2ºA', tamanho: '145 MB',  data: '12/05/2026', icon: 'video-box',     color: '#E91E63' },
  { id: '3', titulo: 'Mapa Mental — Romantismo',        tipo: 'Imagem',  disciplina: 'Português',  turma: '1ºB', tamanho: '1,1 MB',  data: '11/05/2026', icon: 'image',         color: Colors.success },
  { id: '4', titulo: 'Podcast: Contexto do Romantismo', tipo: 'Áudio',   disciplina: 'Português',  turma: '1ºB', tamanho: '28 MB',   data: '11/05/2026', icon: 'microphone',    color: Colors.info },
  { id: '5', titulo: 'Slides Eletrostática',            tipo: 'Slides',  disciplina: 'Física',     turma: '3ºA', tamanho: '5,8 MB',  data: '10/05/2026', icon: 'presentation',  color: '#7B1FA2' },
  { id: '6', titulo: 'Exercícios Ligações Químicas',    tipo: 'PDF',     disciplina: 'Química',    turma: '2ºA', tamanho: '890 KB',  data: '09/05/2026', icon: 'file-pdf-box',  color: Colors.error },
  { id: '7', titulo: 'Link: Khan Academy — Química',   tipo: 'Link',    disciplina: 'Química',    turma: '2ºA', tamanho: '—',       data: '09/05/2026', icon: 'link-variant',  color: Colors.warning },
  { id: '8', titulo: 'Podcast: Biomas do Brasil',       tipo: 'Áudio',   disciplina: 'Biologia',   turma: '1ºA', tamanho: '42 MB',   data: '07/05/2026', icon: 'microphone',    color: Colors.info },
];

function FinancialManagement() {
  const [finTab, setFinTab] = useState<FinTab>('visao');

  const FIN_TABS: { id: FinTab; label: string; icon: string }[] = [
    { id: 'visao', label: 'Visão geral', icon: 'view-dashboard-outline' },
    { id: 'inadimplencia', label: 'Inadimplência', icon: 'account-alert-outline' },
    { id: 'boletos', label: 'Boletos', icon: 'barcode' },
    { id: 'planos', label: 'Planos', icon: 'tag-multiple-outline' },
    { id: 'relatorios', label: 'Relatórios', icon: 'file-chart-outline' },
  ];

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionBanner}>
        <Icon name="cash-multiple" size={28} color={Colors.success} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Gestão Financeira</Text>
          <Text style={styles.sectionBannerSub}>Mensalidades, boletos, inadimplência e relatórios</Text>
        </View>
      </View>

      {/* SUB-TABS FINANCEIRO */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
        {FIN_TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[finStyles.subTab, finTab === t.id && finStyles.subTabActive]}
            onPress={() => setFinTab(t.id)}
          >
            <Icon name={t.icon} size={14} color={finTab === t.id ? Colors.primary : Colors.textSecondary} />
            <Text style={[finStyles.subTabText, finTab === t.id && finStyles.subTabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ─ VISÃO GERAL ─ */}
      {finTab === 'visao' && (
        <View style={{ gap: Spacing.sm }}>
          <View style={styles.metricsGrid}>
            {[
              { label: 'Receita mensal', value: 'R$ 1.171.530', icon: 'cash-check', color: Colors.success },
              { label: 'Inadimplência', value: 'R$ 12.300', icon: 'alert-circle', color: Colors.error },
              { label: 'Boletos emitidos', value: '1.247', icon: 'file-document', color: Colors.info },
              { label: 'Próx. vencimento', value: '5 dias', icon: 'calendar-clock', color: Colors.warning },
            ].map((m, i) => (
              <View key={i} style={styles.metricCard}>
                <Icon name={m.icon} size={22} color={m.color} />
                <Text style={[styles.metricValue, { color: m.color, fontSize: 13 }]}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.overlineLabel}>Fluxo de caixa — 2026 (em R$ mil)</Text>
          <View style={finStyles.chartCard}>
            {FLUXO_MENSAL.map((m, i) => {
              const maxVal = 1200;
              const receitaPct = (m.receita / maxVal) * 100;
              const despesaPct = (m.despesa / maxVal) * 100;
              return (
                <View key={i} style={finStyles.chartCol}>
                  <View style={finStyles.chartBars}>
                    <View style={[finStyles.chartBar, { height: `${receitaPct}%`, backgroundColor: Colors.success }]} />
                    <View style={[finStyles.chartBar, { height: `${despesaPct}%`, backgroundColor: Colors.error + '80' }]} />
                  </View>
                  <Text style={finStyles.chartLabel}>{m.mes}</Text>
                </View>
              );
            })}
            <View style={finStyles.chartLegend}>
              <View style={finStyles.legendItem}><View style={[finStyles.legendDot, { backgroundColor: Colors.success }]} /><Text style={finStyles.legendText}>Receita</Text></View>
              <View style={finStyles.legendItem}><View style={[finStyles.legendDot, { backgroundColor: Colors.error + '80' }]} /><Text style={finStyles.legendText}>Despesa</Text></View>
            </View>
          </View>

          <Text style={styles.overlineLabel}>Distribuição de inadimplência</Text>
          {[
            { label: 'Até 30 dias', count: 51, value: 'R$ 50.490', pct: 55, color: Colors.warning },
            { label: '31 a 60 dias', count: 18, value: 'R$ 17.820', pct: 25, color: Colors.error },
            { label: 'Acima de 60 dias', count: 12, value: 'R$ 35.640', pct: 20, color: '#7B1FA2' },
          ].map((d, i) => (
            <View key={i} style={finStyles.distRow}>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={finStyles.distHeader}>
                  <Text style={finStyles.distLabel}>{d.label}</Text>
                  <Text style={[finStyles.distValue, { color: d.color }]}>{d.value}</Text>
                </View>
                <View style={finStyles.distBarBg}>
                  <View style={[finStyles.distBarFill, { width: `${d.pct}%`, backgroundColor: d.color }]} />
                </View>
              </View>
              <View style={[finStyles.distBadge, { backgroundColor: d.color + '18' }]}>
                <Text style={[finStyles.distBadgeText, { color: d.color }]}>{d.count} alunos</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ─ INADIMPLÊNCIA ─ */}
      {finTab === 'inadimplencia' && (
        <View style={{ gap: Spacing.sm }}>
          <View style={finStyles.inadSummary}>
            <View style={finStyles.inadStat}>
              <Text style={[finStyles.inadStatValue, { color: Colors.error }]}>81</Text>
              <Text style={finStyles.inadStatLabel}>alunos inadimplentes</Text>
            </View>
            <View style={finStyles.inadStatDivider} />
            <View style={finStyles.inadStat}>
              <Text style={[finStyles.inadStatValue, { color: Colors.error }]}>R$ 103.950</Text>
              <Text style={finStyles.inadStatLabel}>total em aberto</Text>
            </View>
            <View style={finStyles.inadStatDivider} />
            <View style={finStyles.inadStat}>
              <Text style={[finStyles.inadStatValue, { color: Colors.warning }]}>6,5%</Text>
              <Text style={finStyles.inadStatLabel}>taxa de inadimplência</Text>
            </View>
          </View>

          <TouchableOpacity style={finStyles.actionRow} onPress={() => Alert.alert('Cobrança automática', 'Enviar notificação de cobrança para todos os 81 alunos inadimplentes?')} activeOpacity={0.85}>
            <Icon name="send-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Enviar cobrança automática para todos</Text>
          </TouchableOpacity>

          <Text style={styles.overlineLabel}>Lista de inadimplentes</Text>
          {INADIMPLENTES.map((al, i) => (
            <View key={i} style={finStyles.inadCard}>
              <View style={finStyles.inadAvatar}>
                <Icon name="account" size={20} color={Colors.textSecondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={finStyles.inadName}>{al.name}</Text>
                <Text style={finStyles.inadMeta}>{al.class} · {al.months} {al.months === 1 ? 'mês' : 'meses'} em atraso · {al.value}</Text>
              </View>
              <View style={[finStyles.inadStatus, { backgroundColor: al.statusColor + '18' }]}>
                <Text style={[finStyles.inadStatusText, { color: al.statusColor }]}>{al.status}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ─ BOLETOS ─ */}
      {finTab === 'boletos' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => Alert.alert('Emitir boletos', 'Emitir boletos de Junho/2026 para todos os 1.247 alunos ativos?')} activeOpacity={0.85}>
            <Icon name="barcode" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Emitir boletos — Junho/2026</Text>
          </TouchableOpacity>

          <Text style={styles.overlineLabel}>Histórico de competências</Text>
          {BOLETOS_RECENTES.map((b, i) => (
            <View key={i} style={finStyles.boletoCard}>
              <View style={finStyles.boletoHeader}>
                <Text style={finStyles.boletoRef}>{b.ref}</Text>
                <Text style={finStyles.boletoValor}>{b.valor}</Text>
              </View>
              <Text style={finStyles.boletoEmissao}>Emissão: {b.emissao} · {b.total} boletos</Text>
              <View style={finStyles.boletoStats}>
                <View style={finStyles.boletoStat}>
                  <View style={[finStyles.boletoStatDot, { backgroundColor: Colors.success }]} />
                  <Text style={finStyles.boletoStatText}>{b.pagos} pagos</Text>
                </View>
                <View style={finStyles.boletoStat}>
                  <View style={[finStyles.boletoStatDot, { backgroundColor: Colors.warning }]} />
                  <Text style={finStyles.boletoStatText}>{b.pendentes} pendentes</Text>
                </View>
                <View style={finStyles.boletoStat}>
                  <View style={[finStyles.boletoStatDot, { backgroundColor: Colors.textDisabled }]} />
                  <Text style={finStyles.boletoStatText}>{b.cancelados} cancelados</Text>
                </View>
              </View>
              <View style={finStyles.boletoPgBar}>
                <View style={[finStyles.boletoPgFill, { width: `${(b.pagos / b.total) * 100}%` }]} />
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ─ PLANOS ─ */}
      {finTab === 'planos' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => Alert.alert('Novo plano', 'Criar novo plano de mensalidade.')} activeOpacity={0.85}>
            <Icon name="plus-circle-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Criar novo plano</Text>
          </TouchableOpacity>

          <Text style={styles.overlineLabel}>Planos ativos</Text>
          {PLANOS.map((p, i) => (
            <TouchableOpacity key={i} style={finStyles.planoCard} onPress={() => Alert.alert(p.name, `Valor: ${p.value}\nAlunos: ${p.alunos}\nVencimento: ${p.vencimento}`)} activeOpacity={0.85}>
              <View style={finStyles.planoIconWrap}>
                <Icon name="tag-outline" size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={finStyles.planoName}>{p.name}</Text>
                <Text style={finStyles.planoMeta}>{p.alunos} alunos · Vencimento: {p.vencimento}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Text style={finStyles.planoValue}>{p.value}</Text>
                <View style={finStyles.planoActiveBadge}><Text style={finStyles.planoActiveBadgeText}>Ativo</Text></View>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.overlineLabel}>Taxas extras</Text>
          {[
            { name: 'Taxa de matrícula', value: 'R$ 350,00', desc: 'Cobrada anualmente na renovação' },
            { name: 'Material didático', value: 'R$ 280,00', desc: 'Cobrada em Fevereiro e Julho' },
            { name: 'Atividade extracurricular', value: 'R$ 150,00', desc: 'Opcional — mensal' },
          ].map((t, i) => (
            <TouchableOpacity key={i} style={styles.toolCard} activeOpacity={0.85} onPress={() => Alert.alert(t.name, t.desc)}>
              <View style={[styles.toolIcon, { backgroundColor: '#7B1FA2' + '18' }]}>
                <Icon name="cash-plus" size={24} color="#7B1FA2" />
              </View>
              <View style={styles.toolBody}>
                <Text style={styles.toolTitle}>{t.name}</Text>
                <Text style={styles.toolDesc}>{t.desc}</Text>
              </View>
              <Text style={[finStyles.planoValue, { color: '#7B1FA2' }]}>{t.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ─ RELATÓRIOS ─ */}
      {finTab === 'relatorios' && (
        <View style={{ gap: Spacing.sm }}>
          <Text style={styles.overlineLabel}>Relatórios disponíveis</Text>
          {[
            { icon: 'file-chart', color: Colors.primary, title: 'Extrato mensal completo', desc: 'Todas as receitas, despesas e saldo do mês atual.', badge: 'Pronto' },
            { icon: 'trending-up', color: Colors.success, title: 'Projeção de receita', desc: 'Estimativa de receita para os próximos 6 meses com base na taxa de inadimplência.', badge: null },
            { icon: 'account-alert', color: Colors.error, title: 'Relatório de inadimplência', desc: 'Detalhamento por aluno, turma e período em atraso.', badge: 'Pronto' },
            { icon: 'calendar-month', color: Colors.warning, title: 'Fluxo de caixa anual', desc: 'Histórico de entradas e saídas mês a mês.', badge: null },
            { icon: 'tag-multiple', color: '#7B1FA2', title: 'Relatório por plano', desc: 'Receita segmentada por tipo de mensalidade e bolsa.', badge: null },
            { icon: 'bank-transfer', color: Colors.info, title: 'Conciliação bancária', desc: 'Comparativo entre boletos pagos e lançamentos bancários.', badge: 'Pronto' },
          ].map((r, i) => (
            <TouchableOpacity key={i} style={styles.toolCard} activeOpacity={0.85} onPress={() => Alert.alert(r.title, r.desc)}>
              <View style={[styles.toolIcon, { backgroundColor: r.color + '18' }]}>
                <Icon name={r.icon} size={26} color={r.color} />
              </View>
              <View style={styles.toolBody}>
                <View style={styles.toolTitleRow}>
                  <Text style={styles.toolTitle}>{r.title}</Text>
                  {r.badge && (
                    <View style={[styles.aiBadge, { backgroundColor: Colors.success + '18' }]}>
                      <Icon name="check-circle-outline" size={11} color={Colors.success} />
                      <Text style={[styles.aiBadgeText, { color: Colors.success }]}>{r.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.toolDesc}>{r.desc}</Text>
              </View>
              <Icon name="download-outline" size={20} color={Colors.textDisabled} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── GESTÃO ACADÊMICA ────────────────────────────────────────────────────────

function AcademicManagement() {
  const classes = [
    { name: '1º Ano A', students: 32, teacher: 'Prof. Silva', attendance: 94 },
    { name: '2º Ano B', students: 28, teacher: 'Profa. Lima', attendance: 88 },
    { name: '3º Ano C', students: 30, teacher: 'Prof. Marcos', attendance: 91 },
  ];

  return (
    <View style={styles.tabContent}>
      <View style={styles.sectionBanner}>
        <Icon name="school-outline" size={28} color={Colors.info} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Gestão Acadêmica</Text>
          <Text style={styles.sectionBannerSub}>Turmas, notas, frequência e currículo</Text>
        </View>
      </View>

      <Text style={styles.overlineLabel}>Ferramentas acadêmicas</Text>
      {[
        { icon: 'account-group-outline', color: Colors.primary, title: 'Gestão de Turmas e Horários', desc: 'Organize turmas, grades horárias e alocação de professores.' },
        { icon: 'notebook-edit-outline', color: '#7B1FA2', title: 'Diário de Classe Digital', desc: 'Registro de aulas, conteúdos ministrados e ocorrências por turma.' },
        { icon: 'numeric', color: Colors.success, title: 'Lançamento de Notas', desc: 'Lançamento centralizado de notas por disciplina e bimestre.' },
        { icon: 'clipboard-account-outline', color: Colors.warning, title: 'Controle de Frequência', desc: 'Registro de presença diário com alertas automáticos para faltas.' },
        { icon: 'map-outline', color: Colors.info, title: 'Planejador Curricular', desc: 'Mapeamento do currículo por turma, disciplina e período letivo.' },
      ].map((a, i) => (
        <TouchableOpacity key={i} style={styles.toolCard} activeOpacity={0.85} onPress={() => Alert.alert(a.title, a.desc)}>
          <View style={[styles.toolIcon, { backgroundColor: a.color + '18' }]}>
            <Icon name={a.icon} size={26} color={a.color} />
          </View>
          <View style={styles.toolBody}>
            <Text style={styles.toolTitle}>{a.title}</Text>
            <Text style={styles.toolDesc}>{a.desc}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
        </TouchableOpacity>
      ))}

      <Text style={[styles.overlineLabel, { marginTop: Spacing.md }]}>Turmas ativas</Text>
      {classes.map((c, i) => (
        <View key={i} style={styles.classCard}>
          <View style={styles.classIconWrap}>
            <Icon name="account-group" size={24} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.classTitle}>{c.name}</Text>
            <Text style={styles.classSub}>{c.students} alunos · {c.teacher}</Text>
          </View>
          <View style={styles.attendancePill}>
            <Text style={[styles.attendanceText, { color: c.attendance >= 90 ? Colors.success : Colors.warning }]}>
              {c.attendance}%
            </Text>
            <Text style={styles.attendanceLabel}>freq.</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── MODAL: CADASTRAR ALUNO ──────────────────────────────────────────────────

const TURMA_SERIE: Record<string, string> = {
  '1ºA': '1º Ano', '1ºB': '1º Ano',
  '2ºA': '2º Ano', '2ºB': '2º Ano',
  '3ºA': '3º Ano', '3ºB': '3º Ano', '3ºC': '3º Ano',
};

function CadastrarAlunoModal({
  visible, onClose, onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Omit<Aluno, 'id'>) => Promise<void>;
}) {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [turma, setTurma] = useState('');
  const [unidade, setUnidade] = useState('');
  const [plano, setPlano] = useState('');
  const [nomeResp, setNomeResp] = useState('');
  const [emailResp, setEmailResp] = useState('');
  const [telefoneResp, setTelefoneResp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const TURMAS_OPTS = ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB', '3ºC'];
  const PLANOS_OPTS = ['Mensalidade Padrão', 'Mensalidade Plus', 'Bolsa Integral', 'Bolsa 50%'];

  const handleClose = () => {
    setNome(''); setDataNasc(''); setSexo(''); setTurma(''); setUnidade('');
    setPlano(''); setNomeResp(''); setEmailResp(''); setTelefoneResp('');
    setSubmitted(false); setSaving(false); onClose();
  };

  const handleSubmit = async () => {
    if (!nome.trim() || !turma || !unidade || !nomeResp.trim()) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios: nome, turma, unidade e responsável.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        nome,
        serie: TURMA_SERIE[turma] ?? '',
        turma,
        unidade,
        status: 'ativo',
        matricula: `${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
        dataNasc,
        sexo,
        plano,
        responsavel: { nome: nomeResp, email: emailResp, telefone: telefoneResp },
      });
      setSubmitted(true);
    } catch (err: any) {
      Alert.alert('Erro', err?.message ?? 'Erro ao cadastrar aluno.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={peStyles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={peStyles.sheet}>
              <View style={peStyles.handle} />
              {submitted ? (
                <View style={peStyles.successContent}>
                  <View style={peStyles.successIcon}>
                    <Icon name="account-check" size={52} color={Colors.success} />
                  </View>
                  <Text style={peStyles.successTitle}>Aluno cadastrado!</Text>
                  <Text style={peStyles.successSub}>
                    {nome} foi matriculado na turma {turma} — {unidade}.{'\n'}O responsável receberá as instruções de acesso por e-mail.
                  </Text>
                  <TouchableOpacity style={peStyles.doneBtn} onPress={handleClose}>
                    <Text style={peStyles.doneBtnText}>Concluir</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  <View style={peStyles.modalHeader}>
                    <View>
                      <Text style={peStyles.modalTitle}>Cadastrar Aluno</Text>
                      <Text style={peStyles.modalSub}>Campos com * são obrigatórios</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Icon name="close" size={22} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <Text style={peStyles.sectionLabel}>Dados do aluno</Text>

                  <Text style={peStyles.fieldLabel}>Nome completo *</Text>
                  <TextInput style={peStyles.textInput} placeholder="Nome do aluno" placeholderTextColor={Colors.textDisabled} value={nome} onChangeText={setNome} />

                  <Text style={peStyles.fieldLabel}>Data de nascimento</Text>
                  <TextInput style={peStyles.textInput} placeholder="DD/MM/AAAA" placeholderTextColor={Colors.textDisabled} value={dataNasc} onChangeText={setDataNasc} keyboardType="numeric" />

                  <Text style={peStyles.fieldLabel}>Sexo</Text>
                  <View style={peStyles.optRow}>
                    {['Masculino', 'Feminino'].map(s => (
                      <TouchableOpacity key={s} style={[peStyles.optBtn, sexo === s && peStyles.optBtnActive]} onPress={() => setSexo(s)}>
                        <Text style={[peStyles.optBtnText, sexo === s && peStyles.optBtnTextActive]}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.sectionLabel}>Turma e unidade</Text>

                  <Text style={peStyles.fieldLabel}>Turma *</Text>
                  <View style={peStyles.chipGrid}>
                    {TURMAS_OPTS.map(t => (
                      <TouchableOpacity key={t} style={[peStyles.chip, turma === t && peStyles.chipActive]} onPress={() => setTurma(t)}>
                        <Text style={[peStyles.chipText, turma === t && peStyles.chipTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.fieldLabel}>Unidade *</Text>
                  <View style={peStyles.optRow}>
                    {['Sede', 'Filial Norte'].map(u => (
                      <TouchableOpacity key={u} style={[peStyles.optBtn, unidade === u && peStyles.optBtnActive]} onPress={() => setUnidade(u)}>
                        <Text style={[peStyles.optBtnText, unidade === u && peStyles.optBtnTextActive]}>{u}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.fieldLabel}>Plano de mensalidade</Text>
                  <View style={peStyles.chipGrid}>
                    {PLANOS_OPTS.map(p => (
                      <TouchableOpacity key={p} style={[peStyles.chip, plano === p && peStyles.chipActive]} onPress={() => setPlano(p)}>
                        <Text style={[peStyles.chipText, plano === p && peStyles.chipTextActive]}>{p}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.sectionLabel}>Responsável</Text>

                  <Text style={peStyles.fieldLabel}>Nome do responsável *</Text>
                  <TextInput style={peStyles.textInput} placeholder="Nome do pai, mãe ou responsável" placeholderTextColor={Colors.textDisabled} value={nomeResp} onChangeText={setNomeResp} />

                  <Text style={peStyles.fieldLabel}>E-mail do responsável</Text>
                  <TextInput style={peStyles.textInput} placeholder="email@exemplo.com" placeholderTextColor={Colors.textDisabled} value={emailResp} onChangeText={setEmailResp} keyboardType="email-address" autoCapitalize="none" />

                  <Text style={peStyles.fieldLabel}>Telefone do responsável</Text>
                  <TextInput style={peStyles.textInput} placeholder="(00) 00000-0000" placeholderTextColor={Colors.textDisabled} value={telefoneResp} onChangeText={setTelefoneResp} keyboardType="phone-pad" />

                  <TouchableOpacity
                    style={[peStyles.submitBtn, saving && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={saving}
                  >
                    {saving
                      ? <ActivityIndicator color={Colors.white} size="small" />
                      : <><Icon name="account-plus" size={20} color={Colors.white} /><Text style={peStyles.submitBtnText}>Cadastrar aluno</Text></>
                    }
                  </TouchableOpacity>
                  <View style={{ height: Spacing.xl }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── MODAL: CADASTRAR PROFESSOR ──────────────────────────────────────────────

function CadastrarProfessorModal({
  visible, onClose, onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Omit<Professor, 'id'>) => Promise<void>;
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [unidade, setUnidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const SUBS = ['Matemática', 'Física', 'Química', 'Biologia', 'Português', 'História', 'Geografia', 'Inglês', 'Artes', 'Ed. Física'];
  const CLS  = ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB', '3ºC'];

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);

  const handleClose = () => {
    setNome(''); setEmail(''); setTelefone(''); setSelectedSubjects([]);
    setSelectedClasses([]); setUnidade(''); setTipo(''); setSubmitted(false); setSaving(false); onClose();
  };

  const handleSubmit = async () => {
    if (!nome.trim() || selectedSubjects.length === 0 || !unidade) {
      Alert.alert('Atenção', 'Preencha nome, ao menos uma disciplina e a unidade.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        nome, email, telefone,
        disciplinas: selectedSubjects,
        turmas: selectedClasses,
        unidade, tipo,
        status: 'ativo',
      });
      setSubmitted(true);
    } catch (err: any) {
      Alert.alert('Erro', err?.message ?? 'Erro ao cadastrar professor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={peStyles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={peStyles.sheet}>
              <View style={peStyles.handle} />
              {submitted ? (
                <View style={peStyles.successContent}>
                  <View style={peStyles.successIcon}>
                    <Icon name="account-tie" size={52} color={Colors.success} />
                  </View>
                  <Text style={peStyles.successTitle}>Professor cadastrado!</Text>
                  <Text style={peStyles.successSub}>
                    {nome} foi adicionado ao quadro docente — {unidade}.{'\n'}As credenciais de acesso serão enviadas por e-mail.
                  </Text>
                  <TouchableOpacity style={peStyles.doneBtn} onPress={handleClose}>
                    <Text style={peStyles.doneBtnText}>Concluir</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  <View style={peStyles.modalHeader}>
                    <View>
                      <Text style={peStyles.modalTitle}>Cadastrar Professor</Text>
                      <Text style={peStyles.modalSub}>Campos com * são obrigatórios</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Icon name="close" size={22} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <Text style={peStyles.sectionLabel}>Dados pessoais</Text>

                  <Text style={peStyles.fieldLabel}>Nome completo *</Text>
                  <TextInput style={peStyles.textInput} placeholder="Nome do professor" placeholderTextColor={Colors.textDisabled} value={nome} onChangeText={setNome} />

                  <Text style={peStyles.fieldLabel}>E-mail institucional</Text>
                  <TextInput style={peStyles.textInput} placeholder="professor@cuca.edu.br" placeholderTextColor={Colors.textDisabled} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

                  <Text style={peStyles.fieldLabel}>Telefone</Text>
                  <TextInput style={peStyles.textInput} placeholder="(00) 00000-0000" placeholderTextColor={Colors.textDisabled} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

                  <Text style={peStyles.fieldLabel}>Tipo de contrato</Text>
                  <View style={peStyles.optRow}>
                    {['Efetivo', 'Substituto', 'Horista'].map(t => (
                      <TouchableOpacity key={t} style={[peStyles.optBtn, tipo === t && peStyles.optBtnActive]} onPress={() => setTipo(t)}>
                        <Text style={[peStyles.optBtnText, tipo === t && peStyles.optBtnTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.sectionLabel}>Disciplinas e turmas</Text>

                  <Text style={peStyles.fieldLabel}>Disciplinas *</Text>
                  <View style={peStyles.chipGrid}>
                    {SUBS.map(s => (
                      <TouchableOpacity key={s} style={[peStyles.chip, selectedSubjects.includes(s) && peStyles.chipActive]} onPress={() => toggle(selectedSubjects, setSelectedSubjects, s)}>
                        {selectedSubjects.includes(s) && <Icon name="check" size={11} color={Colors.primary} />}
                        <Text style={[peStyles.chipText, selectedSubjects.includes(s) && peStyles.chipTextActive]}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.fieldLabel}>Turmas</Text>
                  <View style={peStyles.chipGrid}>
                    {CLS.map(c => (
                      <TouchableOpacity key={c} style={[peStyles.chip, selectedClasses.includes(c) && peStyles.chipActive]} onPress={() => toggle(selectedClasses, setSelectedClasses, c)}>
                        {selectedClasses.includes(c) && <Icon name="check" size={11} color={Colors.primary} />}
                        <Text style={[peStyles.chipText, selectedClasses.includes(c) && peStyles.chipTextActive]}>{c}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.fieldLabel}>Unidade *</Text>
                  <View style={peStyles.optRow}>
                    {['Sede', 'Filial Norte'].map(u => (
                      <TouchableOpacity key={u} style={[peStyles.optBtn, unidade === u && peStyles.optBtnActive]} onPress={() => setUnidade(u)}>
                        <Text style={[peStyles.optBtnText, unidade === u && peStyles.optBtnTextActive]}>{u}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[peStyles.submitBtn, saving && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={saving}
                  >
                    {saving
                      ? <ActivityIndicator color={Colors.white} size="small" />
                      : <><Icon name="account-tie" size={20} color={Colors.white} /><Text style={peStyles.submitBtnText}>Cadastrar professor</Text></>
                    }
                  </TouchableOpacity>
                  <View style={{ height: Spacing.xl }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── GESTÃO DE PESSOAS ───────────────────────────────────────────────────────

function PeopleManagement() {
  const [peopleTab, setPeopleTab] = useState<PeopleTab>('alunos');
  const [alunoModalVisible, setAlunoModalVisible] = useState(false);
  const [profModalVisible, setProfModalVisible] = useState(false);

  const [searchAluno, setSearchAluno] = useState('');
  const [filterSerie, setFilterSerie] = useState('');
  const [filterTurma, setFilterTurma] = useState('');
  const [filterUnidade, setFilterUnidade] = useState('');

  const [searchProf, setSearchProf] = useState('');
  const [filterProfUnidade, setFilterProfUnidade] = useState('');

  const [filterTurmaSerie, setFilterTurmaSerie] = useState('');
  const [filterTurmaUnidade, setFilterTurmaUnidade] = useState('');

  const { data: alunosData, loading: alunosLoading } = useAlunos();
  const { data: professoresData, loading: professoresLoading } = useProfessores();
  const { data: turmasData, loading: turmasLoading } = useTurmas();

  const SERIES   = ['1º Ano', '2º Ano', '3º Ano'];
  const UNIDADES = ['Sede', 'Filial Norte'];

  const filteredAlunos = alunosData.filter(a =>
    a.nome.toLowerCase().includes(searchAluno.toLowerCase()) &&
    (!filterSerie   || a.serie   === filterSerie) &&
    (!filterTurma   || a.turma   === filterTurma) &&
    (!filterUnidade || a.unidade === filterUnidade)
  );

  const filteredProfessores = professoresData.filter(p =>
    (p.nome.toLowerCase().includes(searchProf.toLowerCase()) ||
     p.disciplinas.some(d => d.toLowerCase().includes(searchProf.toLowerCase()))) &&
    (!filterProfUnidade || p.unidade === filterProfUnidade)
  );

  const filteredTurmas = turmasData.filter(t =>
    (!filterTurmaSerie   || t.serie   === filterTurmaSerie) &&
    (!filterTurmaUnidade || t.unidade === filterTurmaUnidade)
  );

  const PEOPLE_TABS: { id: PeopleTab; label: string; icon: string; count: number }[] = [
    { id: 'alunos',      label: 'Alunos',      icon: 'account-school-outline', count: alunosData.length },
    { id: 'professores', label: 'Professores',  icon: 'account-tie-outline',    count: professoresData.length },
    { id: 'turmas',      label: 'Turmas',       icon: 'account-group-outline',  count: turmasData.length },
    { id: 'unidades',    label: 'Unidades',     icon: 'domain',                 count: UNIDADES_DATA.length },
  ];

  const STATUS_COLOR: Record<string, string> = {
    ativo: Colors.success,
    inativo: Colors.error,
    licenca: Colors.warning,
  };

  const STATUS_LABEL: Record<string, string> = {
    ativo: 'Ativo',
    inativo: 'Inativo',
    licenca: 'Licença',
  };

  const hasAlunoFilter = !!(filterSerie || filterTurma || filterUnidade || searchAluno);

  return (
    <View style={styles.tabContent}>
      <CadastrarAlunoModal
        visible={alunoModalVisible}
        onClose={() => setAlunoModalVisible(false)}
        onSave={async data => { await addAluno(data); }}
      />
      <CadastrarProfessorModal
        visible={profModalVisible}
        onClose={() => setProfModalVisible(false)}
        onSave={async data => { await addProfessor(data); }}
      />

      <View style={[styles.sectionBanner, { borderLeftColor: '#7B1FA2' }]}>
        <Icon name="account-multiple-outline" size={28} color="#7B1FA2" />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Gestão de Pessoas</Text>
          <Text style={styles.sectionBannerSub}>Alunos, professores, turmas e unidades</Text>
        </View>
      </View>

      {/* SUB-TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
        {PEOPLE_TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[peStyles.subTab, peopleTab === t.id && peStyles.subTabActive]}
            onPress={() => setPeopleTab(t.id)}
          >
            <Icon name={t.icon} size={14} color={peopleTab === t.id ? Colors.primary : Colors.textSecondary} />
            <Text style={[peStyles.subTabText, peopleTab === t.id && peStyles.subTabTextActive]}>{t.label}</Text>
            <View style={[peStyles.countBadge, peopleTab === t.id && peStyles.countBadgeActive]}>
              <Text style={[peStyles.countBadgeText, peopleTab === t.id && peStyles.countBadgeTextActive]}>{t.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ─ ALUNOS ─ */}
      {peopleTab === 'alunos' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => setAlunoModalVisible(true)} activeOpacity={0.85}>
            <Icon name="account-plus-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Cadastrar novo aluno</Text>
          </TouchableOpacity>

          <View style={peStyles.searchBox}>
            <Icon name="magnify" size={18} color={Colors.textSecondary} />
            <TextInput
              style={peStyles.searchInput}
              placeholder="Buscar aluno por nome..."
              placeholderTextColor={Colors.textDisabled}
              value={searchAluno}
              onChangeText={setSearchAluno}
            />
            {searchAluno.length > 0 && (
              <TouchableOpacity onPress={() => setSearchAluno('')}>
                <Icon name="close-circle" size={16} color={Colors.textDisabled} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.overlineLabel}>Série</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterSerie && peStyles.filterChipActive]} onPress={() => { setFilterSerie(''); setFilterTurma(''); }}>
              <Text style={[peStyles.filterChipText, !filterSerie && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {SERIES.map(s => (
              <TouchableOpacity key={s} style={[peStyles.filterChip, filterSerie === s && peStyles.filterChipActive]} onPress={() => { setFilterSerie(s === filterSerie ? '' : s); setFilterTurma(''); }}>
                <Text style={[peStyles.filterChipText, filterSerie === s && peStyles.filterChipTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filterSerie !== '' && (
            <>
              <Text style={styles.overlineLabel}>Turma</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
                <TouchableOpacity style={[peStyles.filterChip, !filterTurma && peStyles.filterChipActive]} onPress={() => setFilterTurma('')}>
                  <Text style={[peStyles.filterChipText, !filterTurma && peStyles.filterChipTextActive]}>Todas</Text>
                </TouchableOpacity>
                {turmasData.filter(t => t.serie === filterSerie).map(t => (
                  <TouchableOpacity key={t.nome} style={[peStyles.filterChip, filterTurma === t.nome && peStyles.filterChipActive]} onPress={() => setFilterTurma(filterTurma === t.nome ? '' : t.nome)}>
                    <Text style={[peStyles.filterChipText, filterTurma === t.nome && peStyles.filterChipTextActive]}>{t.nome}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          <Text style={styles.overlineLabel}>Unidade</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterUnidade && peStyles.filterChipActive]} onPress={() => setFilterUnidade('')}>
              <Text style={[peStyles.filterChipText, !filterUnidade && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {UNIDADES.map(u => (
              <TouchableOpacity key={u} style={[peStyles.filterChip, filterUnidade === u && peStyles.filterChipActive]} onPress={() => setFilterUnidade(filterUnidade === u ? '' : u)}>
                <Text style={[peStyles.filterChipText, filterUnidade === u && peStyles.filterChipTextActive]}>{u}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={peStyles.resultRow}>
            <Text style={peStyles.resultText}>{filteredAlunos.length} aluno(s) encontrado(s)</Text>
            {hasAlunoFilter && (
              <TouchableOpacity onPress={() => { setFilterSerie(''); setFilterTurma(''); setFilterUnidade(''); setSearchAluno(''); }}>
                <Text style={peStyles.clearFilters}>Limpar filtros</Text>
              </TouchableOpacity>
            )}
          </View>

          {alunosLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.md }} />}

          {filteredAlunos.map((al, i) => (
            <TouchableOpacity
              key={al.id ?? i}
              style={peStyles.personCard}
              onPress={() => Alert.alert(al.nome, `Matrícula: #${al.matricula}\nTurma: ${al.turma}\nSérie: ${al.serie}\nUnidade: ${al.unidade}\nStatus: ${STATUS_LABEL[al.status] ?? al.status}`)}
              activeOpacity={0.85}
            >
              <View style={peStyles.personAvatar}>
                <Text style={peStyles.personAvatarText}>{al.nome.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={peStyles.personName}>{al.nome}</Text>
                <Text style={peStyles.personMeta}>{al.serie} · {al.turma} · {al.unidade}</Text>
                <Text style={peStyles.personMeta2}>Mat. #{al.matricula}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 5 }}>
                <View style={[peStyles.statusPill, { backgroundColor: (STATUS_COLOR[al.status] ?? Colors.textDisabled) + '18' }]}>
                  <Text style={[peStyles.statusPillText, { color: STATUS_COLOR[al.status] ?? Colors.textDisabled }]}>{STATUS_LABEL[al.status] ?? al.status}</Text>
                </View>
                <Icon name="chevron-right" size={16} color={Colors.textDisabled} />
              </View>
            </TouchableOpacity>
          ))}

          {!alunosLoading && filteredAlunos.length === 0 && (
            <View style={peStyles.emptyState}>
              <Icon name="account-search" size={40} color={Colors.textDisabled} />
              <Text style={peStyles.emptyText}>Nenhum aluno encontrado</Text>
              <Text style={peStyles.emptySubText}>Ajuste os filtros ou a busca</Text>
            </View>
          )}
        </View>
      )}

      {/* ─ PROFESSORES ─ */}
      {peopleTab === 'professores' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => setProfModalVisible(true)} activeOpacity={0.85}>
            <Icon name="account-tie-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Cadastrar novo professor</Text>
          </TouchableOpacity>

          <View style={peStyles.searchBox}>
            <Icon name="magnify" size={18} color={Colors.textSecondary} />
            <TextInput
              style={peStyles.searchInput}
              placeholder="Buscar por nome ou disciplina..."
              placeholderTextColor={Colors.textDisabled}
              value={searchProf}
              onChangeText={setSearchProf}
            />
            {searchProf.length > 0 && (
              <TouchableOpacity onPress={() => setSearchProf('')}>
                <Icon name="close-circle" size={16} color={Colors.textDisabled} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.overlineLabel}>Unidade</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterProfUnidade && peStyles.filterChipActive]} onPress={() => setFilterProfUnidade('')}>
              <Text style={[peStyles.filterChipText, !filterProfUnidade && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {UNIDADES.map(u => (
              <TouchableOpacity key={u} style={[peStyles.filterChip, filterProfUnidade === u && peStyles.filterChipActive]} onPress={() => setFilterProfUnidade(filterProfUnidade === u ? '' : u)}>
                <Text style={[peStyles.filterChipText, filterProfUnidade === u && peStyles.filterChipTextActive]}>{u}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={peStyles.resultRow}>
            <Text style={peStyles.resultText}>{filteredProfessores.length} professor(es)</Text>
          </View>

          {professoresLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.md }} />}

          {filteredProfessores.map((p, i) => (
            <TouchableOpacity
              key={p.id ?? i}
              style={peStyles.personCard}
              onPress={() => Alert.alert(p.nome, `Disciplinas: ${p.disciplinas.join(', ')}\nTurmas: ${p.turmas.join(', ')}\nUnidade: ${p.unidade}\nStatus: ${STATUS_LABEL[p.status] ?? p.status}\nE-mail: ${p.email}`)}
              activeOpacity={0.85}
            >
              <View style={[peStyles.personAvatar, { backgroundColor: Colors.primary + '18' }]}>
                <Icon name="account-tie" size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={peStyles.personName}>{p.nome}</Text>
                <Text style={peStyles.personMeta}>{p.disciplinas.join(', ')} · {p.unidade}</Text>
                <View style={peStyles.classChipsRow}>
                  {p.turmas.map(c => (
                    <View key={c} style={peStyles.classChip}>
                      <Text style={peStyles.classChipText}>{c}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 5 }}>
                <View style={[peStyles.statusPill, { backgroundColor: (STATUS_COLOR[p.status] ?? Colors.textDisabled) + '18' }]}>
                  <Text style={[peStyles.statusPillText, { color: STATUS_COLOR[p.status] ?? Colors.textDisabled }]}>{STATUS_LABEL[p.status] ?? p.status}</Text>
                </View>
                <Icon name="chevron-right" size={16} color={Colors.textDisabled} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ─ TURMAS ─ */}
      {peopleTab === 'turmas' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => Alert.alert('Nova turma', 'Criar uma nova turma.')} activeOpacity={0.85}>
            <Icon name="plus-circle-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Criar nova turma</Text>
          </TouchableOpacity>

          <Text style={styles.overlineLabel}>Série</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterTurmaSerie && peStyles.filterChipActive]} onPress={() => setFilterTurmaSerie('')}>
              <Text style={[peStyles.filterChipText, !filterTurmaSerie && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {SERIES.map(s => (
              <TouchableOpacity key={s} style={[peStyles.filterChip, filterTurmaSerie === s && peStyles.filterChipActive]} onPress={() => setFilterTurmaSerie(filterTurmaSerie === s ? '' : s)}>
                <Text style={[peStyles.filterChipText, filterTurmaSerie === s && peStyles.filterChipTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.overlineLabel}>Unidade</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterTurmaUnidade && peStyles.filterChipActive]} onPress={() => setFilterTurmaUnidade('')}>
              <Text style={[peStyles.filterChipText, !filterTurmaUnidade && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {UNIDADES.map(u => (
              <TouchableOpacity key={u} style={[peStyles.filterChip, filterTurmaUnidade === u && peStyles.filterChipActive]} onPress={() => setFilterTurmaUnidade(filterTurmaUnidade === u ? '' : u)}>
                <Text style={[peStyles.filterChipText, filterTurmaUnidade === u && peStyles.filterChipTextActive]}>{u}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={peStyles.resultRow}>
            <Text style={peStyles.resultText}>{filteredTurmas.length} turma(s)</Text>
          </View>

          {turmasLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.md }} />}

          {filteredTurmas.map((t, i) => {
            const freq = t.freq ?? 0;
            return (
              <TouchableOpacity
                key={t.id ?? i}
                style={peStyles.turmaCard}
                onPress={() => Alert.alert(t.nome, `Série: ${t.serie}\nAlunos: ${t.students ?? 0}\nProfessor: ${t.professor}\nUnidade: ${t.unidade}\nHorário: ${t.horario}\nFrequência: ${freq}%`)}
                activeOpacity={0.85}
              >
                <View style={peStyles.turmaIconWrap}>
                  <Text style={peStyles.turmaIconText}>{t.nome}</Text>
                </View>
                <View style={{ flex: 1, gap: 3 }}>
                  <Text style={peStyles.turmaTitle}>{t.serie} — Turma {t.nome.charAt(t.nome.length - 1)}</Text>
                  <Text style={peStyles.turmaMeta}>{t.students ?? 0} alunos · {t.professor}</Text>
                  <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
                    <View style={peStyles.turmaChip}>
                      <Icon name="clock-outline" size={11} color={Colors.textSecondary} />
                      <Text style={peStyles.turmaChipText}>{t.horario}</Text>
                    </View>
                    <View style={peStyles.turmaChip}>
                      <Icon name="domain" size={11} color={Colors.textSecondary} />
                      <Text style={peStyles.turmaChipText}>{t.unidade}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={[peStyles.freqValue, { color: freq >= 90 ? Colors.success : Colors.warning }]}>{freq}%</Text>
                  <Text style={peStyles.freqLabel}>freq.</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ─ UNIDADES ─ */}
      {peopleTab === 'unidades' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => Alert.alert('Nova unidade', 'Cadastrar nova unidade escolar.')} activeOpacity={0.85}>
            <Icon name="domain-plus" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Adicionar unidade</Text>
          </TouchableOpacity>

          {UNIDADES_DATA.map((u, i) => (
            <TouchableOpacity
              key={i}
              style={peStyles.unidadeCard}
              onPress={() => Alert.alert(u.name, `Endereço: ${u.address}\nAlunos: ${u.alunos}\nTurmas: ${u.turmas}\nProfessores: ${u.professores}`)}
              activeOpacity={0.85}
            >
              <View style={[peStyles.unidadeHeader, { borderBottomColor: u.color }]}>
                <View style={[peStyles.unidadeIconWrap, { backgroundColor: u.color + '18' }]}>
                  <Icon name="domain" size={26} color={u.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={peStyles.unidadeName}>{u.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Icon name="map-marker-outline" size={13} color={Colors.textSecondary} />
                    <Text style={peStyles.unidadeAddress} numberOfLines={1}>{u.address}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
              </View>
              <View style={peStyles.unidadeStats}>
                <View style={peStyles.unidadeStat}>
                  <Icon name="account-school" size={18} color={u.color} />
                  <Text style={[peStyles.unidadeStatValue, { color: u.color }]}>{u.alunos}</Text>
                  <Text style={peStyles.unidadeStatLabel}>alunos</Text>
                </View>
                <View style={peStyles.unidadeStatDivider} />
                <View style={peStyles.unidadeStat}>
                  <Icon name="account-group" size={18} color={u.color} />
                  <Text style={[peStyles.unidadeStatValue, { color: u.color }]}>{u.turmas}</Text>
                  <Text style={peStyles.unidadeStatLabel}>turmas</Text>
                </View>
                <View style={peStyles.unidadeStatDivider} />
                <View style={peStyles.unidadeStat}>
                  <Icon name="account-tie" size={18} color={u.color} />
                  <Text style={[peStyles.unidadeStatValue, { color: u.color }]}>{u.professores}</Text>
                  <Text style={peStyles.unidadeStatLabel}>professores</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── MODAL: CADASTRAR AULA ───────────────────────────────────────────────────

function CadastrarAulaModal({
  visible, onClose, onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { titulo: string; disciplina: string; turmas: string[]; data: string; descricao: string; status: 'publicada' | 'rascunho' }) => Promise<void>;
}) {
  const [titulo, setTitulo] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [selectedTurmas, setSelectedTurmas] = useState<string[]>([]);
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Rascunho');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const DISCS = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Inglês'];
  const TURMS = ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB', '3ºC'];

  const toggleTurma = (t: string) =>
    setSelectedTurmas(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleClose = () => {
    setTitulo(''); setDisciplina(''); setSelectedTurmas([]); setData('');
    setDescricao(''); setStatus('Rascunho'); setSubmitted(false); setSaving(false); onClose();
  };

  const handleSubmit = async () => {
    if (!titulo.trim() || !disciplina || selectedTurmas.length === 0) {
      Alert.alert('Atenção', 'Preencha título, disciplina e ao menos uma turma.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        titulo, disciplina,
        turmas: selectedTurmas,
        data, descricao,
        status: status === 'Publicada' ? 'publicada' : 'rascunho',
      });
      setSubmitted(true);
    } catch (err: any) {
      Alert.alert('Erro', err?.message ?? 'Erro ao salvar aula.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={peStyles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={peStyles.sheet}>
              <View style={peStyles.handle} />
              {submitted ? (
                <View style={peStyles.successContent}>
                  <View style={peStyles.successIcon}>
                    <Icon name="book-check" size={52} color={Colors.success} />
                  </View>
                  <Text style={peStyles.successTitle}>Aula cadastrada!</Text>
                  <Text style={peStyles.successSub}>
                    "{titulo}" foi criada para {selectedTurmas.join(', ')}.{'\n'}
                    Status: {status}. Os alunos serão notificados ao publicar.
                  </Text>
                  <TouchableOpacity style={peStyles.doneBtn} onPress={handleClose}>
                    <Text style={peStyles.doneBtnText}>Concluir</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  <View style={peStyles.modalHeader}>
                    <View>
                      <Text style={peStyles.modalTitle}>Cadastrar Aula</Text>
                      <Text style={peStyles.modalSub}>Campos com * são obrigatórios</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Icon name="close" size={22} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <Text style={peStyles.sectionLabel}>Informações da aula</Text>

                  <Text style={peStyles.fieldLabel}>Título *</Text>
                  <TextInput style={peStyles.textInput} placeholder="Ex: Funções do 2º Grau — Introdução" placeholderTextColor={Colors.textDisabled} value={titulo} onChangeText={setTitulo} />

                  <Text style={peStyles.fieldLabel}>Data da aula</Text>
                  <TextInput style={peStyles.textInput} placeholder="DD/MM/AAAA" placeholderTextColor={Colors.textDisabled} value={data} onChangeText={setData} keyboardType="numeric" />

                  <Text style={peStyles.fieldLabel}>Descrição / objetivos</Text>
                  <TextInput
                    style={[peStyles.textInput, contStyles.textArea]}
                    placeholder="Descreva o conteúdo e os objetivos de aprendizagem..."
                    placeholderTextColor={Colors.textDisabled}
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />

                  <Text style={peStyles.fieldLabel}>Status</Text>
                  <View style={peStyles.optRow}>
                    {['Rascunho', 'Publicada'].map(s => (
                      <TouchableOpacity key={s} style={[peStyles.optBtn, status === s && peStyles.optBtnActive]} onPress={() => setStatus(s)}>
                        <Icon name={s === 'Publicada' ? 'eye-outline' : 'pencil-outline'} size={14} color={status === s ? Colors.primary : Colors.textSecondary} />
                        <Text style={[peStyles.optBtnText, status === s && peStyles.optBtnTextActive]}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.sectionLabel}>Disciplina e turmas</Text>

                  <Text style={peStyles.fieldLabel}>Disciplina *</Text>
                  <View style={peStyles.chipGrid}>
                    {DISCS.map(d => (
                      <TouchableOpacity key={d} style={[peStyles.chip, disciplina === d && peStyles.chipActive]} onPress={() => setDisciplina(d)}>
                        <Text style={[peStyles.chipText, disciplina === d && peStyles.chipTextActive]}>{d}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.fieldLabel}>Turmas * (multi-seleção)</Text>
                  <View style={peStyles.chipGrid}>
                    {TURMS.map(t => (
                      <TouchableOpacity key={t} style={[peStyles.chip, selectedTurmas.includes(t) && peStyles.chipActive]} onPress={() => toggleTurma(t)}>
                        {selectedTurmas.includes(t) && <Icon name="check" size={11} color={Colors.primary} />}
                        <Text style={[peStyles.chipText, selectedTurmas.includes(t) && peStyles.chipTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={peStyles.sectionLabel}>Materiais da aula</Text>
                  <View style={contStyles.tipoGrid}>
                    {TIPO_MATERIAL.map(t => (
                      <TouchableOpacity
                        key={t.id}
                        style={contStyles.tipoBtn}
                        onPress={() => Alert.alert('Adicionar ' + t.label, 'Selecione o arquivo ou insira o link para este material.')}
                        activeOpacity={0.8}
                      >
                        <View style={[contStyles.tipoIconWrap, { backgroundColor: t.color + '18' }]}>
                          <Icon name={t.icon} size={22} color={t.color} />
                        </View>
                        <Text style={contStyles.tipoBtnText}>{t.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[peStyles.submitBtn, saving && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={saving}
                  >
                    {saving
                      ? <ActivityIndicator color={Colors.white} size="small" />
                      : <><Icon name="book-plus" size={20} color={Colors.white} /><Text style={peStyles.submitBtnText}>Salvar aula</Text></>
                    }
                  </TouchableOpacity>
                  <View style={{ height: Spacing.xl }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── MODAL: ADICIONAR MATERIAL ────────────────────────────────────────────────

type PickedFile = { uri: string; name: string; size?: number };

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function docTypesFor(tipo: string): string[] {
  switch (tipo) {
    case 'PDF':    return ['application/pdf'];
    case 'Slides': return ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.oasis.opendocument.presentation'];
    case 'Áudio':  return ['audio/*', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a'];
    default:       return ['*/*'];
  }
}

function AdicionarMaterialModal({
  visible, onClose, onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { titulo: string; tipo: string; url: string; disciplina: string; turma: string; tamanho?: string }) => Promise<void>;
}) {
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [turma, setTurma] = useState('');
  const [link, setLink] = useState('');
  const [pickedFile, setPickedFile] = useState<PickedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const DISCS = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Inglês'];
  const TURMS = ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB', '3ºC'];

  const isUrlType = tipo === 'Link' || tipo === 'Vídeo';
  const isFileType = tipo !== '' && !isUrlType;
  const selectedTipo = TIPO_MATERIAL.find(t => t.id === tipo);

  const handleClose = () => {
    setTipo(''); setTitulo(''); setDisciplina(''); setTurma('');
    setLink(''); setPickedFile(null); setUploadProgress(0);
    setUploading(false); setSubmitted(false); setSaving(false);
    onClose();
  };

  const handlePickFile = async () => {
    if (tipo === 'Imagem') {
      launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, resp => {
        if (!resp.didCancel && resp.assets?.[0]) {
          const a = resp.assets[0];
          setPickedFile({ uri: a.uri!, name: a.fileName ?? 'imagem.jpg', size: a.fileSize });
        }
      });
    } else {
      try {
        const result = await DocumentPicker.pick({
          type: docTypesFor(tipo),
          copyTo: 'cachesDirectory',
        });
        const f = result[0];
        setPickedFile({
          uri: f.fileCopyUri ?? f.uri,
          name: f.name ?? 'arquivo',
          size: f.size ?? undefined,
        });
      } catch (e: any) {
        if (!DocumentPicker.isCancel(e)) {
          Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!tipo || !titulo.trim() || !disciplina) {
      Alert.alert('Atenção', 'Preencha tipo, título e disciplina.');
      return;
    }
    if (isFileType && !pickedFile) {
      Alert.alert('Atenção', 'Selecione um arquivo antes de enviar.');
      return;
    }
    if (isUrlType && !link.trim()) {
      Alert.alert('Atenção', tipo === 'Vídeo' ? 'Cole o link do YouTube.' : 'Cole a URL do link.');
      return;
    }

    setSaving(true);
    try {
      let downloadUrl = link;
      if (isFileType && pickedFile) {
        setUploading(true);
        downloadUrl = await uploadMaterial({
          localUri: pickedFile.uri,
          tipo: tipo as any,
          filename: `${Date.now()}_${pickedFile.name.replace(/\s+/g, '_')}`,
          onProgress: pct => setUploadProgress(pct),
        });
        setUploading(false);
      }
      await onSave({
        titulo, tipo,
        url: downloadUrl,
        disciplina, turma,
        tamanho: pickedFile ? formatFileSize(pickedFile.size) : '—',
      });
      setSubmitted(true);
    } catch (err: any) {
      setUploading(false);
      Alert.alert('Erro no envio', err?.message ?? 'Falha ao enviar. Verifique sua conexão.');
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={peStyles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={peStyles.sheet}>
              <View style={peStyles.handle} />
              {submitted ? (
                <View style={peStyles.successContent}>
                  <View style={[peStyles.successIcon, { backgroundColor: (selectedTipo?.color ?? Colors.primary) + '18' }]}>
                    <Icon name={selectedTipo?.icon ?? 'file'} size={52} color={selectedTipo?.color ?? Colors.primary} />
                  </View>
                  <Text style={peStyles.successTitle}>Material adicionado!</Text>
                  <Text style={peStyles.successSub}>
                    "{titulo}" ({tipo}) adicionado à {disciplina}{turma ? ` — turma ${turma}` : ''}.
                    {'\n'}Os alunos poderão acessar pelo Hub de Conteúdo.
                  </Text>
                  <TouchableOpacity style={peStyles.doneBtn} onPress={handleClose}>
                    <Text style={peStyles.doneBtnText}>Concluir</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  <View style={peStyles.modalHeader}>
                    <View>
                      <Text style={peStyles.modalTitle}>Adicionar Material</Text>
                      <Text style={peStyles.modalSub}>PDF, podcast, imagem, slides, vídeo ou link</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Icon name="close" size={22} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <Text style={peStyles.fieldLabel}>Tipo de material *</Text>
                  <View style={contStyles.tipoGrid}>
                    {TIPO_MATERIAL.map(t => (
                      <TouchableOpacity
                        key={t.id}
                        style={[contStyles.tipoBtn, tipo === t.id && { borderWidth: 2, borderColor: t.color, borderRadius: Radius.md }]}
                        onPress={() => { setTipo(t.id); setPickedFile(null); setLink(''); }}
                        activeOpacity={0.8}
                      >
                        <View style={[contStyles.tipoIconWrap, { backgroundColor: t.color + '18' }]}>
                          <Icon name={t.icon} size={22} color={t.color} />
                        </View>
                        <Text style={[contStyles.tipoBtnText, tipo === t.id && { color: t.color, fontWeight: '700' }]}>{t.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {tipo !== '' && (
                    <>
                      <Text style={peStyles.sectionLabel}>Detalhes</Text>

                      <Text style={peStyles.fieldLabel}>Título *</Text>
                      <TextInput style={peStyles.textInput} placeholder="Nome do material" placeholderTextColor={Colors.textDisabled} value={titulo} onChangeText={setTitulo} />

                      <Text style={peStyles.fieldLabel}>Disciplina *</Text>
                      <View style={peStyles.chipGrid}>
                        {DISCS.map(d => (
                          <TouchableOpacity key={d} style={[peStyles.chip, disciplina === d && peStyles.chipActive]} onPress={() => setDisciplina(d)}>
                            <Text style={[peStyles.chipText, disciplina === d && peStyles.chipTextActive]}>{d}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <Text style={peStyles.fieldLabel}>Turma</Text>
                      <View style={peStyles.chipGrid}>
                        {TURMS.map(t => (
                          <TouchableOpacity key={t} style={[peStyles.chip, turma === t && peStyles.chipActive]} onPress={() => setTurma(turma === t ? '' : t)}>
                            <Text style={[peStyles.chipText, turma === t && peStyles.chipTextActive]}>{t}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <Text style={peStyles.sectionLabel}>
                        {isUrlType ? (tipo === 'Vídeo' ? 'Link do YouTube' : 'URL') : 'Arquivo'}
                      </Text>

                      {/* ─ URL / Vídeo ─ */}
                      {isUrlType && (
                        <>
                          {tipo === 'Vídeo' && (
                            <View style={contStyles.videoDica}>
                              <Icon name="youtube" size={16} color='#FF0000' />
                              <Text style={contStyles.videoDicaText}>Use vídeos do YouTube (pode ser não-listado) para economizar armazenamento.</Text>
                            </View>
                          )}
                          <Text style={peStyles.fieldLabel}>
                            {tipo === 'Vídeo' ? 'Link do YouTube *' : 'URL *'}
                          </Text>
                          <TextInput
                            style={peStyles.textInput}
                            placeholder={tipo === 'Vídeo' ? 'https://youtube.com/watch?v=...' : 'https://...'}
                            placeholderTextColor={Colors.textDisabled}
                            value={link}
                            onChangeText={setLink}
                            autoCapitalize="none"
                            keyboardType="url"
                          />
                        </>
                      )}

                      {/* ─ File picker ─ */}
                      {isFileType && (
                        <>
                          <TouchableOpacity
                            style={[contStyles.uploadBtn, pickedFile != null && contStyles.uploadBtnDone]}
                            onPress={handlePickFile}
                            activeOpacity={0.85}
                            disabled={uploading}
                          >
                            <Icon
                              name={pickedFile ? 'check-circle' : 'upload'}
                              size={22}
                              color={pickedFile ? Colors.success : Colors.primary}
                            />
                            <View style={{ flex: 1 }}>
                              <Text
                                style={[contStyles.uploadBtnText, pickedFile && { color: Colors.success }]}
                                numberOfLines={1}
                              >
                                {pickedFile ? pickedFile.name : `Selecionar ${tipo === 'Imagem' ? 'imagem' : 'arquivo'}`}
                              </Text>
                              <Text style={contStyles.uploadBtnSub}>
                                {pickedFile
                                  ? formatFileSize(pickedFile.size)
                                  : `Máx. ${maxSizeMB(tipo as any)} MB · ${tipo === 'PDF' ? 'PDF' : tipo === 'Áudio' ? 'MP3, M4A' : tipo === 'Imagem' ? 'JPG, PNG' : 'PPT, PDF'}`
                                }
                              </Text>
                            </View>
                            {pickedFile && (
                              <Icon name="pencil-outline" size={16} color={Colors.textSecondary} />
                            )}
                          </TouchableOpacity>

                          {uploading && (
                            <View style={contStyles.progressWrap}>
                              <View style={contStyles.progressBg}>
                                <View style={[contStyles.progressFill, { width: `${uploadProgress}%` as any }]} />
                              </View>
                              <Text style={contStyles.progressText}>Enviando... {uploadProgress}%</Text>
                            </View>
                          )}
                        </>
                      )}
                    </>
                  )}

                  <TouchableOpacity
                    style={[peStyles.submitBtn, (!tipo || saving) && { opacity: 0.5 }]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={!tipo || saving}
                  >
                    {saving
                      ? <ActivityIndicator color={Colors.white} size="small" />
                      : <><Icon name="cloud-upload-outline" size={20} color={Colors.white} /><Text style={peStyles.submitBtnText}>Adicionar material</Text></>
                    }
                  </TouchableOpacity>
                  <View style={{ height: Spacing.xl }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── GESTÃO DE AULAS E CONTEÚDO ───────────────────────────────────────────────

function tipoInfo(tipo: string) {
  return TIPO_MATERIAL.find(t => t.id === tipo) ?? { icon: 'file-outline', color: Colors.textSecondary };
}

function ContentManagement() {
  const [contentTab, setContentTab] = useState<ContentSubTab>('aulas');
  const [aulaModalVisible, setAulaModalVisible] = useState(false);
  const [materialModalVisible, setMaterialModalVisible] = useState(false);

  const [searchAula, setSearchAula] = useState('');
  const [filterDisc, setFilterDisc] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [searchMat, setSearchMat] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [filterMatDisc, setFilterMatDisc] = useState('');

  const { data: aulasData, loading: aulasLoading } = useAulas();
  const { data: materiaisData, loading: materiaisLoading } = useMateriais();

  const DISCS = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História'];

  const filteredAulas = aulasData.filter(a =>
    a.titulo.toLowerCase().includes(searchAula.toLowerCase()) &&
    (!filterDisc   || a.disciplina === filterDisc) &&
    (!filterStatus || a.status     === filterStatus)
  );

  const filteredMateriais = materiaisData.filter(m =>
    m.titulo.toLowerCase().includes(searchMat.toLowerCase()) &&
    (!filterTipo    || m.tipo       === filterTipo) &&
    (!filterMatDisc || m.disciplina === filterMatDisc)
  );

  const DISC_COLORS: Record<string, string> = {
    'Matemática': Colors.primary, 'Português': '#E91E63', 'Física': '#7B1FA2',
    'Química': Colors.warning, 'Biologia': Colors.success, 'História': '#FF6B35',
    'Geografia': Colors.info, 'Inglês': '#00BCD4',
  };

  return (
    <View style={styles.tabContent}>
      <CadastrarAulaModal
        visible={aulaModalVisible}
        onClose={() => setAulaModalVisible(false)}
        onSave={async data => { await addAula(data); }}
      />
      <AdicionarMaterialModal
        visible={materialModalVisible}
        onClose={() => setMaterialModalVisible(false)}
        onSave={async data => { await addMaterial({ ...data, tipo: data.tipo as any }); }}
      />

      <View style={[styles.sectionBanner, { borderLeftColor: Colors.info }]}>
        <Icon name="book-education-outline" size={28} color={Colors.info} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Gestão de Aulas e Conteúdo</Text>
          <Text style={styles.sectionBannerSub}>Planos de aula, PDFs, vídeos, podcasts e mais</Text>
        </View>
      </View>

      {/* SUB-TABS */}
      <View style={contStyles.tabRow}>
        {(['aulas', 'materiais'] as ContentSubTab[]).map(t => (
          <TouchableOpacity
            key={t}
            style={[contStyles.tabBtn, contentTab === t && contStyles.tabBtnActive]}
            onPress={() => setContentTab(t)}
          >
            <Icon
              name={t === 'aulas' ? 'book-open-variant' : 'folder-multiple-outline'}
              size={15}
              color={contentTab === t ? Colors.primary : Colors.textSecondary}
            />
            <Text style={[contStyles.tabBtnText, contentTab === t && contStyles.tabBtnTextActive]}>
              {t === 'aulas' ? `Aulas (${aulasData.length})` : `Materiais (${materiaisData.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ─ AULAS ─ */}
      {contentTab === 'aulas' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => setAulaModalVisible(true)} activeOpacity={0.85}>
            <Icon name="book-plus-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Cadastrar nova aula</Text>
          </TouchableOpacity>

          <View style={peStyles.searchBox}>
            <Icon name="magnify" size={18} color={Colors.textSecondary} />
            <TextInput style={peStyles.searchInput} placeholder="Buscar aula por título..." placeholderTextColor={Colors.textDisabled} value={searchAula} onChangeText={setSearchAula} />
            {searchAula.length > 0 && <TouchableOpacity onPress={() => setSearchAula('')}><Icon name="close-circle" size={16} color={Colors.textDisabled} /></TouchableOpacity>}
          </View>

          <Text style={styles.overlineLabel}>Disciplina</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterDisc && peStyles.filterChipActive]} onPress={() => setFilterDisc('')}>
              <Text style={[peStyles.filterChipText, !filterDisc && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {DISCS.map(d => (
              <TouchableOpacity key={d} style={[peStyles.filterChip, filterDisc === d && peStyles.filterChipActive]} onPress={() => setFilterDisc(filterDisc === d ? '' : d)}>
                <Text style={[peStyles.filterChipText, filterDisc === d && peStyles.filterChipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.overlineLabel}>Status</Text>
          <View style={{ flexDirection: 'row', gap: Spacing.xs }}>
            {[
              { val: '', label: 'Todos' },
              { val: 'publicada', label: 'Publicada' },
              { val: 'rascunho', label: 'Rascunho' },
            ].map(s => (
              <TouchableOpacity key={s.val} style={[peStyles.filterChip, filterStatus === s.val && peStyles.filterChipActive]} onPress={() => setFilterStatus(s.val)}>
                <Text style={[peStyles.filterChipText, filterStatus === s.val && peStyles.filterChipTextActive]}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={peStyles.resultRow}>
            <Text style={peStyles.resultText}>{filteredAulas.length} aula(s)</Text>
          </View>

          {aulasLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.md }} />}

          {filteredAulas.map((a, i) => {
            const dColor = DISC_COLORS[a.disciplina] ?? Colors.primary;
            const isPublished = a.status === 'publicada';
            return (
              <TouchableOpacity
                key={a.id ?? i}
                style={contStyles.aulaCard}
                onPress={() => Alert.alert(a.titulo, `Disciplina: ${a.disciplina}\nTurmas: ${a.turmas.join(', ')}\nData: ${a.data}\nStatus: ${isPublished ? 'Publicada' : 'Rascunho'}`)}
                activeOpacity={0.85}
              >
                <View style={[contStyles.aulaAccent, { backgroundColor: dColor }]} />
                <View style={{ flex: 1, gap: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={[contStyles.discPill, { backgroundColor: dColor + '18' }]}>
                      <Text style={[contStyles.discPillText, { color: dColor }]}>{a.disciplina}</Text>
                    </View>
                    <View style={[contStyles.statusPill, { backgroundColor: (isPublished ? Colors.success : Colors.warning) + '18' }]}>
                      <View style={[contStyles.statusDot, { backgroundColor: isPublished ? Colors.success : Colors.warning }]} />
                      <Text style={[contStyles.statusPillText, { color: isPublished ? Colors.success : Colors.warning }]}>{isPublished ? 'Publicada' : 'Rascunho'}</Text>
                    </View>
                  </View>
                  <Text style={contStyles.aulaTitle}>{a.titulo}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Icon name="account-group-outline" size={13} color={Colors.textDisabled} />
                      <Text style={contStyles.aulaMeta}>{a.turmas.join(', ')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Icon name="calendar-outline" size={13} color={Colors.textDisabled} />
                      <Text style={contStyles.aulaMeta}>{a.data}</Text>
                    </View>
                  </View>
                </View>
                <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
              </TouchableOpacity>
            );
          })}

          {!aulasLoading && filteredAulas.length === 0 && (
            <View style={peStyles.emptyState}>
              <Icon name="book-search" size={40} color={Colors.textDisabled} />
              <Text style={peStyles.emptyText}>Nenhuma aula encontrada</Text>
            </View>
          )}
        </View>
      )}

      {/* ─ MATERIAIS ─ */}
      {contentTab === 'materiais' && (
        <View style={{ gap: Spacing.sm }}>
          <TouchableOpacity style={finStyles.actionRow} onPress={() => setMaterialModalVisible(true)} activeOpacity={0.85}>
            <Icon name="cloud-upload-outline" size={20} color={Colors.white} />
            <Text style={finStyles.actionRowText}>Adicionar material</Text>
          </TouchableOpacity>

          {/* Tipo grid rápido */}
          <View style={contStyles.tipoFilterGrid}>
            {[{ id: '', label: 'Todos', icon: 'apps', color: Colors.textSecondary }, ...TIPO_MATERIAL].map(t => (
              <TouchableOpacity
                key={t.id}
                style={[contStyles.tipoFilterBtn, filterTipo === t.id && { borderColor: t.color, backgroundColor: t.color + '12' }]}
                onPress={() => setFilterTipo(t.id)}
              >
                <Icon name={t.icon} size={18} color={filterTipo === t.id ? t.color : Colors.textSecondary} />
                <Text style={[contStyles.tipoFilterText, filterTipo === t.id && { color: t.color, fontWeight: '700' }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={peStyles.searchBox}>
            <Icon name="magnify" size={18} color={Colors.textSecondary} />
            <TextInput style={peStyles.searchInput} placeholder="Buscar material por título..." placeholderTextColor={Colors.textDisabled} value={searchMat} onChangeText={setSearchMat} />
            {searchMat.length > 0 && <TouchableOpacity onPress={() => setSearchMat('')}><Icon name="close-circle" size={16} color={Colors.textDisabled} /></TouchableOpacity>}
          </View>

          <Text style={styles.overlineLabel}>Disciplina</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.xs }}>
            <TouchableOpacity style={[peStyles.filterChip, !filterMatDisc && peStyles.filterChipActive]} onPress={() => setFilterMatDisc('')}>
              <Text style={[peStyles.filterChipText, !filterMatDisc && peStyles.filterChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {DISCS.map(d => (
              <TouchableOpacity key={d} style={[peStyles.filterChip, filterMatDisc === d && peStyles.filterChipActive]} onPress={() => setFilterMatDisc(filterMatDisc === d ? '' : d)}>
                <Text style={[peStyles.filterChipText, filterMatDisc === d && peStyles.filterChipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={peStyles.resultRow}>
            <Text style={peStyles.resultText}>{filteredMateriais.length} material(is)</Text>
            {(filterTipo || filterMatDisc || searchMat) && (
              <TouchableOpacity onPress={() => { setFilterTipo(''); setFilterMatDisc(''); setSearchMat(''); }}>
                <Text style={peStyles.clearFilters}>Limpar filtros</Text>
              </TouchableOpacity>
            )}
          </View>

          {materiaisLoading && <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.md }} />}

          {filteredMateriais.map((m, i) => {
            const info = tipoInfo(m.tipo);
            return (
              <TouchableOpacity
                key={m.id ?? i}
                style={peStyles.personCard}
                onPress={() => Alert.alert(m.titulo, `Tipo: ${m.tipo}\nDisciplina: ${m.disciplina}\nTurma: ${m.turma ?? '—'}\nTamanho: ${m.tamanho ?? '—'}`)}
                activeOpacity={0.85}
              >
                <View style={[contStyles.matIconWrap, { backgroundColor: info.color + '18' }]}>
                  <Icon name={info.icon} size={26} color={info.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={peStyles.personName} numberOfLines={2}>{m.titulo}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <View style={[contStyles.tipoPill, { backgroundColor: info.color + '18' }]}>
                      <Text style={[contStyles.tipoPillText, { color: info.color }]}>{m.tipo}</Text>
                    </View>
                    <Text style={peStyles.personMeta}>{m.disciplina}{m.turma ? ` · ${m.turma}` : ''}</Text>
                  </View>
                  <Text style={peStyles.personMeta2}>{m.tamanho ?? '—'}</Text>
                </View>
                <View style={{ gap: 6 }}>
                  <TouchableOpacity style={contStyles.dlBtn} onPress={() => Alert.alert('Download', 'Iniciando download de ' + m.titulo)}>
                    <Icon name="download-outline" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                  <Icon name="chevron-right" size={16} color={Colors.textDisabled} />
                </View>
              </TouchableOpacity>
            );
          })}

          {!materiaisLoading && filteredMateriais.length === 0 && (
            <View style={peStyles.emptyState}>
              <Icon name="folder-open-outline" size={40} color={Colors.textDisabled} />
              <Text style={peStyles.emptyText}>Nenhum material encontrado</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ─── MEETING SCHEDULER MODAL ─────────────────────────────────────────────────

const DATE_OPTIONS = ['Hoje', 'Amanhã', 'Próx. terça', 'Próx. quinta'];
const TIME_OPTIONS = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const PARTICIPANT_OPTIONS = ['Pais do 1ºA', 'Pais do 2ºB', 'Pais do 3ºC', 'Todos os pais', 'Professores', 'Toda a equipe'];
const MEETING_TYPES = [
  { id: 'video', icon: 'video-outline', label: 'Videochamada' },
  { id: 'presencial', icon: 'map-marker-outline', label: 'Presencial' },
  { id: 'hibrida', icon: 'laptop', label: 'Híbrida' },
];

function MeetingSchedulerModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(4);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [meetingType, setMeetingType] = useState('video');
  const [submitted, setSubmitted] = useState(false);

  const toggleParticipant = (i: number) => {
    setSelectedParticipants(prev =>
      prev.includes(i) ? prev.filter(p => p !== i) : [...prev, i]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Informe o título da reunião.');
      return;
    }
    if (selectedParticipants.length === 0) {
      Alert.alert('Atenção', 'Selecione ao menos um grupo de participantes.');
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setTitle('');
    setSelectedDate(0);
    setSelectedTime(4);
    setSelectedParticipants([]);
    setMeetingType('video');
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={schedulerStyles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={schedulerStyles.sheet}>
              {/* Handle */}
              <View style={schedulerStyles.handle} />

              {submitted ? (
                <View style={schedulerStyles.successContent}>
                  <View style={schedulerStyles.successIcon}>
                    <Icon name="check-circle" size={52} color={Colors.success} />
                  </View>
                  <Text style={schedulerStyles.successTitle}>Reunião agendada!</Text>
                  <Text style={schedulerStyles.successSub}>
                    "{title}" foi agendada para {DATE_OPTIONS[selectedDate]} às {TIME_OPTIONS[selectedTime]}.
                    {'\n'}Os participantes selecionados receberão uma notificação.
                  </Text>
                  <TouchableOpacity style={schedulerStyles.doneBtn} onPress={handleClose}>
                    <Text style={schedulerStyles.doneBtnText}>Concluir</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  {/* Header */}
                  <View style={schedulerStyles.header}>
                    <Text style={schedulerStyles.headerTitle}>Agendar Reunião Virtual</Text>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Icon name="close" size={22} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  {/* Título */}
                  <Text style={schedulerStyles.fieldLabel}>Título da reunião *</Text>
                  <TextInput
                    style={schedulerStyles.textInput}
                    placeholder="Ex: Reunião de pais — 1º bimestre"
                    placeholderTextColor={Colors.textDisabled}
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="done"
                  />

                  {/* Tipo */}
                  <Text style={schedulerStyles.fieldLabel}>Tipo de reunião</Text>
                  <View style={schedulerStyles.typeRow}>
                    {MEETING_TYPES.map(t => (
                      <TouchableOpacity
                        key={t.id}
                        style={[schedulerStyles.typeBtn, meetingType === t.id && schedulerStyles.typeBtnActive]}
                        onPress={() => setMeetingType(t.id)}
                      >
                        <Icon name={t.icon} size={18} color={meetingType === t.id ? Colors.primary : Colors.textSecondary} />
                        <Text style={[schedulerStyles.typeBtnLabel, meetingType === t.id && schedulerStyles.typeBtnLabelActive]}>
                          {t.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Data */}
                  <Text style={schedulerStyles.fieldLabel}>Data</Text>
                  <View style={schedulerStyles.chipRow}>
                    {DATE_OPTIONS.map((d, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[schedulerStyles.chip, selectedDate === i && schedulerStyles.chipActive]}
                        onPress={() => setSelectedDate(i)}
                      >
                        <Text style={[schedulerStyles.chipText, selectedDate === i && schedulerStyles.chipTextActive]}>{d}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Horário */}
                  <Text style={schedulerStyles.fieldLabel}>Horário</Text>
                  <View style={schedulerStyles.chipRow}>
                    {TIME_OPTIONS.map((t, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[schedulerStyles.chip, selectedTime === i && schedulerStyles.chipActive]}
                        onPress={() => setSelectedTime(i)}
                      >
                        <Text style={[schedulerStyles.chipText, selectedTime === i && schedulerStyles.chipTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Participantes */}
                  <Text style={schedulerStyles.fieldLabel}>Participantes *</Text>
                  <View style={schedulerStyles.chipRow}>
                    {PARTICIPANT_OPTIONS.map((p, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[schedulerStyles.chip, selectedParticipants.includes(i) && schedulerStyles.chipActive]}
                        onPress={() => toggleParticipant(i)}
                      >
                        {selectedParticipants.includes(i) && (
                          <Icon name="check" size={12} color={Colors.primary} />
                        )}
                        <Text style={[schedulerStyles.chipText, selectedParticipants.includes(i) && schedulerStyles.chipTextActive]}>{p}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Summary */}
                  {title.trim() !== '' && selectedParticipants.length > 0 && (
                    <View style={schedulerStyles.summaryCard}>
                      <Icon name="information-outline" size={16} color={Colors.primary} />
                      <Text style={schedulerStyles.summaryText}>
                        Reunião "{title}" em {DATE_OPTIONS[selectedDate]} às {TIME_OPTIONS[selectedTime]} para {selectedParticipants.length} grupo(s) selecionado(s).
                      </Text>
                    </View>
                  )}

                  {/* Submit */}
                  <TouchableOpacity style={schedulerStyles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
                    <Icon name="calendar-check" size={20} color={Colors.white} />
                    <Text style={schedulerStyles.submitBtnText}>Agendar e notificar participantes</Text>
                  </TouchableOpacity>

                  <View style={{ height: Spacing.xl }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── HUB DE COMUNICAÇÃO ──────────────────────────────────────────────────────

function CommunicationHub() {
  const [schedulerVisible, setSchedulerVisible] = useState(false);

  const announcements = [
    { icon: 'bullhorn', color: Colors.primary, title: 'Reunião de Pais — 3ºA', time: 'Amanhã, 19h', recipients: '30 responsáveis' },
    { icon: 'calendar-star', color: Colors.warning, title: 'Semana Cultural — 20 a 24/06', time: 'Em 3 dias', recipients: 'Toda a escola' },
    { icon: 'file-alert', color: Colors.error, title: 'Entrega de notas do 2º bimestre', time: 'Hoje, enviado', recipients: 'Todos os responsáveis' },
  ];

  const handleAction = (label: string) => {
    if (label === 'Agendar reunião') {
      setSchedulerVisible(true);
    } else {
      Alert.alert(label, 'Funcionalidade disponível na versão completa.');
    }
  };

  return (
    <View style={styles.tabContent}>
      <MeetingSchedulerModal visible={schedulerVisible} onClose={() => setSchedulerVisible(false)} />

      <View style={styles.sectionBanner}>
        <Icon name="hub-outline" size={28} color={Colors.warning} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionBannerTitle}>Hub de Comunicação</Text>
          <Text style={styles.sectionBannerSub}>Mensagens, avisos e agendamentos</Text>
        </View>
      </View>

      <View style={styles.commActionsRow}>
        {[
          { icon: 'message-plus-outline', color: Colors.primary, label: 'Nova mensagem' },
          { icon: 'bullhorn-outline', color: Colors.warning, label: 'Novo aviso' },
          { icon: 'video-plus-outline', color: Colors.info, label: 'Agendar reunião' },
          { icon: 'calendar-plus', color: Colors.success, label: 'Evento agenda' },
        ].map((a, i) => (
          <TouchableOpacity key={i} style={styles.commAction} onPress={() => handleAction(a.label)}>
            <View style={[styles.commActionIcon, { backgroundColor: a.color + '18' }]}>
              <Icon name={a.icon} size={22} color={a.color} />
            </View>
            <Text style={styles.commActionLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.overlineLabel}>Comunicados enviados</Text>
      {announcements.map((a, i) => (
        <TouchableOpacity key={i} style={styles.announcementCard} onPress={() => Alert.alert(a.title, `Enviado para: ${a.recipients}`)}>
          <View style={[styles.announcementIcon, { backgroundColor: a.color + '18' }]}>
            <Icon name={a.icon} size={20} color={a.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.announcementTitle}>{a.title}</Text>
            <Text style={styles.announcementMeta}>{a.time} · {a.recipients}</Text>
          </View>
          <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
        </TouchableOpacity>
      ))}

      <Text style={[styles.overlineLabel, { marginTop: Spacing.md }]}>Agenda digital — próximos eventos</Text>
      {[
        { date: '20 Mai', title: 'Conselho de Classe — 2º Bimestre', color: Colors.primary },
        { date: '24 Mai', title: 'Reunião Pedagógica', color: Colors.info },
        { date: '01 Jun', title: 'Início 3º Bimestre', color: Colors.success },
      ].map((e, i) => (
        <View key={i} style={styles.eventRow}>
          <View style={[styles.eventDate, { borderColor: e.color }]}>
            <Text style={[styles.eventDateText, { color: e.color }]}>{e.date}</Text>
          </View>
          <Text style={styles.eventTitle}>{e.title}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────

const TABS: { id: PortalTab; icon: string; label: string }[] = [
  { id: 'professor',  icon: 'briefcase-account-outline',  label: 'Professor' },
  { id: 'dashboard',  icon: 'view-dashboard-outline',     label: 'Dashboard' },
  { id: 'financeiro', icon: 'cash-multiple',              label: 'Financeiro' },
  { id: 'academico',  icon: 'school-outline',             label: 'Acadêmico' },
  { id: 'pessoas',    icon: 'account-multiple-outline',   label: 'Pessoas' },
  { id: 'aulas',      icon: 'book-education-outline',     label: 'Aulas' },
  { id: 'comunicacao',icon: 'hub-outline',                label: 'Comunicação' },
];

// ─── ONBOARDING DO PROFESSOR ─────────────────────────────────────────────────

const ONBOARDING_STEPS = [
  {
    icon: 'account-tie', color: Colors.primary,
    title: 'Bem-vindo, Professor!',
    desc: 'Configure seu perfil docente para acessar todas as ferramentas de planejamento, avaliação e comunicação.',
  },
  {
    icon: 'school-outline', color: Colors.info,
    title: 'Suas turmas',
    desc: 'Informe as turmas e disciplinas que você leciona. O sistema organizará seu painel automaticamente.',
  },
  {
    icon: 'robot-excited-outline', color: '#7B1FA2',
    title: 'IA no seu lado',
    desc: 'Criador de planos de aula, gerador de avaliações e correção automática — tudo assistido por inteligência artificial.',
  },
  {
    icon: 'check-decagram', color: Colors.success,
    title: 'Tudo pronto!',
    desc: 'Seu ambiente está configurado. Acesse o Kit do Professor para começar a criar e organizar suas aulas.',
  },
];

function TeacherOnboardingModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const SUBJECTS = ['Matemática', 'Física', 'Química', 'Biologia', 'Português', 'História', 'Geografia', 'Inglês'];
  const CLASSES = ['1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const current = ONBOARDING_STEPS[step];

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const handleClose = () => { setStep(0); setSelectedSubjects([]); setSelectedClasses([]); onClose(); };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={onbStyles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={onbStyles.sheet}>
              <View style={onbStyles.handle} />

              {/* PROGRESS DOTS */}
              <View style={onbStyles.dotsRow}>
                {ONBOARDING_STEPS.map((_, i) => (
                  <View key={i} style={[onbStyles.dot, i === step && { backgroundColor: current.color, width: 20 }]} />
                ))}
              </View>

              {/* ICON */}
              <View style={[onbStyles.iconWrap, { backgroundColor: current.color + '18' }]}>
                <Icon name={current.icon} size={44} color={current.color} />
              </View>

              <Text style={onbStyles.stepTitle}>{current.title}</Text>
              <Text style={onbStyles.stepDesc}>{current.desc}</Text>

              {/* STEP 1: DISCIPLINAS */}
              {step === 1 && (
                <View style={onbStyles.selectWrap}>
                  <Text style={onbStyles.selectLabel}>Disciplinas que você leciona:</Text>
                  <View style={onbStyles.chipGrid}>
                    {SUBJECTS.map(sub => (
                      <TouchableOpacity
                        key={sub}
                        style={[onbStyles.chip, selectedSubjects.includes(sub) && onbStyles.chipActive]}
                        onPress={() => toggleItem(selectedSubjects, setSelectedSubjects, sub)}
                      >
                        {selectedSubjects.includes(sub) && <Icon name="check" size={12} color={Colors.primary} />}
                        <Text style={[onbStyles.chipText, selectedSubjects.includes(sub) && onbStyles.chipTextActive]}>{sub}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={[onbStyles.selectLabel, { marginTop: Spacing.md }]}>Turmas:</Text>
                  <View style={onbStyles.chipGrid}>
                    {CLASSES.map(cls => (
                      <TouchableOpacity
                        key={cls}
                        style={[onbStyles.chip, selectedClasses.includes(cls) && onbStyles.chipActive]}
                        onPress={() => toggleItem(selectedClasses, setSelectedClasses, cls)}
                      >
                        {selectedClasses.includes(cls) && <Icon name="check" size={12} color={Colors.primary} />}
                        <Text style={[onbStyles.chipText, selectedClasses.includes(cls) && onbStyles.chipTextActive]}>{cls}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* BUTTONS */}
              <View style={onbStyles.btnRow}>
                {step > 0 && !isLast && (
                  <TouchableOpacity style={onbStyles.backBtn} onPress={() => setStep(s => s - 1)}>
                    <Text style={onbStyles.backBtnText}>Voltar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[onbStyles.nextBtn, { backgroundColor: current.color }, isLast && { flex: 1 }]}
                  onPress={() => isLast ? handleClose() : setStep(s => s + 1)}
                >
                  <Text style={onbStyles.nextBtnText}>{isLast ? 'Começar a usar' : 'Próximo'}</Text>
                  <Icon name={isLast ? 'check' : 'arrow-right'} size={18} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default function SchoolPortalScreen() {
  const [activeTab, setActiveTab] = useState<PortalTab>('professor');
  const [onboardingVisible, setOnboardingVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <TeacherOnboardingModal visible={onboardingVisible} onClose={() => setOnboardingVisible(false)} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.schoolInfo}>
          <View style={styles.schoolLogoWrap}>
            <Icon name="domain" size={26} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.schoolName}>Colégio Integrado CUCA</Text>
            <Text style={styles.schoolSub}>Portal da Escola · Gestão integrada</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
          <TouchableOpacity style={styles.onboardBtn} onPress={() => setOnboardingVisible(true)}>
            <Icon name="account-plus-outline" size={16} color={Colors.primary} />
            <Text style={styles.onboardBtnText}>Cadastrar prof.</Text>
          </TouchableOpacity>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>1.247</Text>
              <Text style={styles.headerStatLabel}>alunos</Text>
            </View>
            <View style={styles.headerStatDivider} />
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>48</Text>
              <Text style={styles.headerStatLabel}>professores</Text>
            </View>
          </View>
        </View>
      </View>

      {/* TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabScrollContent}
      >
        {TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, activeTab === t.id && styles.tabActive]}
            onPress={() => setActiveTab(t.id)}
          >
            <Icon name={t.icon} size={16} color={activeTab === t.id ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.tabLabel, activeTab === t.id && styles.tabLabelActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {activeTab === 'professor'  && <TeacherKit />}
        {activeTab === 'dashboard'  && <SchoolDashboard />}
        {activeTab === 'financeiro' && <FinancialManagement />}
        {activeTab === 'academico'  && <AcademicManagement />}
        {activeTab === 'pessoas'    && <PeopleManagement />}
        {activeTab === 'aulas'      && <ContentManagement />}
        {activeTab === 'comunicacao'&& <CommunicationHub />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  schoolInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  schoolLogoWrap: {
    width: 44, height: 44, borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  schoolName: { ...Typography.label, color: Colors.textPrimary },
  schoolSub: { ...Typography.caption, color: Colors.textSecondary },
  onboardBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primaryLight, borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.primary + '40',
  },
  onboardBtnText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
  headerStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerStat: { alignItems: 'center' },
  headerStatValue: { ...Typography.h4, color: Colors.primary },
  headerStatLabel: { ...Typography.caption, color: Colors.textSecondary },
  headerStatDivider: { width: 1, height: 28, backgroundColor: Colors.divider },

  tabScroll: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  tabScrollContent: { paddingHorizontal: Spacing.md, gap: Spacing.xs },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },

  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl },
  tabContent: { gap: Spacing.sm },

  sectionBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.xs,
  },
  sectionBannerTitle: { ...Typography.h4, color: Colors.textPrimary },
  sectionBannerSub: { ...Typography.caption, color: Colors.textSecondary },

  overlineLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  toolCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.sm,
  },
  toolIcon: {
    width: 52, height: 52, borderRadius: Radius.md,
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  toolBody: { flex: 1 },
  toolTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, flexWrap: 'wrap' },
  toolTitle: { ...Typography.label, color: Colors.textPrimary },
  toolDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2, lineHeight: 16 },
  aiBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: Radius.full,
  },
  aiBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.primary },

  activityRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, ...Shadows.sm,
  },
  activityIcon: { width: 36, height: 36, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  activityText: { ...Typography.body2, color: Colors.textPrimary },
  activityTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  metricCard: {
    flex: 1, minWidth: '45%',
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: 6,
    ...Shadows.sm,
  },
  metricValue: { ...Typography.h3, color: Colors.textPrimary },
  metricLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },

  alertCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderLeftWidth: 4,
    ...Shadows.sm,
  },
  alertText: { ...Typography.body2, color: Colors.textPrimary, flex: 1 },
  alertAction: { ...Typography.caption, fontWeight: '700' },

  reportRow: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  reportTitle: { ...Typography.label, color: Colors.textPrimary },
  reportSub: { ...Typography.caption, color: Colors.textSecondary },

  commActionsRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: Spacing.sm, marginBottom: Spacing.xs,
  },
  commAction: {
    flex: 1, minWidth: '45%',
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: Spacing.xs,
    ...Shadows.sm,
  },
  commActionIcon: {
    width: 44, height: 44, borderRadius: Radius.full,
    justifyContent: 'center', alignItems: 'center',
  },
  commActionLabel: { ...Typography.caption, color: Colors.textPrimary, textAlign: 'center', fontWeight: '600' },

  announcementCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  announcementIcon: { width: 40, height: 40, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  announcementTitle: { ...Typography.label, color: Colors.textPrimary },
  announcementMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  eventRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, ...Shadows.sm,
  },
  eventDate: {
    width: 56, height: 44, borderRadius: Radius.sm,
    borderWidth: 1.5, justifyContent: 'center', alignItems: 'center',
  },
  eventDateText: { ...Typography.caption, fontWeight: '700' },
  eventTitle: { ...Typography.label, color: Colors.textPrimary, flex: 1 },

  classCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  classIconWrap: {
    width: 44, height: 44, borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  classTitle: { ...Typography.label, color: Colors.textPrimary },
  classSub: { ...Typography.caption, color: Colors.textSecondary },
  attendancePill: { alignItems: 'center' },
  attendanceText: { ...Typography.label, fontWeight: '700' },
  attendanceLabel: { ...Typography.caption, color: Colors.textDisabled },
});

const schedulerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.divider,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerTitle: { ...Typography.h4, color: Colors.textPrimary },

  fieldLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.divider,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    ...Typography.body1,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceVariant,
  },

  typeRow: { flexDirection: 'row', gap: Spacing.sm },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.divider,
    backgroundColor: Colors.surfaceVariant,
  },
  typeBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  typeBtnLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  typeBtnLabelActive: { color: Colors.primary },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.divider,
    backgroundColor: Colors.surfaceVariant,
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  chipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  summaryText: { ...Typography.caption, color: Colors.primary, flex: 1, lineHeight: 18 },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 14,
    marginTop: Spacing.lg,
  },
  submitBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },

  successContent: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.success + '18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: { ...Typography.h3, color: Colors.textPrimary },
  successSub: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  doneBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 12,
    marginTop: Spacing.sm,
  },
  doneBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

const finStyles = StyleSheet.create({
  subTab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: Spacing.md, paddingVertical: 7,
    borderRadius: Radius.full, borderWidth: 1.5,
    borderColor: Colors.divider, backgroundColor: Colors.white,
  },
  subTabActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  subTabText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  subTabTextActive: { color: Colors.primary, fontWeight: '700' },

  chartCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around',
    height: 140, ...Shadows.sm, position: 'relative',
  },
  chartCol: { alignItems: 'center', gap: 4, flex: 1 },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 100 },
  chartBar: { width: 10, borderRadius: 4 },
  chartLabel: { ...Typography.caption, color: Colors.textSecondary, fontSize: 10 },
  chartLegend: { position: 'absolute', top: Spacing.sm, right: Spacing.sm, gap: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { ...Typography.caption, color: Colors.textSecondary, fontSize: 10 },

  distRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  distHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  distLabel: { ...Typography.body2, color: Colors.textPrimary },
  distValue: { ...Typography.label, fontWeight: '700' },
  distBarBg: { height: 6, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  distBarFill: { height: 6, borderRadius: Radius.full },
  distBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.md, alignItems: 'center' },
  distBadgeText: { ...Typography.caption, fontWeight: '700' },

  inadSummary: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', ...Shadows.sm,
  },
  inadStat: { alignItems: 'center', gap: 3 },
  inadStatValue: { ...Typography.label, fontWeight: '800' },
  inadStatLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },
  inadStatDivider: { width: 1, height: 32, backgroundColor: Colors.divider },

  actionRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 12,
  },
  actionRowText: { ...Typography.label, color: Colors.white, fontWeight: '700' },

  inadCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  inadAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceVariant, justifyContent: 'center', alignItems: 'center' },
  inadName: { ...Typography.label, color: Colors.textPrimary },
  inadMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  inadStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  inadStatusText: { ...Typography.caption, fontWeight: '700', fontSize: 10 },

  boletoCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm, gap: 8 },
  boletoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  boletoRef: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  boletoValor: { ...Typography.label, color: Colors.success, fontWeight: '700' },
  boletoEmissao: { ...Typography.caption, color: Colors.textSecondary },
  boletoStats: { flexDirection: 'row', gap: Spacing.md },
  boletoStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  boletoStatDot: { width: 8, height: 8, borderRadius: 4 },
  boletoStatText: { ...Typography.caption, color: Colors.textSecondary },
  boletoPgBar: { height: 4, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  boletoPgFill: { height: 4, backgroundColor: Colors.success, borderRadius: Radius.full },

  planoCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  planoIconWrap: { width: 44, height: 44, borderRadius: Radius.md, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  planoName: { ...Typography.label, color: Colors.textPrimary },
  planoMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  planoValue: { ...Typography.label, color: Colors.primary, fontWeight: '700' },
  planoActiveBadge: { backgroundColor: Colors.success + '18', paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.full },
  planoActiveBadgeText: { ...Typography.caption, color: Colors.success, fontWeight: '700', fontSize: 10 },
});

const contStyles = StyleSheet.create({
  tabRow: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.md, padding: 4, ...Shadows.sm },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 9, borderRadius: Radius.sm },
  tabBtnActive: { backgroundColor: Colors.primaryLight },
  tabBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  tabBtnTextActive: { color: Colors.primary, fontWeight: '700' },

  tipoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tipoBtn: { width: '30%', alignItems: 'center', gap: 6, padding: Spacing.sm, borderRadius: Radius.md, backgroundColor: Colors.surfaceVariant },
  tipoIconWrap: { width: 44, height: 44, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  tipoBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },

  tipoFilterGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  tipoFilterBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: Spacing.sm, paddingVertical: 7, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.white },
  tipoFilterText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },

  aulaCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm, overflow: 'hidden',
  },
  aulaAccent: { width: 4, height: '100%', borderRadius: 2, position: 'absolute', left: 0, top: 0 },
  discPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full, alignSelf: 'flex-start' },
  discPillText: { ...Typography.caption, fontWeight: '700', fontSize: 10 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusPillText: { ...Typography.caption, fontWeight: '700', fontSize: 10 },
  aulaTitle: { ...Typography.label, color: Colors.textPrimary, paddingLeft: 4 },
  aulaMeta: { ...Typography.caption, color: Colors.textDisabled, fontSize: 11 },

  matIconWrap: { width: 48, height: 48, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  tipoPill: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.full },
  tipoPillText: { ...Typography.caption, fontWeight: '700', fontSize: 10 },
  dlBtn: { width: 32, height: 32, borderRadius: Radius.sm, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },

  textArea: { height: 88, paddingTop: 10 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderWidth: 2, borderColor: Colors.primary, borderStyle: 'dashed',
    borderRadius: Radius.md, padding: Spacing.md, backgroundColor: Colors.primaryLight + '40',
  },
  uploadBtnDone: { borderColor: Colors.success, backgroundColor: Colors.success + '10', borderStyle: 'solid' },
  uploadBtnText: { ...Typography.label, color: Colors.primary },
  uploadBtnSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  progressWrap: { marginTop: Spacing.xs, gap: 4 },
  progressBg: { height: 6, backgroundColor: Colors.divider, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { ...Typography.caption, color: Colors.primary, textAlign: 'center' },

  videoDica: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: '#FFF3F3', borderRadius: Radius.sm,
    padding: Spacing.sm, marginBottom: Spacing.sm,
  },
  videoDicaText: { ...Typography.caption, color: Colors.textSecondary, flex: 1, lineHeight: 17 },
});

const peStyles = StyleSheet.create({
  subTab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: Spacing.md, paddingVertical: 7,
    borderRadius: Radius.full, borderWidth: 1.5,
    borderColor: Colors.divider, backgroundColor: Colors.white,
  },
  subTabActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  subTabText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  subTabTextActive: { color: Colors.primary, fontWeight: '700' },
  countBadge: { backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, paddingHorizontal: 6, paddingVertical: 1 },
  countBadgeActive: { backgroundColor: Colors.primary + '25' },
  countBadgeText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '700', fontSize: 10 },
  countBadgeTextActive: { color: Colors.primary },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 10, ...Shadows.sm,
  },
  searchInput: { flex: 1, ...Typography.body2, color: Colors.textPrimary, padding: 0 },

  filterChip: {
    paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full,
    borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.white,
  },
  filterChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  filterChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: Colors.primary, fontWeight: '700' },

  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  clearFilters: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },

  personCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  personAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  personAvatarText: { ...Typography.h4, color: Colors.primary, fontWeight: '800' },
  personName: { ...Typography.label, color: Colors.textPrimary },
  personMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  personMeta2: { ...Typography.caption, color: Colors.textDisabled, fontSize: 10 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  statusPillText: { ...Typography.caption, fontWeight: '700', fontSize: 10 },
  classChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  classChip: { backgroundColor: Colors.primaryLight, borderRadius: Radius.full, paddingHorizontal: 7, paddingVertical: 2 },
  classChipText: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 10 },

  turmaCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  turmaIconWrap: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  turmaIconText: { ...Typography.label, color: Colors.primary, fontWeight: '800' },
  turmaTitle: { ...Typography.label, color: Colors.textPrimary },
  turmaMeta: { ...Typography.caption, color: Colors.textSecondary },
  turmaChip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, paddingHorizontal: 7, paddingVertical: 2 },
  turmaChipText: { ...Typography.caption, color: Colors.textSecondary, fontSize: 10 },
  freqValue: { ...Typography.label, fontWeight: '800' },
  freqLabel: { ...Typography.caption, color: Colors.textDisabled, fontSize: 10 },

  unidadeCard: { backgroundColor: Colors.white, borderRadius: Radius.md, ...Shadows.sm, overflow: 'hidden' },
  unidadeHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderBottomWidth: 2 },
  unidadeIconWrap: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  unidadeName: { ...Typography.h4, color: Colors.textPrimary },
  unidadeAddress: { ...Typography.caption, color: Colors.textSecondary, flex: 1 },
  unidadeStats: { flexDirection: 'row', justifyContent: 'space-around', padding: Spacing.md },
  unidadeStat: { alignItems: 'center', gap: 3 },
  unidadeStatValue: { ...Typography.h4, fontWeight: '800' },
  unidadeStatLabel: { ...Typography.caption, color: Colors.textSecondary },
  unidadeStatDivider: { width: 1, backgroundColor: Colors.divider },

  emptyState: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  emptyText: { ...Typography.label, color: Colors.textSecondary },
  emptySubText: { ...Typography.caption, color: Colors.textDisabled },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '92%', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.divider, alignSelf: 'center', marginTop: Spacing.sm, marginBottom: Spacing.md },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  modalTitle: { ...Typography.h4, color: Colors.textPrimary },
  modalSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  sectionLabel: {
    ...Typography.caption, color: Colors.textSecondary, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginTop: Spacing.md, marginBottom: 4,
    paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.divider,
  },
  fieldLabel: {
    ...Typography.caption, color: Colors.textSecondary, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: Spacing.xs, marginTop: Spacing.sm,
  },
  textInput: {
    borderWidth: 1.5, borderColor: Colors.divider, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    ...Typography.body1, color: Colors.textPrimary, backgroundColor: Colors.surfaceVariant,
  },
  optRow: { flexDirection: 'row', gap: Spacing.sm },
  optBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.surfaceVariant },
  optBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  optBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  optBtnTextActive: { color: Colors.primary, fontWeight: '700' },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.md, paddingVertical: 7,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.surfaceVariant,
  },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 14, marginTop: Spacing.lg,
  },
  submitBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
  successContent: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.md },
  successIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.success + '18', justifyContent: 'center', alignItems: 'center' },
  successTitle: { ...Typography.h3, color: Colors.textPrimary },
  successSub: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: Spacing.lg },
  doneBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.xl, paddingVertical: 12, marginTop: Spacing.sm },
  doneBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

const onbStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: Spacing.lg, gap: Spacing.md, maxHeight: '85%',
  },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.divider, alignSelf: 'center', marginBottom: Spacing.sm },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { height: 6, width: 6, borderRadius: 3, backgroundColor: Colors.divider },
  iconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  stepTitle: { ...Typography.h3, color: Colors.textPrimary, textAlign: 'center' },
  stepDesc: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  selectWrap: { gap: Spacing.sm },
  selectLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.md, paddingVertical: 7,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.surfaceVariant,
  },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  btnRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  backBtn: { flex: 1, paddingVertical: 13, borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.divider, alignItems: 'center' },
  backBtnText: { ...Typography.label, color: Colors.textSecondary },
  nextBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: 13, borderRadius: Radius.md },
  nextBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});
