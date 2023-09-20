import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;

  const { name, email, password } = await request.json();

  const res = await fetch(`https://noisy-aqua.cmd.outerbase.io/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      email,
      password_hash: password,
    }),
  });
  const data = await res.json();

  return NextResponse.json(data);
}
