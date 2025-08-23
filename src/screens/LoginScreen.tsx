import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { theme } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

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
          onPress={() => console.log('Cadastre-se Pressionado')}
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
        <Button
          icon="facebook"
          mode="outlined"
          onPress={() => console.log('Facebook Pressionado')}
          style={styles.socialButton}
          labelStyle={styles.socialButtonLabel}
          contentStyle={styles.socialButtonContent}
        >
          Entrar com o Facebook
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center', // <-- A LINHA DECISIVA
  },
  // NOVO ESTILO PARA O CONTAINER DE CONTEÚDO
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 48,
  },
  button: {
    marginBottom: 16,
    width: 320,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
  },
  registerButton: {
    backgroundColor: '#e6e5e5ff',
  },
  registerButtonLabel: {
    color: theme.colors.primary,
  },
  separator: {
    marginVertical: 16,
    color: 'grey',
    textAlign: 'center',
  },
  socialButton: {
    marginBottom: 16,
    borderColor: 'lightgrey',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  socialButtonLabel: {
    color: 'dimgrey',
  },
  socialButtonContent: {
    height: 48,
  },
});

export default LoginScreen;