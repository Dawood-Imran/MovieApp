import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { db } from '../Firebase';
import { useAuth } from '../app/context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from './components/MovieCard';

import { useNavigation } from '@react-navigation/native';

export default function FavouriteMovies() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  // Fetch favorite movies from Firestore
  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      // Query to fetch favorites for the logged-in user
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', user.uid)); // Filter by userId

      const querySnapshot = await getDocs(q);
      const favoriteMovies = [];
      
      querySnapshot.forEach((doc) => {
        favoriteMovies.push(doc.data());
      });

      setFavorites(favoriteMovies);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    
    console.log('Movie pressed:', movie);
    navigation.navigate('MovieScreen', { params: movie });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#1c1c1c' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f9c74f' }}>
        My Favorites
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f9c74f" style={{ marginTop: 20 }} />
      ) : (
        <MovieCard movie={favorites} />
      )}
    </SafeAreaView>
  );
}
