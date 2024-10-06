import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">MovieLore</h3>
            <p>Where movies come to life</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/movies" className="hover:text-gray-300">Movies</Link></li>
              <li><Link href="/tv-shows" className="hover:text-gray-300">TV Shows</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p>Email: info@movielore.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} MovieLore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;