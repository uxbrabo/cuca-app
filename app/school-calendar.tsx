import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type EventType = 'prova' | 'entrega' | 'evento' | 'feriado' | 'reuniao';
type FilterType = EventType | 'todos';

type CalendarEvent = {
  id: string; day: number; month: number; title: string;
  type: EventType; subject?: string; time?: string; detail: string;
};

const EVENT_CONFIG: Record<EventType, { color: string; icon: string; label: string }> = {
  prova: { color: Colors.error, icon: 'pencil-box', label: 'Prova' },
  entrega: { color: Colors.warning, icon: 'file-upload', label: 'Entrega' },
  evento: { color: Colors.primary, icon: 'calendar-star', label: 'Evento' },
  feriado: { color: Colors.success, icon: 'beach', label: 'Feriado' },
  reuniao: { color: Colors.info, icon: 'account-group', label: 'Reunião' },
};

const EVENTS: CalendarEvent[] = [
  { id: '1', day: 19, month: 5, title: 'Prova de Matemática', type: 'prova', subject: 'Matemática', time: '08:00', detail: 'Capítulos 4 a 7: Funções, Trigonometria e Geometria Analítica. Trazer régua e compasso.' },
  { id: '2', day: 20, month: 5, title: 'Conselho de Classe', type: 'reuniao', time: '19:00', detail: 'Reunião entre professores e coordenação para avaliação do 2º bimestre.' },
  { id: '3', day: 22, month: 5, title: 'Entrega — Trabalho de História', type: 'entrega', subject: 'História', detail: 'Trabalho escrito sobre a República Velha. Mínimo 5 páginas, normas ABNT.' },
  { id: '4', day: 24, month: 5, title: 'Reunião Pedagógica', type: 'reuniao', time: '14:00', detail: 'Planejamento do 3º bimestre com todos os professores.' },
  { id: '5', day: 26, month: 5, title: 'Prova de Física', type: 'prova', subject: 'Física', time: '10:00', detail: 'Eletrostática, Eletrodinâmica e Eletromagnetismo. Lista de exercícios conta como nota.' },
  { id: '6', day: 29, month: 5, title: 'Feira de Ciências', type: 'evento', time: '09:00', detail: 'Apresentação dos projetos de pesquisa. Presença obrigatória para alunos do 3º ano.' },
  { id: '7', day: 1, month: 6, title: 'Início do 3º Bimestre', type: 'evento', detail: 'Início oficial do terceiro bimestre letivo de 2026.' },
  { id: '8', day: 5, month: 6, title: 'Prova de Química', type: 'prova', subject: 'Química', time: '08:00', detail: 'Equilíbrio Químico e Eletroquímica. Tabela periódica será fornecida.' },
  { id: '9', day: 10, month: 6, title: 'Corpus Christi', type: 'feriado', detail: 'Feriado nacional. Não haverá aulas.' },
  { id: '10', day: 15, month: 6, title: 'Simulado ENEM', type: 'prova', time: '07:30', detail: 'Simulado completo com as 5 áreas do ENEM. Duração: 5h30. Trazer documento e lápis.' },
  { id: '11', day: 20, month: 6, title: 'Semana Cultural', type: 'evento', detail: 'Semana de atividades culturais e artísticas da escola.' },
  { id: '12', day: 24, month: 6, title: 'Entrega — Redação', type: 'entrega', subject: 'Português', detail: 'Redação dissertativa-argumentativa. Tema: tecnologia e sociedade.' },
];

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTHS_FULL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function getDaysInMonth(month: number, year: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(month: number, year: number) { return new Date(year, month, 1).getDay(); }

export default function SchoolCalendarScreen() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [filter, setFilter] = useState<FilterType>('todos');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const daysInMonth = getDaysInMonth(viewMonth, viewYear);
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear);

  const eventsThisMonth = EVENTS.filter(e => e.month - 1 === viewMonth);
  const eventsByDay = (day: number) => eventsThisMonth.filter(e => e.day === day);

  const goToMonth = (dir: 1 | -1) => {
    setSelectedDay(null);
    if (dir === 1) {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
      else setViewMonth(m => m + 1);
    } else {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
      else setViewMonth(m => m - 1);
    }
  };

  const allFilteredEvents = EVENTS.filter(e => {
    const inView = e.month - 1 === viewMonth;
    if (!inView) return false;
    if (filter === 'todos') return true;
    return e.type === filter;
  }).sort((a, b) => a.day - b.day);

  const selectedDayEvents = selectedDay
    ? allFilteredEvents.filter(e => e.day === selectedDay)
    : [];

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* MONTH NAV */}
        <View style={s.monthNav}>
          <TouchableOpacity onPress={() => goToMonth(-1)} style={s.navBtn}>
            <Icon name="chevron-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={s.monthTitle}>{MONTHS_FULL[viewMonth]} {viewYear}</Text>
          <TouchableOpacity onPress={() => goToMonth(1)} style={s.navBtn}>
            <Icon name="chevron-right" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* WEEK HEADERS */}
        <View style={s.weekRow}>
          {WEEK_DAYS.map((d, i) => (
            <Text key={i} style={[s.weekDay, i === 0 || i === 6 ? { color: Colors.error } : {}]}>{d}</Text>
          ))}
        </View>

        {/* CALENDAR GRID */}
        <View style={s.calendarGrid}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`empty-${i}`} style={s.dayCell} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = eventsByDay(day);
            const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
            const isSelected = day === selectedDay;
            return (
              <TouchableOpacity
                key={day}
                style={[s.dayCell, isSelected && s.dayCellSelected, isToday && !isSelected && s.dayCellToday]}
                onPress={() => setSelectedDay(day === selectedDay ? null : day)}
              >
                <Text style={[s.dayNum, isSelected && s.dayNumSelected, isToday && !isSelected && s.dayNumToday]}>
                  {day}
                </Text>
                <View style={s.dayDots}>
                  {dayEvents.slice(0, 3).map((e, j) => (
                    <View key={j} style={[s.dot, { backgroundColor: EVENT_CONFIG[e.type].color }]} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FILTER */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {(['todos', 'prova', 'entrega', 'evento', 'reuniao', 'feriado'] as FilterType[]).map(f => (
            <TouchableOpacity
              key={f}
              style={[s.filterChip, filter === f && { backgroundColor: f === 'todos' ? Colors.primary : EVENT_CONFIG[f as EventType]?.color ?? Colors.primary, borderColor: 'transparent' }]}
              onPress={() => setFilter(f)}
            >
              {f !== 'todos' && <View style={[s.filterDot, { backgroundColor: filter === f ? Colors.white : EVENT_CONFIG[f as EventType].color }]} />}
              <Text style={[s.filterChipText, filter === f && { color: Colors.white }]}>
                {f === 'todos' ? 'Todos' : EVENT_CONFIG[f as EventType].label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* EVENTS LIST */}
        <View style={s.eventsSection}>
          <Text style={s.eventsSectionTitle}>
            {selectedDay ? `Eventos — ${selectedDay} de ${MONTHS_FULL[viewMonth]}` : `Todos os eventos — ${MONTHS[viewMonth]}`}
          </Text>
          {(selectedDay ? selectedDayEvents : allFilteredEvents).length === 0 ? (
            <View style={s.emptyState}>
              <Icon name="calendar-blank-outline" size={36} color={Colors.textDisabled} />
              <Text style={s.emptyStateText}>Nenhum evento {selectedDay ? 'neste dia' : 'este mês'}</Text>
            </View>
          ) : (
            (selectedDay ? selectedDayEvents : allFilteredEvents).map(e => {
              const cfg = EVENT_CONFIG[e.type];
              return (
                <TouchableOpacity key={e.id} style={s.eventRow} onPress={() => setSelectedEvent(e)} activeOpacity={0.85}>
                  <View style={[s.eventDateBox, { borderColor: cfg.color }]}>
                    <Text style={[s.eventDateDay, { color: cfg.color }]}>{e.day}</Text>
                    <Text style={[s.eventDateMonth, { color: cfg.color }]}>{MONTHS[e.month - 1]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={s.eventTitleRow}>
                      <View style={[s.eventTypeBadge, { backgroundColor: cfg.color + '18' }]}>
                        <Icon name={cfg.icon} size={12} color={cfg.color} />
                        <Text style={[s.eventTypeBadgeText, { color: cfg.color }]}>{cfg.label}</Text>
                      </View>
                      {e.time && <Text style={s.eventTime}>{e.time}</Text>}
                    </View>
                    <Text style={s.eventTitle}>{e.title}</Text>
                    {e.subject && <Text style={s.eventSubject}>{e.subject}</Text>}
                  </View>
                  <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* EVENT DETAIL MODAL */}
      <Modal visible={!!selectedEvent} transparent animationType="slide" onRequestClose={() => setSelectedEvent(null)}>
        <TouchableWithoutFeedback onPress={() => setSelectedEvent(null)}>
          <View style={s.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={s.modalSheet}>
                <View style={s.modalHandle} />
                {selectedEvent && (() => {
                  const cfg = EVENT_CONFIG[selectedEvent.type];
                  return (
                    <>
                      <View style={[s.modalHeader, { backgroundColor: cfg.color + '15' }]}>
                        <View style={[s.modalHeaderIcon, { backgroundColor: cfg.color + '25' }]}>
                          <Icon name={cfg.icon} size={28} color={cfg.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={[s.eventTypeBadge, { backgroundColor: cfg.color + '20', alignSelf: 'flex-start' }]}>
                            <Text style={[s.eventTypeBadgeText, { color: cfg.color }]}>{cfg.label}</Text>
                          </View>
                          <Text style={s.modalTitle}>{selectedEvent.title}</Text>
                          <Text style={s.modalDate}>
                            {selectedEvent.day} de {MONTHS_FULL[selectedEvent.month - 1]}
                            {selectedEvent.time ? ` · ${selectedEvent.time}` : ''}
                          </Text>
                        </View>
                      </View>
                      <Text style={s.modalDetail}>{selectedEvent.detail}</Text>
                      {selectedEvent.subject && (
                        <View style={s.modalSubjectRow}>
                          <Icon name="book-open" size={16} color={Colors.textSecondary} />
                          <Text style={s.modalSubject}>Disciplina: {selectedEvent.subject}</Text>
                        </View>
                      )}
                      <TouchableOpacity style={[s.modalCloseBtn, { backgroundColor: cfg.color }]} onPress={() => setSelectedEvent(null)}>
                        <Text style={s.modalCloseBtnText}>Fechar</Text>
                      </TouchableOpacity>
                    </>
                  );
                })()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },

  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  navBtn: { padding: Spacing.sm },
  monthTitle: { ...Typography.h4, color: Colors.textPrimary },

  weekRow: { flexDirection: 'row', paddingHorizontal: Spacing.sm },
  weekDay: { flex: 1, textAlign: 'center', ...Typography.caption, color: Colors.textSecondary, fontWeight: '600', paddingVertical: 6 },

  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.divider, paddingBottom: Spacing.sm },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 4, borderRadius: Radius.sm },
  dayCellToday: { backgroundColor: Colors.primaryLight },
  dayCellSelected: { backgroundColor: Colors.primary },
  dayNum: { ...Typography.body2, color: Colors.textPrimary, fontWeight: '500' },
  dayNumToday: { color: Colors.primary, fontWeight: '700' },
  dayNumSelected: { color: Colors.white, fontWeight: '700' },
  dayDots: { flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 },
  dot: { width: 5, height: 5, borderRadius: 3 },

  filterRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, gap: Spacing.sm },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.white },
  filterDot: { width: 7, height: 7, borderRadius: 4 },
  filterChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },

  eventsSection: { padding: Spacing.md, gap: Spacing.sm, backgroundColor: Colors.surfaceVariant, flex: 1 },
  eventsSectionTitle: { ...Typography.label, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  emptyState: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xl },
  emptyStateText: { ...Typography.body2, color: Colors.textDisabled },

  eventRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  eventDateBox: { width: 48, height: 48, borderRadius: Radius.sm, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  eventDateDay: { ...Typography.h4, fontWeight: '700' },
  eventDateMonth: { ...Typography.caption, fontWeight: '600', fontSize: 10 },
  eventTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 3 },
  eventTypeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.full },
  eventTypeBadgeText: { fontSize: 10, fontWeight: '700' },
  eventTime: { ...Typography.caption, color: Colors.textSecondary },
  eventTitle: { ...Typography.label, color: Colors.textPrimary },
  eventSubject: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: Spacing.lg, gap: Spacing.md },
  modalHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.divider, alignSelf: 'center', marginBottom: Spacing.sm },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, borderRadius: Radius.md, padding: Spacing.md },
  modalHeaderIcon: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { ...Typography.h4, color: Colors.textPrimary, marginTop: 4 },
  modalDate: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  modalDetail: { ...Typography.body2, color: Colors.textPrimary, lineHeight: 22 },
  modalSubjectRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  modalSubject: { ...Typography.body2, color: Colors.textSecondary },
  modalCloseBtn: { borderRadius: Radius.md, paddingVertical: 13, alignItems: 'center', marginTop: Spacing.sm },
  modalCloseBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});
