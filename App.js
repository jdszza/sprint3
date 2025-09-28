import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider } from './context/AppContext';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <Navigation />
        <Toast />
      </AppProvider>
    </PaperProvider>
  );
}
