/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import useMovies from '@/hooks/useMovies';

const Hero = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { url } = useSelector((state) => state.home);
  const { getNowPlayingMovies } = useMovies();

  useEffect(() => {
    const getBackground = async () => {
      const data = await getNowPlayingMovies();
      const bg =
        url.images.secure_base_url +
        url.images.poster_sizes[url.images.poster_sizes.length - 1] +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      // const bg =
      //   url?.backdrop +
      //   data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

      setBackground(bg);
    };

    if (url) {
      getBackground();
    }
  }, []);

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
    <div className="w-full h-[450px] bg-black flex items-center relative md:h-[700px]">
      {background && (
        <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
          <Image
            src={background}
            layout="fill"
            objectFit="cover"
            alt=""
            className="object-cover"
          />
        </div>
      )}

      <div className="w-full h-60 absolute bottom-0 left-0 hero-bg"></div>

      <div className="flex flex-col items-center text-white relative text-center mx-auto">
        <span className="text-5xl font-bold mb-2 md:text-8xl md:mb-0">
          HOLA
        </span>
        <span className="text-lg mb-10 font-medium md:text-2xl">
          Your Cinematic Universe, Your Way: Manage, Discover, Enjoy!
        </span>
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search your movie or tv show...."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            className="w-11/12 h-12 bg-white outline-none rounded-l-md px-4 text-md md:h-14 md:text-xl md:px-7 text-black"
          />
          <button
            onClick={handleSearchClick}
            className="w-24 h-12 bg-black text-white outline-none border-none rounded-r-md cursor-pointer md:w-36 md:h-14 md:text-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
