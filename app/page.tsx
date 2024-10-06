"use client"
import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import CinemaList from './components/CinemaList';
import Link from 'next/link';

const API_KEY = '890f40c2acdc495344c2ef6e157c3786'; // Store API key in a constant

const fetchPopularData = async (type: 'movie' | 'tv') => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.map((item: any) => ({
    id: item.id,
    imgSrc: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    altText: type === 'movie' ? item.title : item.name,
  }));
};

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [movies, shows] = await Promise.all([
        fetchPopularData('movie'),
        fetchPopularData('tv'),
      ]);
      setPopularMovies(movies);
      setPopularTVShows(shows);
    };

    fetchData();
  }, []);

  return (
    <main>
      <Banner />
      <CinemaList 
        title="Popular Movies" 
        group="Popular Movies"
        movies={popularMovies} 
        href={`/category/group/${encodeURIComponent('Popular Movies')}`}
        type='movie'
      />
    
      <CinemaList 
        title="Popular TV Shows" 
        group="Popular Tv Shows"
        movies={popularTVShows} 
        href={`/category/group/${encodeURIComponent('Popular Shows')}`}
        type='tv'
      />
    </main>
  );
}
