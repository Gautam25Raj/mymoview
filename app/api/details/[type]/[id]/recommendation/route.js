import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;
  const apiKey = process.env.API_KEY;
  const { type, id } = params;

  const res = await fetch(
    `https://cloud.syncloop.com/tenant/1693597273751/packages.MyMoView.tmdb.movies.movie.getRecommendations.main?apiKey=${apiKey}&id=${id}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data.response.jsonDoc);
}
