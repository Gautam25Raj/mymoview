'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Carousel from '@/components/Carousel';

async function getSimilar(type, id) {
  const res = await fetch(
    `${process.env.URL}/api/details/${type}/${id}/similars`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Similar = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const { mediaType, id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getSimilar(mediaType, id);
      setData(data);
      setLoading(false);
    };
    getData();
  }, [id, mediaType]);

  return (
    <section className="relative mb-16 px-4">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl text-white">Similar {mediaType}</h3>
      </div>

      <Carousel data={data?.results} loading={loading} type={mediaType} />
    </section>
  );
};

export default Similar;
