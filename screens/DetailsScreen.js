import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getMovieDetails } from '../services/api';

const MovieDetailsScreen = ({ route }) => {
  const { imdbID } = route.params; 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(imdbID);
        setMovie(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!movie) {
    return <Text style={{ margin: 20 }}>Detalhes não disponíveis.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.info}>🎬 Gênero: {movie.Genre}</Text>
      <Text style={styles.info}>🎥 Diretor: {movie.Director}</Text>
      <Text style={styles.info}>🎭 Atores: {movie.Actors}</Text>
      <Text style={styles.plot}>{movie.Plot}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center' 
  },
  poster: { 
    width: 200, 
    height: 300, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  info: { 
    padding: 5,
    fontSize: 18, 
    marginBottom: 6 
  },
  plot: { 
    fontSize: 19, 
    marginTop: 10, 
    lineHeight: 25,
    textAlign: 'justify' 
  },
});

export default MovieDetailsScreen;
