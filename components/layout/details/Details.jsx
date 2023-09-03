'use client';

import DetailsHeader from './DetailsHeader';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cast from './Cast';

async function getCreditsDetails(type, id) {
  const res = await fetch(
    `${process.env.URL}/api/details/${type}/${id}/credits`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Details = () => {
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getCreditsDetails(mediaType, id);
      setCredits(data);
      setLoading(true);
    };
    getData();
  }, [id, mediaType]);

  return (
    loading && (
      <>
        <DetailsHeader credits={credits.crew} />
        <Cast data={credits.cast} loading={!loading} />
      </>
    )
  );
};

export default Details;
