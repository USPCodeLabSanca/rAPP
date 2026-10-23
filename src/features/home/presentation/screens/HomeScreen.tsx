import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles';
import Card from '../../../../shared/ui/RepCards';
import DropDownInput from '../../../../shared/ui/dropDownInput';
import Tag from '../../../../shared/ui/tags';
import { useNavigation } from '@react-navigation/native';
import { useHome } from '../hooks/useHome';

/*
Página Home (a primeira que aparece ao abrir o aplicativo)
*/

export default function HomeScreen(){
    const { rep_search, setRep_search, users, listaReps } = useHome();
    const navigation = useNavigation();

    return(
        <View style = {styles.container}>
             <View style = {styles.choices}>
                 <TextInput
                         style={styles.input}
                         placeholder="🔎 Buscar república"
                         placeholderTextColor="#999"
                         value={rep_search}
                         onChangeText={(texto) => {
                                 setRep_search(texto);
                                 listaReps(texto);
                         }}
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
                 {Array.isArray(users) && users.map((rep: any) => (
                     <TouchableOpacity key={rep.id} onPress={() => {
                        navigation.navigate('Info_rep' as never, { id: rep.id } as never);
                     }}>
                        <Card key={rep.id} nome={rep.nome}/>
                     </TouchableOpacity>
                 ))}
             </ScrollView>
        </View>
    )
}
