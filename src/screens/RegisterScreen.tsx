// Em: src/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/RootNavigator';
import styles from './RegisterScreen.styles'; // Importando do novo arquivo

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

function RegisterScreen({ navigation }: Props): React.JSX.Element {
  // Estados para os novos campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

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
        <TextInput
          label="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={confirmPasswordVisible}
          right={
            <TextInput.Icon
              icon={confirmPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={() => console.log('Registrar pressionado')}
          style={styles.button}
        >
          Registrar
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

export default RegisterScreen;