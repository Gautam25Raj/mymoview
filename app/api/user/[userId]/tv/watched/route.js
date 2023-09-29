import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { userId } = params;

  const res = await fetch(
    `https://noisy-aqua.cmd.outerbase.io/watchedTv?user_id=${userId}`,
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
  const { userId, tmdbId, date_watched } = await request.json();
  console.log('userId: ', userId);
  console.log('tmdbId: ', tmdbId);

  try {
    await fetch(`https://noisy-aqua.cmd.outerbase.io/insertWatchedTv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        tmdb_tv_id: tmdbId,
        date_watched,
      }),
    });
  } catch (e) {
    console.log('error: ', e);
  }

  return NextResponse.json('Saved to favorites');
}

export async function DELETE(request, { params }) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get('userId');
  const tmdbId = searchParams.get('tmdbId');
  console.log('userId: ', userId);
  console.log('tmdbId: ', tmdbId);

  try {
    await fetch(
      `https://noisy-aqua.cmd.outerbase.io/delCurrentTv?user_id=${userId}&tmdb_tv_id=${tmdbId}`,
      {
        method: 'DELETE',
      }
    );
  } catch (e) {
    console.log('error: ', e);
  }

  return NextResponse.json('Remove from favorites');
}
