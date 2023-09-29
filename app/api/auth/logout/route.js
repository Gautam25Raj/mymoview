import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request, { params }) {
  cookies().delete('Set-Cookie');

  return NextResponse.json('Logged out');
}
