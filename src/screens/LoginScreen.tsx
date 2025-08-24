// Em: src/screens/LoginScreen.tsx

import React from 'react';
// StyleSheet foi removido desta linha
import { Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/RootNavigator';
// ADICIONE ESTA LINHA:
import styles from './LoginScreen.styles';

// Crie este tipo logo acima da definição da função LoginScreen
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* View interna para controlar o conteúdo */}
      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.button}
        >
          Login
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={[styles.button, styles.registerButton]}
          labelStyle={styles.registerButtonLabel}
        >
          Cadastre-se
        </Button>

        <Text style={styles.separator}>ou</Text>

        <Button
          icon="google"
          mode="outlined"
          onPress={() => console.log('Google Pressionado')}
          style={styles.socialButton}
          labelStyle={styles.socialButtonLabel}
          contentStyle={styles.socialButtonContent}
        >
          Entrar com o Google
        </Button>

      </View>
    </SafeAreaView>
  );
}



export default LoginScreen;