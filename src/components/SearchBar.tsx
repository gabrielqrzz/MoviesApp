import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

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
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme..."
        placeholderTextColor="#888"
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
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
  },
});
