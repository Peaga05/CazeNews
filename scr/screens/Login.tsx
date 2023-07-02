// Android: 1014209607565-2ufdvl04tpml6h6uc3tf80avs60odndl.apps.googleusercontent.com
// Web: 1014209607565-q5sfs9onh0qqev78fbs1bh5riagsut91.apps.googleusercontent.com
import React, { useState, useLayoutEffect, useEffect } from 'react';
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
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
function Login() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1014209607565-2ufdvl04tpml6h6uc3tf80avs60odndl.apps.googleusercontent.com",
    webClientId: "1014209607565-q5sfs9onh0qqev78fbs1bh5riagsut91.apps.googleusercontent.com"
  });

  useEffect(() => {
    handleLoginGoogle();
  }, [response])

  async function handleLoginGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
      moveToAbout();
    }
  }

  const getUserInfo = async (token: any) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate('MainTab', userInfo.email);
    } catch (error) {
      // Add your own error handler here
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Caze News ',
    });
  });

  const moveToAbout = () => {
    if(userInfo)
      navigation.navigate('MainTab', userInfo.email);
  };

  const sair = () => {
    AsyncStorage.removeItem("@user")
    setUserInfo(null);
  }

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <Text style={styles.mainTitulo}> BEM-VINDO NERDOLA </Text>
      {userInfo &&
        <Text style={styles.mainText}>Você esta logado como {userInfo.name}</Text>
      }

      <TouchableOpacity style={styles.btnEntrar} onPress={userInfo ? moveToAbout : () => promptAsync()}>
        <Text style={styles.txtEntrar}>{userInfo ? "Entrar" : "Realizar Login"}</Text>
      </TouchableOpacity>

      {userInfo &&
        <TouchableOpacity style={styles.btnEntrar} onPress={sair}>
          <Text style={styles.txtEntrar}>Sair</Text>
        </TouchableOpacity>
      }

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
    marginTop: 10,
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
