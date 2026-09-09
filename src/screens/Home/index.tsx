import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import Card from '../../components/RepCards';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownInput from '../../components/dropDownInput';
import Tag from '../../components/tags';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

/*
Página Home (a primeira que aparece ao abrir o aplicativo)
*/

export default function Home(){
    const [rep_search, setRep_search] = useState('');

    const [users, setUsers] = useState([]);

    //função que lista as repúblicas de acordo com o pesquisado
    //por padrão, ao carregar a página, todas são listadas
    async function listaReps(){
        try {
            const repsFromApi = await api.get(`/reps?nome=${rep_search}`);
            setUsers(repsFromApi.data);
        } catch (error) {
            console.error("Erro ao buscar repúblicas:", error);
        }
    }

    //Executa a busca assim que a tela abre
    useEffect(() => {
        listaReps();
    }, []);

    // responsável pela navegação entre páginas
    const navigation = useNavigation();

    return(
        <View style = {styles.container}>
             <View style = {styles.choices}>
                 <TextInput
                         style={styles.input}
                         placeholder="🔎 Buscar república"
                         placeholderTextColor="#999"
                         value={rep_search}                  // Vincula o valor do input ao estado
                         onChangeText={(texto) => {
                                 setRep_search(texto);
                                 listaReps(texto); // Passa o texto atualizado diretamente para a função
                         }}       // Atualiza o estado a cada caractere digitado
                 />
                 <DropDownInput option1 = 'São Carlos' defaultText = 'Todas'/>
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
                     <TouchableOpacity key={rep.id} onPress={() => {
                        navigation.navigate('Info_rep', { id: rep.id });
                     }}>
                        <Card key={rep.id} nome={rep.nome}/>
                     </TouchableOpacity>
                 ))}
             </ScrollView>
        </View>
        )
    }