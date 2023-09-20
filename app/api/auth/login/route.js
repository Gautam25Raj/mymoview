import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;

  const { email, password } = await request.json();

  const res = await fetch(`https://noisy-aqua.cmd.outerbase.io/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  const user = await res.json();

  if (user.response.items[0].password_hash !== password)
    return NextResponse.error({
      status: 401,
      message: 'Unauthorized',
    });

  return NextResponse.json(user);
}
