import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import styles from '~/screens/ForgotPasswordScreen.styles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

function ForgotPasswordScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Digite seu e-mail.');
      return;
    }
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email.trim());
      setSent(true);
    } catch (err: any) {
      const msg =
        err?.code === 'auth/user-not-found'
          ? 'E-mail não cadastrado. Verifique e tente novamente.'
          : err?.code === 'auth/invalid-email'
          ? 'E-mail inválido.'
          : 'Não foi possível enviar. Verifique sua conexão.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, localStyles.successWrap]}>
          <View style={localStyles.successIcon}>
            <Icon name="email-check-outline" size={56} color={Colors.success} />
          </View>
          <Text style={localStyles.successTitle}>E-mail enviado!</Text>
          <Text style={localStyles.successSub}>
            Verifique a caixa de entrada de {email.trim()} e siga as instruções para redefinir sua senha.
            {'\n\n'}Não recebeu? Cheque o spam ou aguarde alguns minutos.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SignIn', { profile: 'aluno' })}
            style={styles.button}
          >
            Voltar ao login
          </Button>
          <Button
            mode="text"
            onPress={() => { setSent(false); setEmail(''); }}
            style={{ marginTop: Spacing.xs }}
          >
            Tentar outro e-mail
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Digite o e-mail associado à sua conta e enviaremos um link para redefinir a senha.
        </Text>

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          mode="contained"
          onPress={handleReset}
          style={styles.button}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" size="small" /> : 'Enviar link de redefinição'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  successWrap: { alignItems: 'center', paddingTop: Spacing.xxl },
  successIcon: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: Colors.success + '18',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm, textAlign: 'center' },
  successSub: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
});

export default ForgotPasswordScreen;
