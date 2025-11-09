import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { theme } = useTheme();

  return <Text style={[styles.title, { color: theme.text }]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
});
