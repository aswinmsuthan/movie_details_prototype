"use client"
// import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
//import { useRouter } from 'next/navigation';
import Card from '../../../components/ImageCard';
import Link from 'next/link';
import { decode } from 'punycode';
const API_KEY = '890f40c2acdc495344c2ef6e157c3786'
//fetching group and type of media from api
const fetchGroupData = async (type: string, group: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${group}?api_key=${API_KEY}`);
  const data = await response.json();
  const movies = data.results.map((item: any) => ({
    id: item.id,
    imgSrc: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    altText: item.title,
    type: item.type
  }));
  return movies;
}

export default function GroupPage({ params }: { params: { groups: string } }) {
  // const params = useParams();
  const mediaGroup = params.groups;

  //const router = useRouter();

  const [moviesPopular, setMoviesPopular] = useState<any>([]);
  const [moviesOnTheatre, setMoviesOnTheare] = useState<any>([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState<any>([]);
  const [moviesTopRated, setMoviesTopRated] = useState<any>([]);
  //useState for tvshows
  const [tvPopular, setTvPopular] = useState<any>([]);
  const [tvStreaming, setStreaming] = useState<any>([]);
  const [tvTopRated, setTvTopRated] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const decodedGroup = decodeURIComponent(mediaGroup as string);
  let itemsToDisplay;

  switch (mediaGroup) {
    case `${encodeURIComponent('Popular Movies')}`:
      itemsToDisplay = moviesPopular;
      itemsToDisplay.type = 'movie';
      break;
    case `${encodeURIComponent('On Theaters')}`:
      itemsToDisplay = moviesOnTheatre;
      itemsToDisplay.type = 'movie';
      break;
    case `${encodeURIComponent('Upcoming Movies')}`:
      itemsToDisplay = moviesUpcoming;
      itemsToDisplay.type = 'movie';
      break;
    case `${encodeURIComponent('Top Rated')}`:
      itemsToDisplay = moviesTopRated;
      itemsToDisplay.type = 'movie';
      break;
    case `${encodeURIComponent('Popular Shows')}`:
      itemsToDisplay = tvPopular;
      itemsToDisplay.type = 'tv';
      break;
    case `${encodeURIComponent('Now Streaming')}`:
      itemsToDisplay = tvStreaming;
      itemsToDisplay.type = 'tv';
      break;
    case `${encodeURIComponent('Top Rated Shows')}`:
      itemsToDisplay = tvTopRated;
      itemsToDisplay.type = 'tv';
      break;
    default:
      itemsToDisplay = []; // Fallback to an empty array or handle as needed
  }


  //api


  useEffect(() => {
    const fetchData = async () => {
      const [popularMov, onTheatre, upcoming, topRated, popularTv, streaming, topratedTV] = await Promise.all([
        fetchGroupData('movie','popular'),
        fetchGroupData('movie','now_playing'),
        fetchGroupData('movie','upcoming'),
        fetchGroupData('movie','top_rated'),
        fetchGroupData('tv','popular'),
        fetchGroupData('tv','on_the_air'),
        fetchGroupData('tv','top_rated'),
      ]);
      setMoviesPopular(popularMov);
      setMoviesOnTheare(onTheatre);
      setMoviesUpcoming(upcoming);
      setMoviesTopRated(topRated);
      setTvPopular(popularTv);
      setStreaming(streaming);
      setTvTopRated(topratedTV);
    };

    fetchData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-24 py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">{decodedGroup}</h1>
      {/* <h1 className="text-2xl font-bold mb-6 text-center">123</h1> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {
          itemsToDisplay.map((item: any) => (
            <Card
              key={item.id}
              id={item.id}
              imgSrc={item.imgSrc}
              altText={item.altText}
              type={itemsToDisplay.type}
            />
          ))
        }
      </div>
    </div>
  );
}