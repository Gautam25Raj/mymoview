'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfig, getGenres } from '@/redux/slice/homeSlice';
import { login } from '@/redux/slice/authSlice';

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

async function checkUser() {
  const res = await fetch(`${process.env.URL}/api/auth/check`);

  if (!res.ok) {
    console.log('No user found');
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
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConfig();
      dispatch(getApiConfig(data));

      const { user_id, username, email } = await checkUser();

      if (username && email) {
        dispatch(login({ id: user_id, name: username, email }));
      }

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
  }, [isAuth, dispatch]);

  return (
    <>
      <HomeSection />
    </>
  );
}
