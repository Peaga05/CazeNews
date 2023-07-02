import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../components/colors';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from "../../firebaseConfig";
import { doc, updateDoc , getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from '../components/Loading';

function AlterarNoticia({ navigation, route  }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [visivel, setVisivel] = useState(false);
    const [noticia, setNoticia] = useState<any>({})
    const {id} = route.params;

    const getNoticia = async () => {
        setVisivel(true);
        const colecao = doc(FIRESTORE_DB, 'Noticias', id);
        const colecaoSnapshot = await getDoc(colecao);
        if(colecaoSnapshot.exists()){
            setNoticia({
                id: colecaoSnapshot.id,
                ...colecaoSnapshot.data()
            });
        }
        setVisivel(false);   
        setImagem(noticia.imagem)
    }

    useEffect(() => { getNoticia() }, []);

    const getImage = async () => {

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!image.canceled) {
            handleAtualizaTexto("imagem", image.assets[0].uri)
        }
    }

    const updateNoticia = async () => {
        try {
            setVisivel(true);
            const referencia = ref(FIRESTORE_STORAGE, 'imagens/' + new Date().getTime());
            const resposta = await fetch(noticia.imagem);
            const blob = await resposta.blob();
            await uploadBytes(referencia, blob);

            const url = await getDownloadURL(referencia);
            const colecao = doc(FIRESTORE_DB, 'Noticias', id);
            await updateDoc(colecao, noticia)
            setVisivel(false);
            alert("Notícia atualizada com sucesso!")
            navigation.navigate('MainTab', noticia.user);
        } catch (error) {
            alert('Erro ao atualizada notícia: ' + error);
        }
    }

    const handleAtualizaTexto = (key: string, t: string) => {
        setNoticia({
            ...noticia,
            [key]: t
        });
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.mainText}>Título</Text>
            <TextInput
                value={noticia.titulo}
                style={styles.tituloInput}
                onChangeText={(t) => handleAtualizaTexto("titulo",t)}
            />
            <Text style={styles.mainText}>Descrição</Text>
            <TextInput
                value={noticia.descricao}
                multiline={true}
                numberOfLines={10}
                style={styles.descInput}
                onChangeText={(t) => handleAtualizaTexto("descricao",t)}
            />
            {noticia.imagem != '' &&
                <View style={styles.imagemContainer}>
                    <Image style={styles.imagem} source={{ uri: noticia.imagem }} resizeMode="cover" />
                </View>
            }
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={getImage}>
                    <Text style={styles.btnText}>SELECIONAR IMAGEM</Text>
                </TouchableOpacity>
                {noticia.titulo != '' && noticia.descricao != '' && noticia.imagem != '' &&
                    <TouchableOpacity style={styles.button} onPress={updateNoticia}>
                        <Text style={styles.btnText}>ATUALIZAR NOTÍCIA</Text>
                    </TouchableOpacity>
                }
            </View>

            <Loading visivel={visivel} />
    
        </ScrollView>
    );
}

export default AlterarNoticia;

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
        height: 180
    },
    imagem: {
        width: '100%',
        height: 180,
        borderRadius: 20,
    },
});