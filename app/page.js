'use client';

import { useEffect, useState } from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import { getApiConfig, getGenres } from '@/redux/slice/homeSlice';

import HomeSection from '@/components/layout/home/Home';

async function getConfig() {
  const res = await fetch(`${process.env.URL}/api/config`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

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

export default function Home() {
  // const data = await getTopMovies();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConfig();
      dispatch(getApiConfig(data));

      const allGenres = [];

      const movieGenres = await getMovieGenres();
      const tvshowsGenres = await getTvshowsGenres();
      [movieGenres, tvshowsGenres].map((genres) => {
        genres.genres.map((genre) => {
          allGenres[genre.id] = genre;
        });
      });
      dispatch(getGenres(allGenres));
    };

    fetchData();
  }, []);

  return (
    <>
      <HomeSection />
    </>
  );
}
