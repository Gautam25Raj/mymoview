import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const bearerToken = process.env.BEARER_TOKEN;
  const userId = params.userId;

  const res = await fetch(
    `https://cloud.syncloop.com/tenant/1693597273751/packages.MyMoView.adapter.APIs.getAPI.getWatchLater.main?user_id=${userId}`,
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
