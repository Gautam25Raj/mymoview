'use client';

import { useState, useEffect } from 'react';
import Carousel from '../Carousel';

async function getDetails(type, id) {
  const res = await fetch(`${process.env.URL}/api/details/${type}/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ProfileCarousel = ({ items, type }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (items.length > 0) {
        try {
          const details = await Promise.all(
            items.map(async (item) => {
              const data = await getDetails(type, item.tmdb_id);
              return data;
            })
          );

          setDetails(details);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [items, type]);

  return (
    <Carousel data={details} loading={loading} type={type} noGenre={true} />
  );
};

export default ProfileCarousel;
