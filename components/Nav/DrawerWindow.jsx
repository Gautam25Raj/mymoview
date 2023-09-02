'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Drawer, Typography, IconButton } from '@material-tailwind/react';

const DrawerWindow = ({ open, closeDrawer }) => {
  const router = useRouter();

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <Drawer
      placement="top"
      open={open}
      onClose={closeDrawer}
      className="p-4 bg-black"
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h3" color="white">
          Search Movies or TV Shows
        </Typography>
        <IconButton variant="text" color="white" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex items-center w-full bg-white rounded-md overflow-hidden pl-3">
        <MagnifyingGlassIcon className="w-6 h-6 mr-2 md:w-8 md:h-8 text-black" />

        <input
          type="text"
          placeholder="Search movies or tv shows...."
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          className="w-11/12 h-12 bg-white outline-none pl-2 pr-4 text-md md:h-14 md:text-xl md:pl-3 md:pr-7 text-black"
        />

        <button
          onClick={handleSearchClick}
          className="w-24 h-12 bg-gray-700 text-white outline-none border-none rounded-r-md cursor-pointer md:w-36 md:h-14 md:text-lg"
        >
          Search
        </button>
      </div>
    </Drawer>
  );
};

export default DrawerWindow;
