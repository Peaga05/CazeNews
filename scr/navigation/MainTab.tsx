import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import TabNoticias from '../screens/TabNoticias';
import TabCadNoticias from '../screens/TabCadNoticias';

const Tab = createBottomTabNavigator();
export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => <TabBarIcon name={route.name}/>,
    })}
    tabBarOptions={{
      showLabel: false,
    }}>
    <Tab.Screen
      name="TabNoticias"
      component={TabNoticias}
      options={{ title: 'Noticias'}} 
    />
    <Tab.Screen
      name="TabCadNoticias"
      component={TabCadNoticias}
      options={{ title: 'Cadastrar Noticia' }}
    />
  </Tab.Navigator>
);
