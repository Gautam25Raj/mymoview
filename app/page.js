'use client';

import { useEffect, useState } from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import { getApiConfig } from '@/redux/slice/homeSlice';

import Hero from '@/components/layout/home/Hero';

async function getConfig() {
  const res = await fetch(`${process.env.URL}/api/config`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  // const data = await getTopMovies();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConfig();

      dispatch(getApiConfig(data));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero />
    </>
  );
}
