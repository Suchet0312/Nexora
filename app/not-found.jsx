import React from 'react';
import Link from 'next/link'
 // or 'next/link' if using Next.js

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center px-6">
        {/* Large 404 Text */}
        <h1 className="text-9xl font-extrabold text-nexora drop-shadow-lg">404</h1>
        
        {/* Subtitle */}
        <p className="text-2xl mt-4 text-gray-300">Oops! Page Not Found</p>
        <p className="text-gray-500 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-nexora bg-amber-600 text-black font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
