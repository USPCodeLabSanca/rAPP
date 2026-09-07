import {React, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './component_styles/component_styles';

/*
Pequeno componente para tags que representam vantagens que cada rep possui (útil para filtrar)
 */

// Mapeamento direto de cores
const tagColors: Record<string, string> = {
    'Jantar': '#C1BFFF',
    'Sem trote': '#F7CBFF',
    'Faz festas': '#FFCBCB',
    'USP': '#F5FFCB',
    'UFSCAR': '#FFCBD4',
    'Almoço' : '#F5FFCB',
};

const Colors: Record<string, string> = {
  'Jantar': '#2722CA',
  'Sem trote': '#A822CA',
  'Faz festas': '#CA2222',
  'USP': '#AFAF1A',
  'UFSCAR': '#CA2222',
  'Almoço' : '#AFAF1A',
};

const Icons: Record<string, string> = {
  'Jantar': '☾',
  'Sem trote': '🧘‍♀️',
  'Faz festas': '🎊️',
  'USP': '🐷',
  'UFSCAR': '🐲',
  'Almoço' : '🍲',
};

export default function Tag({ name }: { name: string }) {
  // Pega a cor correspondente ou usa uma neutra caso não encontre
  const ActiveBackgroundColor = tagColors[name] || '#E0E0E0';
  const ActiveColor = Colors[name] || '#900081';
  const simbol = Icons[name] || '🧘‍♀️';

  const [isSelected,setIsSelected] = useState(false);
    return (
        <TouchableOpacity
          style={[
            styles.tags,
            { backgroundColor: isSelected ? ActiveBackgroundColor : 'white' },
          ]}
          onPress={() => setIsSelected(!isSelected)}
        >
          <Text
            style={{
              color: isSelected ? ActiveColor : '#666666',
              fontWeight: isSelected ? 'bold' : 'normal',
            }}
          >
            {simbol} {name}
          </Text>
        </TouchableOpacity>
      );
}