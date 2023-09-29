'use client';

import React, { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slice/authSlice';
import { useRouter } from 'next/navigation';

function Register() {
  const [name, setName] = useState('Gautam');
  const [email, setEmail] = useState('gautam@gg.com');
  const [password, setPassword] = useState('hello@1234');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // dispatch(login({ id: 0, name: name, email }));

    router.push('/');
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="my-24 mx-auto w-fit px-10 py-16 bg-gray-900"
    >
      <Typography variant="h2" color="white">
        Sign Up
      </Typography>

      <Typography color="white" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>

      <form
        onSubmit={handleRegister}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            color="white"
            type="name"
            name="name"
            size="lg"
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            color="white"
            type="email"
            name="email"
            size="lg"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            color="white"
            name="password"
            type="password"
            size="lg"
            label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Checkbox
          label={
            <Typography
              variant="small"
              color="white"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-300"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button type="submit" className="mt-6" color="white" fullWidth>
          Register
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-white">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Register;
