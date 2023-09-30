import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const apiKey = process.env.API_KEY;

  const res = await fetch(
    `https://noisy-aqua.cmd.outerbase.io/genreMovie?apiKey=${apiKey}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
