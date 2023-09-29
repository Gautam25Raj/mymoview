'use client';

import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/redux/slice/authSlice';
import { useRouter } from 'next/navigation';

function Register() {
  const [email, setEmail] = useState('gautam18@gg.com');
  const [password, setPassword] = useState('hello@1234');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('Something went wrong.');
        throw new Error('Login failed');
      }

      const currentUser = await response.json();

      dispatch(
        login({ id: currentUser.user_id, name: currentUser.name, email })
      );

      router.push('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="my-24 mx-auto w-fit px-10 py-16 bg-gray-900"
    >
      <Typography variant="h2" color="white">
        Login
      </Typography>

      <Typography color="white" className="mt-1 font-normal">
        Enter your details to Login.
      </Typography>

      <form
        onSubmit={handleLogin}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        {error && (
          <p className="text-red-700 text-xl text-center mb-8">{error}</p>
        )}
        <div className="mb-4 flex flex-col gap-6">
          <Input
            color="white"
            type="email"
            size="lg"
            label="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            color="white"
            type="password"
            size="lg"
            label="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="mt-6" color="white" fullWidth>
          Login
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Creating a New Account?{' '}
          <Link href="/register" className="font-medium text-white">
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Register;
