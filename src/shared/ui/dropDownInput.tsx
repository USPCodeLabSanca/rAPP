import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type DropDownProps = {
  options: string[];
  onSelect?: (selectedItem: string, index: number) => void;
  defaultText?: string;
};

export default function DropDownInput({ options, onSelect, defaultText }: DropDownProps) {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => {
          if (onSelect) onSelect(selectedItem, index);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={styles.dropdownButton}>
              <Text style={styles.dropdownButtonText}>
                {selectedItem || defaultText}  <Text style={styles.arrowText}>∨</Text>
              </Text>
            </View>
          );
        }}
        renderItem={(item, _index, isSelected) => {
          return (
            <View style={[styles.dropdownItem, isSelected && { backgroundColor: '#f3eee6' }]}>
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
  container: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#e4ddd2',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  dropdownButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2a2420',
  },
  arrowText: {
    fontSize: 11,
    color: '#786F68',
  },
  dropdownItem: {
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 44,
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#2a2420',
  },
});
