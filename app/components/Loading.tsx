import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f9c74f" /> 
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background for a cinematic feel
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});

export default Loading;