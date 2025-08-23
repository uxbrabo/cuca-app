// Em: src/screens/SignInScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { theme } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignInScreen({ navigation }: Props): React.JSX.Element {
  // Estados para controlar o que o usuário digita e as opções
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* --- CAMPOS DE TEXTO --- */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        {/* --- OPÇÕES 'LEMBRAR' E 'ESQUECEU A SENHA' --- */}
        <View style={styles.optionsRow}>
        <Checkbox.Item
            label="Lembrar"
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}

            // Define a cor para o estado MARCADO. 
            // Já é o padrão do tema, mas ser explícito é bom.
            color={theme.colors.primary} 

            // Define a cor da BORDA para o estado DESMARCADO.
            // Um cinza neutro geralmente funciona bem para o "outline".
            uncheckedColor={'#888'} 

            labelStyle={styles.checkboxLabel}
            style={styles.checkboxContainer}
            position="leading"
        />
          <TouchableOpacity onPress={() => console.log('Esqueceu a senha')}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {/* --- BOTÃO DE LOGIN --- */}
        <Button
          mode="contained"
          onPress={() => console.log('Entrar com email/senha')}
          style={styles.button}
        >
          Login
        </Button>

        {/* --- SEPARADOR E LOGIN SOCIAL --- */}
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

        {/* --- LINK DE REGISTRO --- */}
        <View style={styles.registerRow}>
          <Text style={styles.registerTextRegular}>Você não tem conta? </Text>
          <TouchableOpacity onPress={() => console.log('Ir para Registro')}>
            <Text style={styles.registerTextBold}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: -10, // Ajuste para alinhar o texto
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'dimgrey',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 16,
    paddingVertical: 4,
  },
  separator: {
    marginVertical: 16,
    color: 'grey',
    textAlign: 'center',
  },
  socialButton: {
    marginBottom: 16,
    borderColor: 'lightgrey',
  },
  socialButtonLabel: {
    color: 'dimgrey',
  },
  socialButtonContent: {
    height: 48,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto', // Empurra para o final do espaço disponível
    paddingBottom: 16,
  },
  registerTextRegular: {
    fontSize: 14,
  },
  registerTextBold: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default SignInScreen;