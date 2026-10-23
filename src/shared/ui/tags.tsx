import React, {useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './component_styles/component_styles';

{/*
    Componente que serve para filtrar e indicar as características de cada república
*/}

const tagColors: Record<string, string> = {
  'Jantar': '#C1BFFF',
  'Sem trote': '#F7CBFF',
  'Faz festas': '#FFCBCB',
  'USP': '#F5FFCB',
  'UFSCAR': '#FFCBD4',
  'Almoço': '#FF8C1A',
  'Mista': '#F5FFCB',
  'Masculina': '#C1BFFF',
  'Feminina': '#FFCBCB',
  'Faxineira': '#957B8C',
};

const Colors: Record<string, string> = {
  'Jantar': '#2722CA',
  'Sem trote': '#A822CA',
  'Faz festas': '#CA2222',
  'USP': '#AFAF1A',
  'UFSCAR': '#CA2222',
  'Almoço': '#80470E',
  'Mista': '#AFAF1A',
  'Masculina': '#2722CA',
  'Feminina': '#CA2222',
  'Faxineira': '#3D333A',
};

const Icons: Record<string, string> = {
  'Jantar': '☾',
  'Sem trote': '🧘‍♀️',
  'Faz festas': '🎊️',
  'USP': '🐷',
  'UFSCAR': '🐲',
  'Almoço': '🍲',
  'Mista': '👫',
  'Masculina': '👨‍🦱',
  'Feminina': '👩',
  'Faxineira': '🧹',
};

interface TagProps {
  name: string;
  selected?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
}

export default function Tag({ name, selected = false, isSelected: propIsSelected, onPress }: TagProps) {
  const ActiveBackgroundColor = tagColors[name] || '#E0E0E0';
  const ActiveColor = Colors[name] || '#900081';
  const simbol = Icons[name] || '🏷️';

  const [internalSelected, setInternalSelected] = useState(selected);
  const isSelected = propIsSelected !== undefined ? propIsSelected : internalSelected;

  return (
    <TouchableOpacity
      style={[
        styles.tags,
        { backgroundColor: isSelected ? ActiveBackgroundColor : 'white' },
      ]}
      onPress={()=>{
          if (onPress) {
              onPress();
          } else {
              setInternalSelected(!internalSelected);
          }
      }}
      activeOpacity={0.7}
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
