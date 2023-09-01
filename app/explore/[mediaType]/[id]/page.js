'use client';

import { useEffect } from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import { getApiConfig } from '@/redux/slice/homeSlice';

import useConfig from '@/hooks/useConfig';

import Login from '@/components/auth/Login';
import Footer from '@/components/Footer';

// async function getData() {
//   const res = await fetch(`${process.env.URL}/api`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// async function getTopMovies() {
//   const res = await fetch(`${process.env.URL}/api/movie/getTopMovies`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function Home() {
  // const data = await getTopMovies();
  const dispatch = useDispatch();

  const { configuration, loading, error } = useConfig();

  useEffect(() => {
    if (configuration) {
      dispatch(getApiConfig(configuration));
    }
  }, [configuration, dispatch]);

  return (
    <main>
      Hello
      <Login />
      <Footer />
    </main>
  );
}
