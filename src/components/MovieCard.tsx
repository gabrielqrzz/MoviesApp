import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

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
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={styles.card}>
        <Image source={{ uri: IMG_URL + poster_path }} style={styles.poster} />
        <View style={styles.info}>
          <Text style={styles.name}>{title}</Text>
          {vote_average !== undefined && (
            <Text style={styles.vote}>⭐ {vote_average}</Text>
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
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  vote: { color: "#ffcc00", marginTop: 5 },
});
