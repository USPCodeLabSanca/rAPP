import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import styles from './styles';
import Card from '../../components/RepCards';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownInput from '../../components/dropDownInput';
import Tag from '../../components/tags';

export default function Home(){
    const [rep_search, setRep_search] = useState('');

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
                 <DropDownInput option1 = 'a' option2 = 'b' option3 = 'c' defaultText = 'Todas' />
                 <DropDownInput option1 = 'a' option2 = 'b' option3 = 'c' defaultText = 'Preço'/>
             </View>
             <View style = {styles.container_tags}>
                <Tag name = 'Jantar'/>
                <Tag name = 'Sem trote'/>
                <Tag name = 'Faz festas'/>
                <Tag name = 'USP'/>
                <Tag name = 'UFSCAR'/>
                <Tag name = 'Almoço'/>
             </View>
             <View style = {styles.container_cards}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
             </View>
        </View>
        )
    }