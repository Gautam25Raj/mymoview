'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getGenres } from '@/redux/slice/homeSlice';

async function getMovieGenres() {
  const res = await fetch(`${process.env.URL}/api/movie/genres`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getTvshowsGenres() {
  const res = await fetch(`${process.env.URL}/api/tvshow/genres`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Genres = ({ ids }) => {
  const dispatch = useDispatch();
  // const [genres, setGenres] = useState({});
  const { genres } = useSelector((state) => state.home);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allGenres = [];

  //     const movieGenres = await getMovieGenres();
  //     const tvshowsGenres = await getTvshowsGenres();
  //     [movieGenres, tvshowsGenres].map((genres) => {
  //       genres.genres.map((genre) => {
  //         allGenres[genre.id] = genre;
  //       });
  //     });
  //     dispatch(getGenres(allGenres));
  //     setGenres(allGenres);
  //   };

  //   fetchData();
  // }, [dispatch]);

  return (
    genres && (
      <div className="flex max-w-[210px] overflow-hidden mb-2">
        {ids.map((id) => {
          return (
            <h4
              key={id}
              className="text-sm text-gray-600 mr-2 bg-white px-1 py-0.5 rounded-sm whitespace-nowrap"
            >
              {genres[id]?.name}
            </h4>
          );
        })}
      </div>
    )
  );
};

export default Genres;
