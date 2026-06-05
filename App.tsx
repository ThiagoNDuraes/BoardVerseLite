import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { initDatabase } from './src/database/db';
import GameDetailScreen from './src/screens/GameDetailScreen';
import GameFormScreen from './src/screens/GameFormScreen';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme/colors';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '900',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'BoardVerse Lite' }}
        />

        <Stack.Screen
          name="GameForm"
          component={GameFormScreen}
          options={{ title: 'Jogo' }}
        />

        <Stack.Screen
          name="GameDetail"
          component={GameDetailScreen}
          options={{ title: 'Detalhes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}