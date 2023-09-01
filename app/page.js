'use client';

import Login from '@/components/auth/Login';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.auth.user.name);

  return (
    <main>
      Hello
      <Login />
    </main>
  );
}
