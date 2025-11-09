import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import Header from "../components/Header";
import { useTheme } from "../context/themeContext";

const API_KEY = "e7cdc1cdf73400b8976fc178ca5491ea";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;

type Movie = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then(setMovie)
      .catch(console.error);
  }, [movieId]);

  if (!movie)
    return <Text style={{ color: theme.text, margin: 20 }}>Carregando...</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={movie.title} />
      <Button
        title="Voltar"
        color={theme.primary}
        onPress={() => navigation.goBack()}
      />
      <Image
        source={{ uri: IMG_URL + movie.poster_path }}
        style={styles.poster}
      />
      <Text style={[styles.vote, { color: theme.primary }]}>⭐ {movie.vote_average}</Text>
      <Text style={[styles.release, { color: theme.text }]}>📅 {movie.release_date}</Text>
      <Text style={[styles.overview, { color: theme.text }]}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  poster: { width: "100%", height: 500, borderRadius: 10, marginBottom: 20 },
  vote: { fontSize: 18, marginBottom: 10 },
  release: { fontSize: 16, marginBottom: 20 },
  overview: { fontSize: 16, lineHeight: 22, marginBottom: 60 },
});
