'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

async function getUser(id) {
  const res = await fetch(`${process.env.URL}/api/user/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  useEffect(() => {
    getUser(6).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <main>
      <h1>Profile</h1>
    </main>
  );
}
