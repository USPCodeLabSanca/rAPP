import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './component_styles/component_styles'

/*
Estrelinhas de avaliação (5 estrelas, 4 estrelas, etc)
*/

const stars = ({maxStars = 5}) =>{
    const [stars,setStars] = useState(0);

    return (
        <View style = {styles.ratings}>
            {Array.from({ length: maxStars }).map((_, index) => {
                    const starNumber = index + 1;
                    return (
                      <TouchableOpacity key={starNumber} onPress={() => setStars(starNumber)}>
                        <Ionicons
                          name={starNumber <= stars ? 'star' : 'star-outline'}
                          size={20}
                          color="#FFD700"
                        />
                      </TouchableOpacity>
                    );
            })}
        </View>
    )
}

export default stars;


