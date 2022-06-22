import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  RecoilRoot,
  useRecoilState,
} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './Auth';
import FeedScreen from './Feed';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { textState } from './atoms';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useRecoilState(textState);

  useEffect(() => {
    AsyncStorage.getItem('userSession').then((data) => {
      console.log({data});
      setText(data);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <View><Text>Carregando...</Text></View>

  return (
    <Stack.Navigator initialRouteName={text ? "Feed": "Auth"}>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Bem-vindo', headerShown: false }} />
      <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Feed de Reclamações', headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
}