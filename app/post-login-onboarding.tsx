import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/navigation/types';
import styles from '~/screens/PostLoginOnboardingScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PostLoginOnboarding'>;
type Route = RouteProp<RootStackParamList, 'PostLoginOnboarding'>;

function PostLoginOnboardingScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { profile } = route.params;
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = () => {
    if (pageIndex < 2) {
      pagerRef.current?.setPage(pageIndex + 1);
    } else if (profile === 'aluno') {
      navigation.navigate('DiagnosticQuiz');
    } else {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        ref={pagerRef}
      >
        <View style={styles.page} key="1">
          <Image source={require('~/assets/onboarding_1.png')} style={styles.image} />
          <Text style={styles.title}>Bem-vindo ao Cuca!</Text>
          <Text style={styles.description}>
            Sua jornada de aprendizado começa aqui. Prepare-se para descobrir um universo de conhecimento na palma da sua mão.
          </Text>
        </View>

        <View style={styles.page} key="2">
          <Image source={require('~/assets/onboarding_2.png')} style={styles.image} />
          <Text style={styles.title}>Aprendizado sob medida</Text>
          <Text style={styles.description}>
            Personalize seus interesse e defina suas metas. Nós criamos um plano de estudos perfeito para você.
          </Text>
        </View>

        <View style={styles.page} key="3">
          <Image source={require('~/assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Tudo pronto?</Text>
          <Text style={styles.description}>
            Milhares de aulas, exercícios e desafios esperam por você. Vamos começar a explorar juntos?
          </Text>
        </View>
      </PagerView>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, i === pageIndex && styles.activeDot]} />
          ))}
        </View>
        <Button mode="contained" onPress={handleNext} style={styles.button}>
          {pageIndex === 2 ? 'Começar' : 'Próximo'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default PostLoginOnboardingScreen;
