import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request, { params }) {
  const { email, password } = await request.json();

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.error({
      status: 401,
      message: 'Unauthorized',
    });
  }

  // Check if the password is correct
  const passwordMatch = await compare(password, user.password_hash);

  if (!passwordMatch) {
    return NextResponse.error({
      status: 401,
      message: 'Unauthorized',
    });
  }

  // Generate a JWT token for the user
  const token = generateToken(user.email);

  // Set the token as a cookie
  cookies().set('Set-Cookie', `${token}`, { secure: true });

  return NextResponse.json(user);
}

async function getUserByEmail(email) {
  // Get the user with the specified email from the database
  const res = await fetch(`https://noisy-aqua.cmd.outerbase.io/login2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  const user = await res.json();

  return user.response.items[0];
}

function generateToken(userId) {
  // Generate a JWT token for the user
  const payload = { sub: userId };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '30d' });
  return token;
}
