import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';
import loginStyles from '~/screens/LoginScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type Profile = 'aluno' | 'familia' | 'escola';

const PROFILES: { id: Profile; label: string; icon: string; sub: string }[] = [
  { id: 'aluno',   label: 'Aluno',   icon: 'account-school-outline', sub: 'Aprender e evoluir' },
  { id: 'familia', label: 'Família', icon: 'account-child-outline',  sub: 'Acompanhar o filho' },
  { id: 'escola',  label: 'Escola',  icon: 'domain',                 sub: 'Gestão e ensino' },
];

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const [profile, setProfile] = useState<Profile>('aluno');

  const loginLabel = profile === 'aluno'
    ? 'Entrar como Aluno'
    : profile === 'familia'
    ? 'Entrar como Família'
    : 'Entrar como Escola';

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.content}>
        <Image source={require('~/assets/logo.png')} style={loginStyles.logo} />

        {/* PROFILE SELECTOR */}
        <Text style={styles.selectorLabel}>Quem está acessando?</Text>
        <View style={styles.selectorRow}>
          {PROFILES.map(p => {
            const active = profile === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.profileCard, active && styles.profileCardActive]}
                onPress={() => setProfile(p.id)}
                activeOpacity={0.8}
              >
                <Icon
                  name={p.icon}
                  size={26}
                  color={active ? Colors.primary : Colors.textDisabled}
                />
                <Text style={[styles.profileLabel, active && styles.profileLabelActive]}>
                  {p.label}
                </Text>
                <Text style={[styles.profileSub, active && styles.profileSubActive]}>
                  {p.sub}
                </Text>
                {active && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ACTIONS */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignIn', { profile })}
          style={loginStyles.button}
        >
          {loginLabel}
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={[loginStyles.button, loginStyles.registerButton]}
          labelStyle={loginStyles.registerButtonLabel}
        >
          Cadastre-se
        </Button>

        <Text style={loginStyles.separator}>ou</Text>

        <Button
          icon="google"
          mode="outlined"
          onPress={() => {}}
          style={loginStyles.socialButton}
          labelStyle={loginStyles.socialButtonLabel}
          contentStyle={loginStyles.socialButtonContent}
        >
          Entrar com o Google
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectorLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  selectorRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  profileCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceVariant,
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  profileCardActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  profileLabel: {
    ...Typography.label,
    color: Colors.textDisabled,
    fontSize: 13,
  },
  profileLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  profileSub: {
    ...Typography.caption,
    color: Colors.textDisabled,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 13,
  },
  profileSubActive: {
    color: Colors.primary,
    opacity: 0.8,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default LoginScreen;
