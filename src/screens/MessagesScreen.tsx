import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela Mensagem</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
export default MessagesScreen;