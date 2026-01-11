import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryButton({ category, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: category.color },
        isSelected && styles.selected,
      ]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selected: {
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});