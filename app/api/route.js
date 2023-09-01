import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;

  const res = await fetch(
    'https://cloud.syncloop.com/tenant/1693563382145/packages.hi.ho.check.main',
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      params,
    }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
