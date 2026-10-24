import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from './component_styles/component_styles';
import Tag from './tags';

/*
Cards com informações das repúblicas
Falta conectar com o banco de dados as tags, localização e preço (se de fato for mantido esse campo)
*/

export default function Card(props:{nome}){

    return(
        <View style = {styles.card}>
            <Image style={styles.repImage} source={require('./foto_banner.jpg')} />
            <View style = {styles.container_info_card}>
                <View>
                   <View style = {styles.row}>
                        <Text style = {styles.h1}>{props.nome}</Text>
                   </View>
                    <Text style = {styles.h2}>Entrada da arquitetura - São Carlos, SP</Text>
                </View>
                <View style = {styles.tag_styles}>
                    <Tag name = 'Jantar'/>
                    <Tag name = 'USP'/>
                    <Tag name = 'Faz festas'/>
                </View>
                <View>
                    <Text style = {{color: '#666666'}}>
                        R$ 800/mês
                    </Text>
                </View>
            </View>
        </View>
        )
    }
