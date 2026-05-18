import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { MessagesStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

type RouteP = RouteProp<MessagesStackParamList, 'ConversationDetail'>;

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Olá! Como posso ajudar?', fromMe: false, time: '14:30' },
  { id: '2', text: 'Queria saber sobre as notas da última prova.', fromMe: true, time: '14:31' },
  { id: '3', text: 'Claro! A média da turma foi 7,2. Você tirou 8,5 — ótimo resultado!', fromMe: false, time: '14:32' },
  { id: '4', text: 'Que alívio! Obrigado, professor.', fromMe: true, time: '14:33' },
  { id: '5', text: 'De nada. Qualquer dúvida sobre o próximo conteúdo, pode perguntar.', fromMe: false, time: '14:33' },
];

export default function ConversationDetailScreen() {
  const route = useRoute<RouteP>();
  const { name, avatar } = route.params;

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(prev => [...prev, { id: Date.now().toString(), text, fromMe: true, time }]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const prevMsg = index > 0 ? messages[index - 1] : null;
    const showAvatar = !item.fromMe && (!prevMsg || prevMsg.fromMe);

    return (
      <View style={[styles.msgRow, item.fromMe ? styles.msgRowMe : styles.msgRowThem]}>
        {!item.fromMe && (
          <View style={styles.avatarSlot}>
            {showAvatar && <Avatar.Image size={32} source={{ uri: avatar }} />}
          </View>
        )}
        <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
          <Text style={[styles.bubbleText, item.fromMe && styles.bubbleTextMe]}>{item.text}</Text>
          <Text style={[styles.bubbleTime, item.fromMe && styles.bubbleTimeMe]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="paperclip" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Escreva uma mensagem..."
              placeholderTextColor={Colors.textDisabled}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="default"
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, input.trim() ? styles.sendBtnActive : null]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Icon
              name="send"
              size={20}
              color={input.trim() ? Colors.white : Colors.textDisabled}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  flex: { flex: 1 },
  list: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, gap: Spacing.xs },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: Spacing.xs },
  msgRowMe: { justifyContent: 'flex-end' },
  msgRowThem: { justifyContent: 'flex-start' },
  avatarSlot: { width: 36, marginRight: Spacing.xs, justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '75%',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  bubbleMe: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleText: { ...Typography.body2, color: Colors.textPrimary },
  bubbleTextMe: { color: Colors.white },
  bubbleTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.7)' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: Spacing.sm,
  },
  attachBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.sm : 4,
    maxHeight: 100,
  },
  input: {
    ...Typography.body2,
    color: Colors.textPrimary,
    padding: 0,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnActive: { backgroundColor: Colors.primary },
});
