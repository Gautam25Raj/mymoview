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

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
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
        Sign Up
      </Typography>

      <Typography color="white" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            color="white"
            type="name"
            size="lg"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            color="white"
            type="email"
            size="lg"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            color="white"
            type="password"
            size="lg"
            label="Password"
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
        <Button className="mt-6" color="white" fullWidth>
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
