import React, { useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const API_KEY = "e7cdc1cdf73400b8976fc178ca5491ea";
const BASE_URL = "https://api.themoviedb.org/3";

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
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="🎬 Filmes Populares" />
      <Button
        title="🔍 Buscar Filmes"
        onPress={() => navigation.navigate("Search")}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            onPress={(id) => navigation.navigate("Details", { movieId: id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
});
