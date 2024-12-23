import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView , Image , Dimensions , TouchableWithoutFeedback , FlatList} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useState , useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchTrendingMovies, fetchTopRatedMovies , fetchUpcomingMovies } from '../api/moviedb';



export default function MoviesScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trendingMovies, upcomingMovies, topRatedMovies] = await Promise.all([
        fetchTrendingMovies(),
        fetchUpcomingMovies(),
        fetchTopRatedMovies(),
      ]);
  
    
      setTrending(trendingMovies);
      setUpcoming(upcomingMovies);
      setTopRated(topRatedMovies);

    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('FavouriteMovies')}>
          <Icon name="heart" size={20} color="white" />
          <Text style = {{marginLeft: 5}}>Go to Favorites</Text>
          </TouchableOpacity>
          <Text style={styles.moviesText}>Movies</Text>
        </View>

        {
          loading ? (
            <Loading />):(
                    
          <ScrollView

    
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >

      <Text style={styles.trendingText}>Trending</Text>
      <MovieCard movie={trending} />

      <Text style={styles.trendingText}>Upcoming</Text>

      <MovieList data={upcoming} />

      <Text style={styles.trendingText}>Top Rated</Text>

      <MovieList data={topRated} />

              </ScrollView>
            )
        }

        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background for contrast
  },
  safeArea: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10, // Added padding for content alignment
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  moviesText: {
    fontSize: 24, // Increased size for better prominence
    fontWeight: 'bold',
    color: '#f9c74f', // Highlighted text color
    right: 50,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase', // Makes the text stand out
  },
  searchbutton: {
    backgroundColor: '#f9c74f',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000', // Added shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  trendingText: {
    marginTop: 20,
    fontSize: 22, // Slightly larger for section heading
    fontWeight: 'bold',
    left: 20,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f9c74f',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000', // Added shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    
    flexDirection: 'row',
    marginRight: 2
  },
  movieContainer: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
    backgroundColor: '#1c1c1c', // Dark background to match theme
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000', // Subtle shadow for movie cards
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden', // Ensures content stays inside rounded corners
    width: 120, // Fixed width for consistent layout
  },
  movieImage: {
    width: '100%', // Full width of the container
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 14, // Smaller size for better balance
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f9c74f', // Matches highlighted text color
    marginTop: 8,
  },
});

