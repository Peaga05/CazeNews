import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../components/colors';

function Login() {
  const navigation = useNavigation();
  const [name, setName] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Caze News ',
    });
  });

  const moveToAbout = () => {
    navigation.navigate('MainTab', { name: name });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <Text style={styles.mainTitulo}> BEM-VINDO NERDOLA </Text>
      {/* <Text style={styles.mainText}> Digite seu nome: </Text> */}
      {/* <TextInput
        style={styles.input}
        value={name}
        onChangeText={(t) => setName(t)}
      /> */}
      <TouchableOpacity style={styles.btnEntrar} onPress={moveToAbout}>
        <Text style={styles.txtEntrar}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.verdeEscuro,
  },
  mainTitulo: {
    fontSize: 18,
    color: colors.amarelo,
    marginTop: 20,
  },
  mainText: {
    fontSize: 13,
    color: colors.amarelo,
    marginTop: 5,
  },
  input: {
    width: 250,
    padding: 10,
    margin: 10,
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.amarelo,
    backgroundColor: colors.verdeEscuro,
    color: colors.amarelo,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 180,
  },
  btnEntrar: {
    width: 250,
    padding: 10,
    backgroundColor: colors.amarelo,
    borderRadius: 5,
    marginTop: 10
  },
  txtEntrar: {
    color: colors.verdeEscuro,
    fontSize: 16,
    alignSelf: 'center',
  },
});
