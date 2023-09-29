import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request, res) {
  const { name, email, password } = await request.json();

  const passwordHash = await hash(password, 10);
  const newUser = await createUser(name, email, passwordHash);

  if (newUser.success !== true) {
    return NextResponse.error(new Error('Failed to create user'));
  }

  // Generate a JWT token for the user
  const token = generateToken(email);

  cookies().set('Set-Cookie', `${token}`, { secure: true });

  // Return a response with the user data and the token cookie
  return NextResponse.json(newUser);
}

async function createUser(name, email, passwordHash) {
  // Create a new user in the database
  const res = await fetch(`https://noisy-aqua.cmd.outerbase.io/register2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      email,
      password_hash: passwordHash,
    }),
  });

  const data = await res.json();
  return data;
}

function generateToken(userId) {
  const payload = { sub: userId };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '30d' });
  return token;
}
