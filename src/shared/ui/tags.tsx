import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const categoryStyle: Record<string, { bg: string; color: string }> = {
  refeicao: { bg: '#ffe8d2', color: '#c2410c' },
  universidade: { bg: '#e7f1ff', color: '#1d4ed8' },
  convivencia: { bg: '#e5f6ea', color: '#157a3a' },
  genero: { bg: '#fff1e8', color: '#c2410c' },
};

const emoji: Record<string, string> = {
  Mista: '👥',
  Masculina: '👨',
  Feminina: '👩',
};

interface TagProps {
  name: string;
  categoria?: string;
  selected?: boolean;
  onPress?: () => void;
  filter?: boolean;
}

export default function Tag({ name, categoria, selected = false, onPress, filter = false }: TagProps) {
  const colors = categoryStyle[categoria ?? ''] || { bg: '#f4efe8', color: '#4A423B' };
  const icon = filter ? emoji[name] : undefined;

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        filter
          ? selected
            ? styles.filterOn
            : styles.filterOff
          : { backgroundColor: colors.bg, borderColor: colors.bg },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.row}>
        {icon ? <Text style={[styles.text, filter && selected ? styles.filterOnText : styles.filterOffText]}>{icon}</Text> : null}
        <Text
          style={[
            styles.text,
            filter
              ? selected
                ? styles.filterOnText
                : styles.filterOffText
              : { color: colors.color },
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterOff: {
    backgroundColor: '#fff',
    borderColor: '#e4ddd2',
  },
  filterOn: {
    backgroundColor: '#2a2420',
    borderColor: '#2a2420',
  },
  filterOffText: {
    color: '#2a2420',
  },
  filterOnText: {
    color: '#fff',
  },
});
