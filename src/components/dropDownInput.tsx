import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import  {RFValue}  from "react-native-responsive-fontsize";

type DropDownProps = {
  option1: string;
  option2: string;
  option3: string;
  onSelect?: (selectedItem: string, index: number) => void;
};

export default function DropDownInput({ option1, option2, option3, onSelect, defaultText }: DropDownProps) {
  // Array simples com as opções recebidas
  const options = [option1, option2, option3];

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => {
          if (onSelect) onSelect(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButton}>
              <Text style={styles.dropdownButtonText}>
                {selectedItem || defaultText}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={[styles.dropdownItem, isSelected && { backgroundColor: '#D2D9DF' }]}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 40, minWidth: '20%', marginRight: 4, marginLeft: 4, alignItems: 'center'},
  dropdownButton: { height: 40, minWidth: '20%' , backgroundColor: 'white', borderRadius: 20, justifyContent: 'center', paddingHorizontal: 12 },
  dropdownButtonText: { fontSize: RFValue(12,680), color: '#151E26' },
  dropdownItem: { width: '100%', flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', height: 50 },
  dropdownItemText: { fontSize: RFValue(12,680), color: 'black' },
});