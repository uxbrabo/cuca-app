import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import styles from '~/screens/RegisterScreen.styles';

function RegisterScreen(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

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
        <TextInput
          label="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={confirmPasswordHidden}
          right={
            <TextInput.Icon
              icon={confirmPasswordHidden ? 'eye' : 'eye-off'}
              onPress={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
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
