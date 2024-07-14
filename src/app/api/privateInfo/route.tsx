import { NextResponse } from 'next/server';

const codes = [
  'supersecretcode', // todo: add code per asked user
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessCode = searchParams.get('accessCode');

  if (!accessCode || !codes.some((code) => code === accessCode)) {
    return new NextResponse('Not authorized', { status: 401 });
  }

  return new NextResponse('Authorized', {
    status: 200,
    headers: {
      'Set-Cookie': `accessCode=${accessCode}; Path=/; HttpOnly; Secure; SameSite=Strict;`,
    },
  });
}
