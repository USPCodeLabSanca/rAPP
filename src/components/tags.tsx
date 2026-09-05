import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from './component_styles/component_styles';

export default function Tag({ name }: { name: string }){
    return (
        <View style = {styles.tags}>
            <Text>{name}</Text>
        </View>
    )
}
