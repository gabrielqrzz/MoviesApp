import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const API_KEY = "e7cdc1cdf73400b8976fc178ca5491ea";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Popular">;

export default function PopularScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Filmes Populares</Text>
      <Button
        title="🔍 Buscar Filmes"
        onPress={() => navigation.navigate("Search")}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: IMG_URL + item.poster_path }}
                style={styles.poster}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.vote}>⭐ {item.vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  vote: { color: "#ffcc00", marginTop: 5 },
});
