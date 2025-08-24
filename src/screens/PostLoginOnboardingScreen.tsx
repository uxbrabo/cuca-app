// Em: src/screens/PostLoginOnboardingScreen.tsx

import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import { Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/RootNavigator';
import styles from './PostLoginOnboardingScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PostLoginOnboarding'>;

function PostLoginOnboardingScreen({ navigation }: Props): React.JSX.Element {
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = () => {
    if (pageIndex < 2) {
      pagerRef.current?.setPage(pageIndex + 1);
    } else {
      // No futuro, isto navegará para a tela Home
      navigation.replace('MainTabs');
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
        {/* Página 1 */}
        <View style={styles.page} key="1">
          <Image source={require('../../assets/onboarding_1.png')} style={styles.image} />
          <Text style={styles.title}>Bem-vindo ao Cuca!</Text>
          <Text style={styles.description}>
            Sua jornada de aprendizado começa aqui. Prepare-se para descobrir um universo de conhecimento na palma da sua mão.
          </Text>
        </View>

        {/* Página 2 */}
        <View style={styles.page} key="2">
          <Image source={require('../../assets/onboarding_2.png')} style={styles.image} />
          <Text style={styles.title}>Aprendizado sob medida</Text>
          <Text style={styles.description}>
            Personalize seus interesse e defina suas metas. Nós criamos um plano de estudos perfeito para você.
          </Text>
        </View>

        {/* Página 3 */}
        <View style={styles.page} key="3">
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Tudo pronto?</Text>
          <Text style={styles.description}>
            Milhares de aulas, exercícios e desafios esperam por você. Vamos começar a explorar juntos?
          </Text>
        </View>
      </PagerView>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, i === pageIndex && styles.activeDot]}
            />
          ))}
        </View>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
        >
          {pageIndex === 2 ? 'Começar' : 'Próximo'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default PostLoginOnboardingScreen;