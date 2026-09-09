import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

//DELETAR
//página desnecessária, pode ser deletada, já que não haverá mais usuários
export default function choice(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style = {styles.card_login}>
                <Image
                    source={require('../../assets/logoRapp-removebg-preview.png')}
                    style = {styles.logo}
                />
                <View style = {styles.container_text}>
                    <Text style={styles.text}>Você quer se cadastrar como república ou usuário comum?</Text>
                </View>
                <View style = {{gap:12}}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('RegistroRep' as never)}
                    >
                        <Text style={styles.button_text}>República</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('RegistroUser' as never)}
                    >
                        <Text style={styles.button_text}>Usuário comum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}