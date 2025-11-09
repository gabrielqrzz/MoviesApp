import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
}: SearchBarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {
          backgroundColor: theme.background === '#FFFFFF' ? '#f5f5f5' : '#222',
          color: theme.text
        }]}
        placeholder="Digite o nome do filme..."
        placeholderTextColor={theme.background === '#FFFFFF' ? '#666' : '#888'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    padding: 10,
    borderRadius: 8,
  },
});
