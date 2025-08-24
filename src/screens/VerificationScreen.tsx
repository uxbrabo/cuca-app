// Em: src/screens/VerificationScreen.tsx

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/RootNavigator';
import styles from './VerificationScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

function VerificationScreen({ navigation }: Props): React.JSX.Element {
  const [code, setCode] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(33);

  // Usamos o tipo concreto do TextInput do React Native para a ref.
  const inputs = useRef<(RNTextInput | null)[]>([]);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Insira o código que foi enviado para o seu e-mail e verifique completamente a sua conta.
        </Text>

        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleBackspace(e, index)}
              value={digit}
              ref={(ref: RNTextInput | null) => {
                inputs.current[index] = ref;
              }}
              mode="flat"
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendInfoText}>Um código foi enviado para o seu e-mail</Text>
          <TouchableOpacity disabled={countdown > 0} onPress={() => setCountdown(33)}>
            <Text style={styles.resendTimerText}>
              {countdown > 0 ? `Reenviar em 00:${countdown.toString().padStart(2, '0')}` : 'Reenviar código'}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={() => console.log('Confirmar código:', code.join(''))}
          style={styles.button}
        >
          Confirmar
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default VerificationScreen;