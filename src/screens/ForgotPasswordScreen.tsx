// Em: src/screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import styles from './ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

function ForgotPasswordScreen({ navigation }: Props): React.JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Insira o e-mail associado à sua conta e enviaremos um e-mail com um código para redefinir sua senha
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Verification')}
          style={styles.button}
        >
          Confirmar
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;