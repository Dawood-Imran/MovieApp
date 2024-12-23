import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const Cast = ({ cast, navigation }) => {
  const renderItem = ({ item }) => {
    const truncateName = (name) => (name.length > 10 ? `${name.substring(0, 10)}...` : name);

    const handleActorPress = (actorData) => {
      console.log('Navigating to ActorScreen with:', actorData);
      navigation.navigate('ActorScreen', { actor: actorData });
    };

    return (
      <TouchableOpacity style={styles.castContainer} onPress={() => handleActorPress(item)}>
        <Image
          source={{
            uri: item.profile_path
              ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
              : 'https://via.placeholder.com/80', // Fallback image
          }}
          style={styles.castImage}
        />
        <Text style={styles.characterName}>{truncateName(item.character || 'Unknown')}</Text>
        <Text style={styles.actorName}>{truncateName(item.name || 'Unknown')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>
      <FlatList
        data={cast}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9c74f', // Gold color for titles
    marginBottom: 10,
  },
  castContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  castImage: {
    marginRight: 5,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White color for character names
    textAlign: 'center',
  },
  actorName: {
    fontSize: 12,
    color: '#aaa', // Lighter color for actor names
    textAlign: 'center',
  },
});

export default Cast;
