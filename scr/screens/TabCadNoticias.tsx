import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Modal, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../components/colors';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from "../../firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from '../components/Loading';

function TabCadNoticias({ route }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [visivel, setVisivel] = useState(false);
    const {user} = route.params;

    const generateDate = () => {
        const ref = new Date();
        const data = [ref.getDate(), ref.getMonth() + 1, ref.getFullYear()].join('/');
        return (data);
    }

    const getImage = async () => {

        let imagem = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!imagem.canceled) {
            setImagem(imagem.assets[0].uri);
        }
    }

    const clearFields = () => {
        setDescricao('');
        setImagem('');
        setTitulo('');
    }

    const setNoticia = async () => {
        try {
            setVisivel(true);
            const referencia = ref(FIRESTORE_STORAGE, 'imagens/' + new Date().getTime());
            const resposta = await fetch(imagem);
            const blob = await resposta.blob();

            await uploadBytes(referencia, blob);
            const url = await getDownloadURL(referencia);
            const doc = addDoc(collection(FIRESTORE_DB, 'Noticias'), { titulo: titulo, descricao: descricao, data: generateDate(), imagem: imagem, user: user, like: 0 });
            clearFields();
            setVisivel(false);
            alert("Notícia cadastrada!")

        } catch (error) {
            alert('Erro ao criar notícia: ' + error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.mainText}>Título</Text>
            <TextInput
                value={titulo}
                style={styles.tituloInput}
                onChangeText={(t) => setTitulo(t)}
            />
            <Text style={styles.mainText}>Descrição</Text>
            <TextInput
                value={descricao}
                multiline={true}
                numberOfLines={10}
                style={styles.descInput}
                onChangeText={(t) => setDescricao(t)}
            />
            {imagem != '' &&
                <View style={styles.imagemContainer}>
                    <Image style={styles.imagem} source={{ uri: imagem }} resizeMode="cover" />
                </View>
            }
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={getImage}>
                    <Text style={styles.btnText}>SELECIONAR IMAGEM</Text>
                </TouchableOpacity>
                {titulo != '' && descricao != '' && imagem != '' &&
                    <TouchableOpacity style={styles.button} onPress={setNoticia}>
                        <Text style={styles.btnText}>CADASTRAR NOTÍCIA</Text>
                    </TouchableOpacity>
                }
            </View>

            <Loading visivel={visivel} />
    
        </ScrollView>
    );
}

export default TabCadNoticias;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.verdeEscuro,
    },
    btnContainer: {
        alignItems: 'center',
        marginTop: '5%'
    },
    mainText: {
        color: colors.amarelo,
        fontSize: 18,
        marginLeft: 20,
        marginTop: '10%',
        justifyContent: 'flex-start'
    },
    tituloInput: {
        width: '90%',
        padding: 10,
        marginHorizontal: 20,
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.amarelo,
        backgroundColor: colors.verdeEscuro,
        color: colors.amarelo,
    },
    descInput: {
        width: '90%',
        height: 160,
        padding: 10,
        marginHorizontal: 20,
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.amarelo,
        backgroundColor: colors.verdeEscuro,
        color: colors.amarelo,
    },
    button: {
        marginVertical: 10,
        width: 250,
        padding: 10,
        backgroundColor: colors.amarelo,
        borderRadius: 5,
    },
    btnText: {
        textAlign: 'center',
        color: colors.verdeEscuro
    },
    imagemContainer: {
        alignSelf: 'center',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: '50%',
        height: 100
    },
    imagem: {
        width: '100%',
        height: 130,
        borderRadius: 20,
    },
});