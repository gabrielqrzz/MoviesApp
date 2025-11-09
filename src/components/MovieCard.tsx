import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
  onPress: (id: number) => void;
};

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  onPress,
}: MovieCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={[styles.card, { backgroundColor: theme.background === '#FFFFFF' ? '#f5f5f5' : '#222' }]}>
        <Image source={{ uri: IMG_URL + poster_path }} style={styles.poster} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]}>{title}</Text>
          {vote_average !== undefined && (
            <Text style={[styles.vote, { color: theme.primary }]}>⭐ {vote_average}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold" },
  vote: { marginTop: 5 },
});
