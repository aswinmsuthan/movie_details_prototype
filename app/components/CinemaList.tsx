"use client"
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Card from './ImageCard';
import Link from 'next/link';

interface Movie {
  id: string;  // Add this line
  imgSrc: string;
  altText: string;
  // mediaType: 'movie' | 'tv';
}

interface MoviesProps {
  title: string;
  group: string;  // Add this line
  movies: Movie[];
  href: string;
  type: 'movie' | 'tv'
}

const CinemaList: React.FC<MoviesProps> = ({ title, group, movies, href, type }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClick = (movie: Movie) => {
    // Handle the click event, e.g., navigate to movie details page
    console.log('Clicked movie:', movie.altText);
    // You can add navigation logic here
  };

  const handleViewAll = () => {
    router.push(`/category/group/${encodeURIComponent(group)}`);
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={href}>
        <button
          className="text-white py-2 px-4 rounded"
        >
          View All
        </button>
        </Link>
      </div>
      <div className="relative">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 horizontal-scroll-container"
          ref={scrollContainerRef}
        >
          {movies.map((movie) => (
            
            <Card
              id={movie.id}
              imgSrc={movie.imgSrc}
              altText={movie.altText}
              type={type}
            />
           
          ))}
          
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default CinemaList;