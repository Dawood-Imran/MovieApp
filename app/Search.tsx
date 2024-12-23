import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from './components/Loading';

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
        const [loading, setLoading] = useState(false); 
  

  const [movies, setMovies] = useState([
    { id: 1, title: 'Spider-Man: Across the Spider-Verse', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'The Flash', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Guardians of the Galaxy Vol. 3', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Mission: Impossible – Dead Reckoning', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Barbie', image: 'https://via.placeholder.com/150' },
  ]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [numColumns, setNumColumns] = useState(2);


  const handleSearch = () => {
    // Implement search functionality here
    const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredMovies([]);
    navigation.navigate('(tabs)'); // Navigate back to movies screen
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieScreen', { params: movie }); // Navigate to MovieScreen with movie data
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for movies..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Optional: handle search on submit
        />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Icon name="times" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {
  loading ? (
    <Loading />
  ) : (
    <View>
      <Text style={styles.resultsText}>
        Results: {filteredMovies.length > 0 ? filteredMovies.length : 'No'} found
      </Text>

      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieContainer} onPress={() => handleMoviePress(item)}>
              <Image source={{ uri: item.image }} style={styles.movieImage} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns} // Use the numColumns state
          key={numColumns} // Set key prop to force re-render on numColumns change
          columnWrapperStyle={styles.row} // Style for the row
        />
      ) : (
        <Text style={styles.noResultsText}>No movie data is available.</Text>
      )}
    </View>
  )
}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for a cinematic feel
    
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Darker background for the input field
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#fff', // White text color
    fontSize: 16,
    padding: 10,
  },
  clearButton: {
    marginLeft: 10,
  },

  resultsText: {
    color: '#fff',
    marginVertical: 10,
    fontSize: 16,
  },
  movieContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Add horizontal margin for spacing
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // Center the title under the image
  },
  noResultsText: {
    color: '#ff0000', // Red color for no results message
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between', // Space between items in the row
  },
});

export default Search;