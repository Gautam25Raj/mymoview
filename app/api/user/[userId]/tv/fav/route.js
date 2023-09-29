import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { userId } = params;

  const res = await fetch(
    `https://noisy-aqua.cmd.outerbase.io/getFavTv?user_id=${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data.response.items);
}

export async function POST(request, { params }) {
  const { userId, tmdbId } = await request.json();
  console.log('userId', userId);
  console.log('tmdbId', tmdbId);

  try {
    await fetch(`https://noisy-aqua.cmd.outerbase.io/postFavTv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        tmdb_movie_id: tmdbId,
      }),
    });
  } catch (e) {
    console.log('error: ', e);
  }

  return NextResponse.json('Saved to favorites');
}
