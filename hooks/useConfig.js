// 'use client';

import { useState, useEffect } from 'react';

const useConfig = () => {
  const [configuration, setConfiguration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    console.log(process.env.URL);
    const apiUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConfiguration(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { configuration, loading, error };
};

export default useConfig;
