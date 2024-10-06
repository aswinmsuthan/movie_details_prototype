"use client"; // Add this at the top of the file
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return (
      <Link href={href} className={`nav-link relative ${isActive ? 'text-white' : 'text-gray-300'}`}>
        {children}
        {isActive && <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>}
      </Link>
    );
  };

  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-red-500 text-xl font-bold font-poppins">MovieLore</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category/movies">Movies</NavLink>
            <NavLink href="/category/tvshows">TV Shows</NavLink>
            <button className="nav-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="nav-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}