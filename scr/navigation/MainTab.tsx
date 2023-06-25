import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import TabNoticias from '../screens/TabNoticias';
import TabCadNoticias from '../screens/TabCadNoticias';
import { colors } from '../components/colors';

const Tab = createBottomTabNavigator();
export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => <TabBarIcon name={route.name} />,
      headerShown: false,
      headerStyle: {
        backgroundColor: colors.branco,
      },
      headerTitleStyle: {
        fontSize: 22,
        color: 'black'
      },
    })}
    tabBarOptions={{
      tabBarActiveBackgroundColor: colors.verdeEscuro,
      tabStyle: {
        backgroundColor: colors.branco,
      },
    }}

  >
    <Tab.Screen
      name="TabNoticias"
      component={TabNoticias}
      options={{ title: 'NOTÍCIAS' }}
    />
    <Tab.Screen
      name="TabCadNoticias"
      component={TabCadNoticias}
      options={{ title: 'CADASTRAR NOTÍCIAS' }}
    />
  </Tab.Navigator>
);
