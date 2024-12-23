import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Loading from './components/Loading';
import MovieList from './components/MovieList'; // Import the MovieList component
import { useRoute } from '@react-navigation/native';
import { fetchPersonDetails, fetchPersonMovieCredits } from './api/moviedb';

const ActorScreen = () => {
    const route = useRoute();
    const { actor } = route.params;
    const [actorDetails, setActorDetails] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!actor) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Actor data not available.</Text>
            </View>
        );
    }

    // Fetch actor details and movies
    useEffect(() => {
        fetchActorDetails();
    }, [actor]);

    const fetchActorDetails = async () => {
        setLoading(true);
        try {
            // Fetch the actor details
            const actorData = await fetchPersonDetails(actor.id);
            console.log(actorData);
            setActorDetails(actorData);

            // Fetch the actor's movie credits (films they've worked in)
            const creditsData = await fetchPersonMovieCredits(actor.id);
            setMovies(creditsData.cast || []); // Set the movie list, if available

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${actorDetails?.profile_path}` }}
                style={styles.actorImage}
            />
            <Text style={styles.actorName}>{actorDetails?.name}</Text>

            {/* Details Section */}
            <View style={styles.detailsSection}>
                <Text style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Gender: </Text>
                    <Text style={styles.detailValue}>{actorDetails?.gender === 1 ? 'Female' : 'Male'}</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Birth Date: </Text>
                    <Text style={styles.detailValue}>
                        {actorDetails?.birth_date || 'Not Available'}
                    </Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Known For: </Text>
                    <Text style={styles.detailValue}>{actorDetails?.known_for_department}</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Popularity: </Text>
                    <Text style={styles.detailValue}>{actorDetails?.popularity}</Text>
                </Text>
            </View>

            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>
                {actorDetails?.biography ||
                    'Biography information not available for this actor.'}
            </Text>

            <Text style={styles.moviesTitle}>Movies</Text>
            {/* Render the list of movies */}
            <MovieList data={movies} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    errorText: {
        fontSize: 18,
        color: '#f9c74f',
        textAlign: 'center',
        marginTop: 20,
    },
    actorImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        marginBottom: 16,
    },
    actorName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f9c74f',
        textAlign: 'center',
        marginBottom: 16,
    },
    detailsSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 16,
        color: '#f9c74f',
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 16,
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#444',
        marginVertical: 8,
    },
    biographyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f9c74f',
        marginTop: 20,
        marginBottom: 10,
    },
    biographyText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'justify',
        lineHeight: 24,
    },
    moviesTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f9c74f',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default ActorScreen;
