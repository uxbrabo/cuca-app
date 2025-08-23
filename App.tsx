// Em: App.tsx (na raiz do projeto)

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/theme/theme';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
}

export default App;