// Em: src/screens/PerformanceScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Card, SegmentedButtons, Button, Avatar } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './PerformanceScreen.styles';
import { theme } from '~/theme/theme';

// Pegamos a largura da tela para os gráficos se ajustarem
const screenWidth = Dimensions.get('window').width;

function PerformanceScreen(): React.JSX.Element {
  const [filter, setFilter] = useState('periodo');

  // =================================================================
  // DADOS FICTÍCIOS ABRANGENTES PARA TODA A TELA
  // =================================================================
  const performanceDataByFilter = {
    periodo: {
      line: {
        title: 'Evolução das Notas',
        subtitle: 'Últimos 6 meses',
        change: '+5%',
        changeColorStyle: styles.positiveChange,
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{ data: [60, 70, 65, 85, 75, 88] }],
        },
      },
      bar: {
        title: 'Desempenho por Tópico',
        subtitle: 'Último semestre',
        change: '-2%',
        changeColorStyle: styles.negativeChange,
        data: {
          labels: ['Álgebra', 'Geometria', 'Trigon.'],
          datasets: [{ data: [70, 90, 60] }],
        },
      },
      summary: [
        { id: 's1', value: '78%', label: 'Taxa de acertos', icon: 'chart-bar', style: 'positive' },
        { id: 's2', value: '15h', label: 'Tempo de estudo', icon: 'clock-outline', style: 'neutral' },
        { id: 's3', value: '-3%', label: 'Variação de erros', icon: 'chart-line-variant', style: 'positive' },
        { id: 's4', value: '33', label: 'Etapas concluídas', icon: 'check-circle-outline', style: 'neutral' },
      ],
      recommendations: [
        {
          id: 'r1', type: 'good', icon: 'brain', title: 'Você está dominando a Geometria!',
          description: 'Seu percentual de acertos em "Teorema de Pitágoras" é de 95%. Ótimo trabalho!',
        },
        {
          id: 'r2', type: 'improve', icon: 'lightbulb-on-outline', title: 'Oportunidade de Melhoria',
          description: 'Notamos que você errou 3 das últimas 5 questões sobre "Sistemas de Equações". Que tal revisar?',
        },
      ],
    },
    disciplina: {
      line: {
        title: 'Evolução em Matemática',
        subtitle: 'Últimas 6 semanas',
        change: '+12%',
        changeColorStyle: styles.positiveChange,
        data: {
          labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
          datasets: [{ data: [75, 78, 80, 82, 88, 90] }],
        },
      },
      bar: {
        title: 'Desempenho por Disciplina',
        subtitle: 'Geral',
        change: '+3%',
        changeColorStyle: styles.positiveChange,
        data: {
          labels: ['Mat', 'Port', 'Hist', 'Geo', 'Fís', 'Quim'],
          datasets: [{ data: [85, 72, 65, 78, 81, 75] }],
        },
      },
      summary: [
        { id: 's1', value: '85%', label: 'Acertos em Matemática', icon: 'calculator-variant', style: 'positive' },
        { id: 's2', value: '72%', label: 'Acertos em Português', icon: 'book-open-page-variant', style: 'neutral' },
        { id: 's3', value: '65%', label: 'Acertos em História', icon: 'bank', style: 'negative' },
        { id: 's4', value: '4/6', label: 'Disciplinas na meta', icon: 'flag-checkered', style: 'neutral' },
      ],
      recommendations: [
        {
          id: 'r1', type: 'good', icon: 'rocket-launch', title: 'Matemática em alta!',
          description: 'Sua performance em Álgebra e Geometria está excelente. Continue assim!',
        },
        {
          id: 'r2', type: 'improve', icon: 'school', title: 'Foco em História',
          description: 'Sua taxa de acertos em História está abaixo da média. Sugerimos revisar "Brasil Colônia".',
        },
      ],
    },
    atividades: {
      line: {
        title: 'Engajamento em Atividades',
        subtitle: 'Últimos 7 dias',
        change: '-10%',
        changeColorStyle: styles.negativeChange,
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          datasets: [{ data: [5, 8, 6, 10, 7, 9, 4] }],
        },
      },
      bar: {
        title: 'Acertos por Tipo de Atividade',
        subtitle: 'Geral',
        change: '+7%',
        changeColorStyle: styles.positiveChange,
        data: {
          labels: ['Quizzes', 'Exercícios', 'Leituras'],
          datasets: [{ data: [88, 75, 95] }],
        },
      },
      summary: [
        { id: 's1', value: '95%', label: 'Acertos em Leituras', icon: 'file-document-outline', style: 'positive' },
        { id: 's2', value: '88%', label: 'Acertos em Quizzes', icon: 'frequently-asked-questions', style: 'positive' },
        { id: 's3', value: '75%', label: 'Acertos em Exercícios', icon: 'pencil-ruler', style: 'neutral' },
        { id: 's4', value: '12', label: 'Quizzes concluídos', icon: 'trophy-outline', style: 'neutral' },
      ],
      recommendations: [
        {
          id: 'r1', type: 'good', icon: 'star-circle', title: 'Excelente nos Quizzes!',
          description: 'Você gabaritou os últimos 3 quizzes de Literatura. Parabéns!',
        },
        {
          id: 'r2', type: 'improve', icon: 'target-account', title: 'Desafio nos Exercícios',
          description: 'Os exercícios de Física estão mais desafiadores. Que tal assistir uma vídeo aula de reforço?',
        },
      ],
    },
  };

  // Estados para controlar os dados dos gráficos
  const [lineChart, setLineChart] = useState(performanceDataByFilter.periodo.line);
  const [barChart, setBarChart] = useState(performanceDataByFilter.periodo.bar);
  const [summaryData, setSummaryData] = useState(performanceDataByFilter.periodo.summary);
  const [recommendations, setRecommendations] = useState(performanceDataByFilter.periodo.recommendations);

  // Hook que atualiza os dados dos gráficos sempre que o filtro mudar
  useEffect(() => {
    const currentFilter = filter as keyof typeof performanceDataByFilter;
    setLineChart(performanceDataByFilter[currentFilter].line);
    setBarChart(performanceDataByFilter[currentFilter].bar);
    setSummaryData(performanceDataByFilter[currentFilter].summary);
    setRecommendations(performanceDataByFilter[currentFilter].recommendations);
  }, [filter]);

  // Configuração visual dos gráficos
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 82, 204, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.grey.replace(')', `, ${opacity})`).replace('rgb', 'rgba'), // Usa a cor do tema
    style: { borderRadius: 16 },
    propsForDots: { r: '4', strokeWidth: '2', stroke: theme.colors.primary },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      {/* --- CARDS DE RESUMO --- */}
      <View style={styles.summaryContainer}>
        {summaryData.map(item => {
          const valueStyle =
            item.style === 'positive' ? styles.positiveChange :
            item.style === 'negative' ? styles.negativeChange :
            null;
          const iconColor =
            item.style === 'positive' ? theme.colors.success :
            item.style === 'negative' ? theme.colors.error :
            theme.colors.grey;

          return (
            <Card key={item.id} style={styles.summaryCard}>
              <Card.Content style={styles.summaryCardContent}>
                <Text style={[styles.summaryValue, valueStyle]}>{item.value}</Text>
                <Text style={styles.summaryLabel}>{item.label}</Text>
                <Icon name={item.icon} size={32} color={iconColor} style={styles.summaryIcon} />
              </Card.Content>
            </Card>
          );
        })}
      </View>

      {/* --- BOTÕES DE FILTRO --- */}
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: 'periodo', label: 'Período', icon: 'calendar-month' },
          { value: 'disciplina', label: 'Disciplina', icon: 'book-open-variant' },
          { value: 'atividades', label: 'Atividades', icon: 'format-list-checks' },
        ]}
        style={styles.segmentedButtons}
      />

      {/* --- GRÁFICO DE EVOLUÇÃO --- */}
      <Card style={styles.chartCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{lineChart.title}</Text>
          <Text style={styles.cardSubtitle}>
            {lineChart.subtitle} <Text style={lineChart.changeColorStyle}>{lineChart.change}</Text>
          </Text>
        </View>
        <LineChart
          data={lineChart.data}
          width={screenWidth - 64} // Largura da tela - (padding da tela * 2) - (padding do card * 2)
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 16 }}
          // Adicionar uma key garante que o gráfico seja recriado ao mudar o filtro, evitando bugs visuais
          key={`line-chart-${filter}`}
        />
      </Card>

      {/* --- GRÁFICO DE DESEMPENHO POR TÓPICO --- */}
      <Card style={styles.chartCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{barChart.title}</Text>
          <Text style={styles.cardSubtitle}>
            {barChart.subtitle} <Text style={barChart.changeColorStyle}>{barChart.change}</Text>
          </Text>
        </View>
        <BarChart
          data={barChart.data}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={{ borderRadius: 16 }}
          key={`bar-chart-${filter}`}
        />
      </Card>

      {/* --- RECOMENDAÇÕES --- */}
      <Text style={styles.recommendationSectionTitle}>Recomendações do Tutor Virtual</Text>
      {recommendations.map(rec => (
        <TouchableOpacity
          key={rec.id}
          style={[
            styles.recommendationCard,
            rec.type === 'good' ? styles.recommendationCardGood : styles.recommendationCardImprove
          ]}
        >
          <Avatar.Icon icon={rec.icon} size={40} style={styles.recommendationIcon} />
          <View style={styles.recommendationTextContainer}>
            <Text style={styles.recommendationTitle}>{rec.title}</Text>
            <Text style={styles.recommendationDescription}>{rec.description}</Text>
            {rec.type === 'good' ? (
              <Text style={styles.recommendationLink}>Ver detalhes</Text>
            ) : (
              <View style={styles.actionButtonContainer}>
                <Button mode="outlined" style={styles.actionButton}>Assistir Vídeo</Button>
                <Button mode="contained" style={[styles.actionButton, styles.actionButtonMiddle]}>Fazer Quizzes</Button>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* --- BOTÕES FINAIS --- */}
      <View style={styles.actionButtonContainer}>
        <Button mode="contained-tonal" icon="teach" style={styles.actionButton}>Tutor Virtual</Button>
        <Button mode="contained-tonal" icon="file-chart-outline" style={[styles.actionButton, styles.actionButtonMiddle]}>Relatório Detalhado</Button>
      </View>
    </ScrollView>
  );
}

export default PerformanceScreen;