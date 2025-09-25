import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
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
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const searchMovies = () => {
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Buscar Filmes</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchMovies}
      />
      <Button title="Voltar" onPress={() => navigation.navigate("Popular")} />
      <FlatList
        data={results}
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
              <Text style={styles.name}>{item.title}</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
  },
  poster: { width: 60, height: 90, marginRight: 10 },
  name: { fontSize: 16, color: "#fff" },
});
