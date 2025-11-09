import React, { useState } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import { useTheme } from "../context/themeContext";

const API_KEY = "e7cdc1cdf73400b8976fc178ca5491ea";
const BASE_URL = "https://api.themoviedb.org/3";

type Movie = { id: number; title: string; poster_path: string };
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  const searchMovies = () => {
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results))
      .catch(console.error);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="🔍 Buscar Filmes" />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={searchMovies}
      />
      <Button
        title="Voltar"
        color={theme.primary}
        onPress={() => navigation.navigate("Popular")}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            onPress={(id) => navigation.navigate("Details", { movieId: id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
