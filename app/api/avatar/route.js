import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const res = await fetch(`https://noisy-aqua.cmd.outerbase.io/gewNewAvatar`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}
