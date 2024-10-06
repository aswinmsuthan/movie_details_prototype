"use client"
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface MediaDetails {
  id: string;
  title: string;
  name:string
  overview: string;
  poster_path: string; // Updated to match API response
  backdrop_path: string; // Updated to match API response
  release_date: string; // Updated to match API response
  vote_average: number; // Updated to match API response
  genres: { id: number; name: string }[]; // Updated to match API response
  media_type: string; // Updated to match API response
  runtime: string;
  original_language: string;
  adult: boolean;
}

// Updated the MediaDetails interface to match the structure of the API response, including properties like poster_path, backdrop_path, release_date, vote_average, and genres.
// Modified the API fetch logic to correctly set the details based on the API response.
// Used the correct image URLs for the poster and backdrop images.
// Implemented error handling and loading states.
// Removed any unused or commented-out code for clarity and maintainability.

const MediaDetailPage = ({ params }: { params: { id: string; type: string } }) => { // Added type to params
  const { id, type } = params; // Destructure type from params
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=890f40c2acdc495344c2ef6e157c3786`); // Use type directly
          if (!response.ok) throw new Error('Failed to fetch details');
          const data: MediaDetails = await response.json();
          setDetails(data);
        } catch (err) {
          console.error(err);
          setError('Failed to load details'); // Set error state
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [id, type]); // Added type to dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!details) return notFound(); // Handle case where details are not found

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[90vh]">
      <Image src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt={details.title} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-9 items-center w-full max-w-5xl px-4 md:-ml-8">
          <div className="md:w-1/3">
            <Image src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} width={300} height={450} className="rounded-lg shadow-2xl" />
          </div>
          <div className="md:w-2/3 md:text-left">
            <h1 className="text-5xl font-bold text-white font-poppins">{type=='movie'?details.title:details.name}</h1>
            <p className="text-gray-300 mb-2">
              <strong>Year:</strong> {new Date(details.release_date).getFullYear()} &bull; 
              <strong>Duration:</strong> {details.runtime} min &bull; 
              <strong>Language:</strong> {details.original_language.toUpperCase()} &bull; 
              <strong>Adult:</strong> {details.adult ? 'Yes' : 'No'}
            </p>
            <p className="mb-2 text-gray-300"><strong>Rating:</strong> {details.vote_average}/10</p>
            <p className="text-gray-300 mb-4">{details.overview}</p>
            <div className="mb-4">
              <strong className="text-gray-300">Genres: </strong>
              {details.genres.map((genre) => (
                <span key={genre.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="mb-2 text-gray-300"><strong>Type:</strong> {type == 'movie' ? 'Movie' : 'TV Show'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaDetailPage;