import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import TabNoticias from '../screens/TabNoticias';
import TabCadNoticias from '../screens/TabCadNoticias';
import { colors } from '../components/colors';

const Tab = createBottomTabNavigator();
function MainTab ({route}){
  const user = route.params;

  return(
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
      showLabel: true,
      activeTintColor: colors.verdeEscuro,
      activeBackgroundColor: colors.preto,
    }}
  
  >
    <Tab.Screen
      name="TabNoticias"
      component={ TabNoticias }
      options={{ title: 'NOTÍCIAS'}}
      initialParams={{user}}
      
    />
    <Tab.Screen
      name="TabCadNoticias"
      component={TabCadNoticias}
      options={{ title: 'CADASTRAR NOTÍCIAS' }}
      initialParams={{user}}
    />
  </Tab.Navigator>
  );
}

export default MainTab

