import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const apiKey = process.env.API_KEY;
  const time = params.time;

  const res = await fetch(
    `https://noisy-aqua.cmd.outerbase.io/trending?time=${time}&apiKey=${apiKey}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
