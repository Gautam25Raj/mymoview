'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import DetailsHeader from './DetailsHeader';
import Cast from './Cast';
import Similar from './Similar';
import Recommended from './Recommended';
import VideosList from './VideosList';
import ImagesList from './ImagesList';

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
      console.log(credits);
      setLoading(true);
    };
    getData();
  }, [id, mediaType]);

  return (
    <>
      <DetailsHeader credits={credits?.crew} />
      <Cast data={credits?.cast} loading={!loading} />
      <ImagesList />
      <VideosList />
      <Recommended />
      <Similar />
    </>
  );
};

export default Details;
