import React from 'react';
import Link from 'next/link';

interface CardProps {
  id: string;
  imgSrc: string;
  altText: string;
  type: 'movie' | 'tv' ;
}

const Card: React.FC<CardProps> = ({ id, imgSrc, altText, type }) => {
  return (

    <div className="card cursor-pointer transition-transform duration-300 hover:scale-105">
      <Link key={id} type={type} href={`/details/${type}/${id}`}>
        <img id={id} src={imgSrc} alt={altText} className="w-full h-auto rounded-lg shadow-md object-contain" />
      </Link>

    </div>

  );
};

export default Card;