import React, {useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TabNoticias(){
  return(
    <View style={styles.container}>
      <Text style={styles.mainText}>Tela Home 2</Text>
      <Text style={styles.mainText}> Informe seu nome: </Text>     
      <Button
        title='Teste'
      />
    </View>
  );
}

export default TabNoticias;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001f36'
  },
  mainText:{
    fontSize: 18,
    color: '#fbffcd'
  },
});