import React from 'react';
import Login from '../screens/Login';
import MainTab from './MainTab';
import { createStackNavigator } from '@react-navigation/stack';
import {colors} from '../components/colors';

const MainStack = createStackNavigator();

export default () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.amarelo,
          height: 50,
        },
        headerTitleStyle: {
          color: colors.preto,
          fontWeight: 'bold',
        },
      }}>
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen
        name="MainTab"
        component={MainTab}
        options={(props) => ({ title: "Notícias" })}
      />
    </MainStack.Navigator>
  );
};
