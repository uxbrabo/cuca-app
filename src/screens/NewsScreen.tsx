import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NewsScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela News</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
export default NewsScreen;