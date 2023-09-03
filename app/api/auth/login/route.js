import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;

  const { email, password } = await request.json();

  const res = await fetch(
    `https://cloud.syncloop.com/tenant/1693597273751/packages.MyMoView.adapter.APIs.getAPI.getUserByEmail.main?email=${email}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const user = await res.json();

  if (user.response.password !== password)
    return NextResponse.error({
      status: 401,
      message: 'Unauthorized',
    });

  return NextResponse.json({
    user: {
      id: user.response.id,
      email: user.response.email,
      name: user.response.name,
    },
  });
}
