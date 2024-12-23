import React from 'react';
import { StyleSheet, View, Image, Text , TouchableOpacity , FlatList} from 'react-native';


import { useNavigation } from '@react-navigation/native';


const MovieCard = ({ movie }) => {
 
   const navigation = useNavigation();
   const fallbackImage = 'https://via.placeholder.com/150';

   
   const handleClick = (item) => {
    console.log("Movie Card Clicked");
    navigation.navigate("MovieScreen", item);
  };

  const truncateTitle = (title) => (title.length > 14 ? `${title.substring(0, 14)}...` : title);
  return (

    <View style={styles.container}>
          <FlatList
            data={movie}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.movieItem} onPress={()=>handleClick(item)}>
  
  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` || fallbackImage }}
                
                style={styles.movieImage} />
                <Text style={styles.movieTitle}>{truncateTitle(item.title)}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true} // Displays items in a horizontal list
            showsHorizontalScrollIndicator={false}
          />
        </View>


  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  movieItem: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    elevation: 2, // Adds a shadow for better visuals
  },
  movieImage: {
    width: 150, 
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default MovieCard;
