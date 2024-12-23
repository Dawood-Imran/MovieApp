import axios from "axios";


const API_KEY = '6c3c25c96ed1c0ebcff0d30806e1534d'
const BASE_URL = 'https://api.themoviedb.org/3'


const trendingMovies = `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`;
const upcomingMovies = `${BASE_URL}/movie/upcoming?language=en-US&api_key=${API_KEY}`;
const popularMovies = `${BASE_URL}/movie/popular?language=en-US&api_key=${API_KEY}`;
const top_rated = `${BASE_URL}/movie/top_rated?language=en-US&api_key=${API_KEY}`;
const movieDetails = id =>`${BASE_URL}/movie/${id}?language=en-US&api_key=${API_KEY}`
const movieCredits = id =>`${BASE_URL}/movie/${id}/credits?language=en-US&api_key=${API_KEY}`
const movieSimilar = id =>`${BASE_URL}/movie/${id}/similar?language=en-US&api_key=${API_KEY}`

const personDetails = (id) => `${BASE_URL}/person/${id}?language=en-US&api_key=${API_KEY}`;
const personMovieCredits = (id) => `${BASE_URL}/person/${id}/movie_credits?language=en-US&api_key=${API_KEY}`;




const fetchMovies = async (endpoint, totalResults = 100) => {
    const results = [];
    let page = 1;
    const resultsPerPage = 20; // TMDB API returns 20 results per page
  
    while (results.length < totalResults) {
      const response = await axios.get(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      results.push(...response.data.results);
  
      if (response.data.results.length < resultsPerPage) {
        // Break if fewer results are returned than a full page
        break;
      }
  
      page++;
    }
  
    return results.slice(0, totalResults); // Limit to requested totalResults
  };
  
  export const fetchTrendingMovies = async () =>
    fetchMovies("trending/movie/day", 100);
  
  export const fetchUpcomingMovies = async () =>
    fetchMovies("movie/upcoming", 100);
  
  export const fetchTopRatedMovies = async () =>
    fetchMovies("movie/top_rated", 100);



  const fetchMovieData = async (id, type) => {
    let url = '';

    switch (type) {
        case 'details':
            url = movieDetails(id);
            break;
        case 'credits':
            url = movieCredits(id);
            break;
        case 'similar':
            url = movieSimilar(id);
            break;
        case 'personDetails':
            url = personDetails(id);
            break;
        case 'personMovieCredits':
            url = personMovieCredits(id);
            break;
        default:
            console.error('Invalid type');
            return null;
    }

    try {
        const response = await axios.get(url);
        if (response.status === 404) {
            console.error('Data not found for this ID');
            return null;
        }
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        return null;
    }
};

  
  // Now you can use fetchMovieData with the appropriate type for each fetch
  export const fetchMovieDetails = async (id) => {
    return fetchMovieData(id, 'details');
  };
  
  export const fetchMovieCredits = async (id) => {
    return fetchMovieData(id, 'credits');
  };
  
  export const fetchMovieSimilar = async (id) => {
    return fetchMovieData(id, 'similar');
  };

  export const fetchPersonDetails = async (id) => {
    return fetchMovieData(id, 'personDetails');
  };
  
  export const fetchPersonMovieCredits = async (id) => {
    return fetchMovieData(id, 'personMovieCredits');
  };


        


