import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/navigation/types';
import { theme } from '~/theme/theme';
import styles from '~/screens/SignInScreen.styles';
import { useProfile } from '~/context/ProfileContext';
import { useAuth } from '~/context/AuthContext';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
type Route = RouteProp<RootStackParamList, 'SignIn'>;

function SignInScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { profile } = route.params;

  const { setProfile } = useProfile();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      // Tenta login real no Firebase
      const user = await signIn(email.trim(), password);
      // Usa o perfil do documento Firestore, não o selecionado na tela de login
      setProfile(user.perfil);
      navigation.navigate('PostLoginOnboarding', { profile: user.perfil });
    } catch (err: any) {
      const msg =
        err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password'
          ? 'E-mail ou senha incorretos.'
          : err?.code === 'auth/too-many-requests'
          ? 'Muitas tentativas. Aguarde alguns minutos.'
          : err?.code === 'auth/network-request-failed'
          ? 'Sem conexão. Verifique sua internet.'
          : err?.message ?? 'Erro ao entrar. Tente novamente.';
      Alert.alert('Erro no login', msg);
    } finally {
      setLoading(false);
    }
  };

  // Durante o desenvolvimento sem Firebase configurado, permite bypass
  const handleDevBypass = () => {
    setProfile(profile);
    navigation.navigate('PostLoginOnboarding', { profile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={passwordHidden}
          right={
            <TextInput.Icon
              icon={passwordHidden ? 'eye' : 'eye-off'}
              onPress={() => setPasswordHidden(!passwordHidden)}
            />
          }
        />

        <View style={styles.optionsRow}>
          <Checkbox.Item
            label="Lembrar"
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            color={theme.colors.primary}
            uncheckedColor="#888"
            labelStyle={styles.checkboxLabel}
            style={styles.checkboxContainer}
            position="leading"
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" size="small" /> : 'Entrar'}
        </Button>

        <Text style={styles.separator}>ou</Text>

        <Button
          icon="google"
          mode="outlined"
          onPress={handleDevBypass}
          style={styles.socialButton}
          labelStyle={styles.socialButtonLabel}
          contentStyle={styles.socialButtonContent}
        >
          Entrar com o Google
        </Button>

        <View style={styles.registerRow}>
          <Text style={styles.registerTextRegular}>Você não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerTextBold}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignInScreen;
