import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initDatabase } from './src/database/db';
import GameDetailScreen from './src/screens/GameDetailScreen';
import GameFormScreen from './src/screens/GameFormScreen';
import HomeScreen from './src/screens/HomeScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

initDatabase();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#d9c0a2' },
            headerTintColor: '#2f2116',
            headerTitleStyle: { fontWeight: '800' },
            contentStyle: { backgroundColor: '#efe3cf' },
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
            options={({ route }) => ({
              title: route.params?.gameId ? 'Editar jogo' : 'Cadastrar jogo',
            })}
          />
          <Stack.Screen
            name="GameDetail"
            component={GameDetailScreen}
            options={{ title: 'Detalhes do jogo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
