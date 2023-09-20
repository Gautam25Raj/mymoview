import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;
  const apiKey = process.env.API_KEY;
  const { type, id } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/images?apiKey=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
