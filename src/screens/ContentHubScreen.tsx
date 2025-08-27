// Em: src/screens/ContentHubScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ContentHubScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HUB de Conteúdo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

// A linha de exportação é crucial
export default ContentHubScreen;