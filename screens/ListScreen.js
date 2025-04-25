  import React, { useEffect, useState } from 'react';
  import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
  import { searchMovies } from '../services/api';
  
  const MovieListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchMovies(searchTerm);
      setMovies(results || []);
    } catch (error) {
      setMovies([]);
      setError(error.message || 'Não foi possível carregar os filmes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', { imdbID: item.imdbID })}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/100x150' }}
          style={styles.poster}
        />
        <View style={styles.info}>
          <Text style={styles.movieTitle}>{item.Title}</Text>
          <Text style={styles.movieYear}>{item.Year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={fetchMovies}
        placeholder="Buscar filmes..."
      />

      {loading && <ActivityIndicator size="large" color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  card: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
  poster: { width: 100, height: 150, marginRight: 20 },
  info: { flex: 1, justifyContent: 'center' },
  movieTitle: { fontSize: 18, fontWeight: 'bold' },
  movieYear: { fontSize: 14, color: '#888' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default MovieListScreen;