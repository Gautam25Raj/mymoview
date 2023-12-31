'use client';

import { useState, useEffect } from 'react';

import SwitchTabs from '../../carousel/SwitchTabs';
import Carousel from '@/components/Carousel';

async function getTopRated(type) {
  const res = await fetch(`${process.env.URL}/api/${type}/topRated`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const TopRated = () => {
  const [time, setTime] = useState('movie');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  const onSwichTab = (tab) => {
    setTime(tab.toLowerCase());
  };

  useEffect(() => {
    getTopRated(time)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [time]);

  return (
    <section className="relative mb-16 px-4">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl text-white">TopRated Movies and Shows</h3>

        <SwitchTabs data={['Movie', 'TvShow']} onSwichTab={onSwichTab} />
      </div>

      <Carousel data={data?.results} loading={loading} type={time} />
    </section>
  );
};

export default TopRated;
