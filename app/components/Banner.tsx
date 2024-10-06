"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

// ===============image carousel============
export default function Banner() {
	const [bannerImages, setBannerImages] = useState<string[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const fetchBannerImages = async () => {
			const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=890f40c2acdc495344c2ef6e157c3786');
			const data = await response.json();
			const images = data.results.map((movie: any) => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
			setBannerImages(images);
		};

		fetchBannerImages();

		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => 
				prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, [bannerImages.length]);

	return (
		<div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh]">
			{bannerImages.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt={`Banner ${index + 1}`}
					layout="fill"
					objectFit="cover"
					priority={index === 0}
					className={`transition-opacity duration-1000 ${
						index === currentImageIndex ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			))}
			<div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
				<h1 className="text-white text-4xl font-bold mb-2">Welcome to MovieLore</h1>
				<p className="text-white text-xl font-sans">Track, Discover, and Love Cinema</p>
				<div className="mt-4 w-full max-w-md">
					<input
						type="text"
						placeholder="Search..."
						className="w-full px-4 py-2 rounded-full text-gray-900"
					/>
				</div>
			</div>
		</div>
	);
}