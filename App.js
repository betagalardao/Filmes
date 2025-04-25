import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './screens/ListScreen';
import MovieDetailsScreen from './screens/DetailsScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListScreen"
          component={MovieListScreen}
          options={{ title: 'Filmes' }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={MovieDetailsScreen}
          options={{ title: 'Detalhes do Filme' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
