import {React, useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './component_styles/component_styles';

{/*
    Componente que serve para filtrar e indicar as características de cada república
*/}

//O record é um HashMap
//Dado uma chave, tem-se um estilo próprio para cada característica
//Precisa sincronizar as tags, apertou em uma, todas em que aquele nome aparece deveriam ficar coloridas,
//porém ainda não estão ficando...
//acredito que usar um estado static poderia ajudar, mas ainda não entendo bem como ele funciona
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
}

export default function Tag({ name, selected = false, onPress }: TagProps) {
  const ActiveBackgroundColor = tagColors[name] || '#E0E0E0';
  const ActiveColor = Colors[name] || '#900081';
  const simbol = Icons[name] || '🏷️';

  const [isSelected,setIsSelected] = useState(selected);

  return (
    <TouchableOpacity
      style={[
        styles.tags,
        { backgroundColor: isSelected ? ActiveBackgroundColor : 'white' },
      ]}
      onPress={()=>{
          setIsSelected(!isSelected);
          }}
      activeOpacity={onPress ? 0.7 : 1}
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