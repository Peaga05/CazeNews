import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFire, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../components/colors';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Loading from '../components/Loading';

function TabNoticias({ route }) {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [visivel, setVisivel] = useState(true);
  const {user} = route.params;

  useEffect(() => {
    const NoticiasRef = collection(FIRESTORE_DB, 'Noticias');
    const subscriber = onSnapshot(NoticiasRef, {
      next: (snapshot) => {
        const noticias: any[] = [];
        snapshot.docs.forEach(doc => {
          noticias.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setNoticias(noticias);
        setVisivel(false);
      }
    })
    return () => subscriber();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.lista}
        data={noticias}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.data}>{item.data}</Text>
            <View style={styles.imagemContainer}>
              <Image style={styles.imagem} source={{ uri: item.imagem }} resizeMode="cover" />
            </View>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <View style={styles.acoes}>
              <FontAwesomeIcon
                icon={faFire}
                size={20}
                color={"white"}
                style={styles.like}
              />
              <Text>{item.like}</Text>

              <View style={styles.crud}>
              <FontAwesomeIcon
                icon={faPen}
                size={20}
                color={"white"}
                style={styles.edit}
              />
              <FontAwesomeIcon
                icon={faTrash}
                size={20}
                color={"white"}
                style={styles.excluir}
              />
              </View>
            </View>
            <View style={styles.linha} />
          </View>
        )}
      />
      <Loading visivel={visivel} />
    </SafeAreaView >
  );
}

export default TabNoticias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.verdeEscuro,
  },
  lista: {

  },
  imagemContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: '50%',
    height: 200
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  descricao: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 40,
    fontSize: 14,
    color: colors.branco,
  },
  data: {
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
  },
  titulo: {
    fontSize: 16,
    color: colors.amarelo,
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'uppercase'
  },
  linha: {
    marginTop: 8,
    width: '100%',
    height: 1,
    backgroundColor: colors.amarelo
  },
  acoes:{
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crud:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingVertical: 20,
  },
  excluir:{

  },
  edit:{

  },
  like:{

  }
});