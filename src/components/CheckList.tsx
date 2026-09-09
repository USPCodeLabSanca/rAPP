import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


/* Acabei não precisando mais desse componente, mas é uma checklist */
interface itens{
    vetor : string[]
}

export default function CheckList({vetor} : itens){
    return(
        <View style = {{gap:2,}}>
            {
                vetor.map((el, index)=>{
                    return (
                        <View key = {index} style = {styles.option}>
                            <TouchableOpacity style = {styles.select}></TouchableOpacity>
                            <Text>{el}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    select:{
        borderWidth: 1,
        borderRadius: 10,
        width: 10,
        height: 10,
    },
    option:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 2,
        width: 200,
    },
})