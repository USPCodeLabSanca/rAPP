import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import styles from './styles';
import Card from '../../components/RepCards';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownInput from '../../components/dropDownInput';
import Tag from '../../components/tags';
import api from '../../services/api'

/*
Página Home (a primeira que aparece ao abrir o aplicativo)
*/

export default function Home(){
    const [rep_search, setRep_search] = useState('');

    const [users, setUsers] = useState([]);

    async function listaReps(){
        try {
            const repsFromApi = await api.get('/reps');
            setUsers(repsFromApi.data);
        } catch (error) {
            console.error("Erro ao buscar repúblicas:", error);
        }
    }

    //Executa a busca assim que a tela abre
    useEffect(() => {
        listaReps();
    }, []);

    return(
        <View style = {styles.container}>
             <View style = {styles.choices}>
                 <TextInput
                         style={styles.input}
                         placeholder="🔎 Buscar república"
                         placeholderTextColor="#999"
                         value={rep_search}                  // Vincula o valor do input ao estado
                         onChangeText={setRep_search}        // Atualiza o estado a cada caractere digitado
                 />
                 <DropDownInput option1 = 'a' option2 = 'b' option3 = 'c' defaultText = 'Todas'/>
                 <DropDownInput option1 = 'a' option2 = 'b' option3 = 'c' defaultText = 'Preço' />
             </View>
             <ScrollView
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.container_tags}
             >
                <Tag name='Jantar'/>
                <Tag name='Sem trote'/>
                <Tag name='Faz festas'/>
                <Tag name='USP'/>
                <Tag name='UFSCAR'/>
                <Tag name='Almoço'/>
             </ScrollView>
             <ScrollView contentContainerStyle={styles.container_cards}>
                 {users.map((rep) => (
                     <Card key={rep.id} nome={rep.nome} />
                 ))}
                 <Card nome={"Republica 29"} />
             </ScrollView>
        </View>
        )
    }