// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //

import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './Screen/LoginPage';
import Register from './Screen/Register';
import DashBoard from './Screen/DashBoard';
import SplashScreen from './Screen/SplashScreen';
import SelectAccount from './Screen/SelectAccount';
import AllShopes from './Screen/AllShopes';
import ShopsDashboard from './Screen/shopkeeper/ShopsDashboard';
import RegisterShop from './Screen/shopkeeper/RegisterShop';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SelectAccount"
          component={SelectAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AllShopes"
          component={AllShopes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShopsDashboard"
          component={ShopsDashboard}
          options={{ headerShown: false }}
        />

 <Stack.Screen
          name="RegisterShop"
          component={RegisterShop}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;