"use client"
import React from 'react';
import CinemaList from '../../components/CinemaList';
import BannerMovTV from '../../components/BannerMovTV';
import { useState, useEffect } from 'react';
// const moviesData1 = [
//   {
//     id: '1',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     altText: "Movie 1"
//   },
//   {
//     id: '2',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
//     altText: "Movie 2"
//   },
//   {
//     id: '3',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
//     altText: "Movie 3"
//   },
//   // Add more movie objects as needed
// ];

// const moviesData2 = [
//   {
//     id: '1',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
//     altText: "Movie 4"
//   },
//   {
//     id: '2',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     altText: "Movie 5"
//   },
//   // Add more movie objects as needed
// ];

// const tvShowsData1 = [
//   {
//     id: '1',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     altText: "TV Show 1"
//   },
//   {
//     id: '2',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
//     altText: "TV Show 2"
//   },
//   // Add more TV show objects as needed
// ];

// const tvShowsData2 = [
//   {
//     id: '1',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
//     altText: "TV Show 3"
//   },
//   {
//     id: '2',
//     imgSrc: "https://media.themoviedb.org/t/p/w220_and_h330_face/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     altText: "TV Show 4"
//   },
//   // Add more TV show objects as needed
// ];
const API_KEY = '890f40c2acdc495344c2ef6e157c3786'
const fetchGroupData = async (type: string, group: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${group}?api_key=${API_KEY}`);
  const data = await response.json();
  const movies = data.results.map((item: any) => ({
    id: item.id,
    imgSrc: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    altText: item.title,
  }));
  return movies;
}


export default function CategoryPage({ params }: { params: { type: string } }) {
  const isMovies = params.type === 'movies';
  const title = isMovies ? 'Movies' : 'TV Shows';
  //useState for movies
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesOnTheatre, setMoviesOnTheare] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);

  //useState for tvshows
  const [tvPopular, setTvPopular] = useState([]);
  const [tvStreaming, setStreaming] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const [popularMov, onTheatre, upcoming, topRated, popularTv, streaming, topratedTV] = await Promise.all([
        fetchGroupData('movie', 'popular'),
        fetchGroupData('movie', 'now_playing'),
        fetchGroupData('movie', 'upcoming'),
        fetchGroupData('movie', 'top_rated'),
        fetchGroupData('tv', 'popular'),
        fetchGroupData('tv', 'on_the_air'),
        fetchGroupData('tv', 'top_rated'),
      ]);
      setMoviesPopular(popularMov);
      setMoviesOnTheare(onTheatre);
      setMoviesUpcoming(upcoming);
      setMoviesTopRated(topRated);
      setTvPopular(popularTv);
      setStreaming(streaming);
      setTvTopRated(topratedTV);

    }
    fetchGroup();
  }, []);


  return (
    <div>

      {isMovies ? (
        <>
          <BannerMovTV title="Movies" description="Track, Discover, and Love Cinema" type='movie' />
          <CinemaList title="Popular Movies" group='Popular Movies' movies={moviesPopular}
            href={`/category/group/${encodeURIComponent('Popular Movies')}`}
            type='movie'
          />
          <CinemaList title="On Theaters" group='On Theaters' movies={moviesOnTheatre}
            href={`/category/group/${encodeURIComponent('On Theaters')}`} type='movie'/>
          <CinemaList title="Upcoming Movies" group='Upcoming Movies' movies={moviesUpcoming}
            href={`/category/group/${encodeURIComponent('Upcoming Movies')}`} type='movie'/>
          <CinemaList title="Top Rated" group='Top Rated' movies={moviesTopRated}
            href={`/category/group/${encodeURIComponent('Top Rated')}`} type='movie'/>

        </>
      ) : (
        <>
          <BannerMovTV title="TV Shows" description="Track, Discover, and Love Cinema" type='tv' />
          <CinemaList title="Popular Shows" group='Popular Shows' movies={tvPopular}
            href={`/category/group/${encodeURIComponent('Popular Shows')}`} 
            type='tv'/>
          <CinemaList title="Now Streaming" group='Now Streaming' movies={tvStreaming}
            href={`/category/group/${encodeURIComponent('Now Streaming')}`} type='tv'/>
          <CinemaList title="Top Rated" group='Top Rated' movies={tvTopRated} href={`/category/group/${encodeURIComponent('Top Rated Shows')}`} type='tv'/>
        </>
      )}
    </div>
  );
}