import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { userId } = params;

  const res = await fetch(
    `https://noisy-aqua.cmd.outerbase.io/watchLaterTv?user_id=${userId}`,
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

  try {
    await fetch(`https://noisy-aqua.cmd.outerbase.io/postWlTv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        tmdb_tv_id: tmdbId,
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

  try {
    await fetch(
      `https://noisy-aqua.cmd.outerbase.io/delWlTv?user_id=${userId}&tmdb_tv_id=${tmdbId}`,
      {
        method: 'DELETE',
      }
    );
  } catch (e) {
    console.log('error: ', e);
  }

  return NextResponse.json('Remove from favorites');
}
