import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import { colors } from './colors';

export default function Loading({visivel} : any){
    return(
        <Modal visible={visivel}>
                <View style={styles.modal}>
                    <ActivityIndicator
                        size='large'
                        color={colors.amarelo}
                        animating={true}
                    />
                </View>
         </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.verdeEscuro,
    }
});