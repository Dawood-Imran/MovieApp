import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image , Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Cast from './components/Cast';
import MovieList from './components/MovieList';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from './components/Loading';
import { db } from '@/Firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { my_auth } from '../Firebase';
import { useAuth } from './context/AuthContext';
import Toast from './components/Toast';


import { fetchMovieCredits, fetchMovieDetails, fetchMovieSimilar } from './api/moviedb';

const MovieScreen = () => {
  const navigation = useNavigation();
  const [isfvrt, setIsFvrt] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [movie_details, setMovieDetails] = useState({});
  const [cast, setCast] = React.useState([]);
  const [similarMovies, setSimilarMovies] = React.useState([]);
  const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

  const { params: item } = useRoute();

  useEffect(() => {
    console.log("Item received from route params:", item);
    setLoading(true);
    fetchData(item.id);
  }, [item]);

  const { user } = useAuth();

if (!user) {
  console.error("User is not authenticated");
  return;
}


  const fetchData = async (id) => {
    setLoading(true);
    try {
      const [movie_credits, movie_details, similarMovies] = await Promise.all([
        fetchMovieCredits(id),
        fetchMovieDetails(id),
        fetchMovieSimilar(id),
      ]);

      if (movie_credits && movie_details && similarMovies) {
        
        setCast(movie_credits.cast || []);
        setMovieDetails(movie_details);
        setSimilarMovies(similarMovies.results || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = async (movie) => {
    if (!movie || !movie.id) {
      console.error("Movie object or movie id is undefined");
      return;
    }
  
    try {
      const userId = user.uid; // Ensure user is authenticated
      console.log("User ID:", userId);
      const movieRef = doc(collection(db, 'favorites'), movie.id.toString());
      await setDoc(movieRef, {
        userId: userId,
        ...movie // Store the full movie object (or any data you need)
      });
  
      console.log("Movie added to favorites successfully!");
      

    } catch (error) {
      console.error("Error saving movie to favorites:", error);
    }
  };
  
  const handleFavorite = (movie) => {
    setIsFvrt(!isfvrt);
    if (!isfvrt) {
      saveToFavorites(movie);
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={()=>handleFavorite(movie_details)} style={styles.fvrtbutton}>
        <Text style={styles.fvrt}>Add to Favorites</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path || ''}`,
          }}
          style={{ width: '90%', height: 400, borderRadius: 20 }}
          onError={(e) => console.log("Image loading error:", e.nativeEvent.error)}
        />
        <Text style={styles.movieTitle}>
          {item.title ? item.title : 'Title Not Available'}
        </Text>
        <Text style={styles.realese_genre}>
          {item.release_date ? `Released on: ${item.release_date}` : 'Release Date Not Available'}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {item.genres && Array.isArray(item.genres) && item.genres.length > 0 ? (
            item.genres.map((genre) => <Text key={genre.id} style={styles.genre}>{genre.name}</Text>)
          ) : (
            <Text>No genres available</Text>
          )}
        </View>
        <Text style={styles.description}>
          {item.overview ? item.overview : 'No description available for this movie.'}
        </Text>
      </View>

      {/* Cast Section */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similar Movies Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Similar Movies</Text>
        {similarMovies.length > 0 ? (
          <MovieList data={similarMovies} />
        ) : (
          <Text style={styles.noDataText}>No similar movies available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },

  fvrtbutton: {
    backgroundColor: '#f9c74f',
    
    borderRadius: 10,
    shadowColor: '#000', // Added shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
    width: '40%',
    height: 30,
    left: 10,
    marginVertical: 10,
  },


  realese_genre: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#555',
  },
  genre: {
    left: 20,
    marginLeft: 50,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  fvrt: {
    alignSelf: 'flex-end',
    right: 20,
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
});

export default MovieScreen;
