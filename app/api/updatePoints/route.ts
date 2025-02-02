import { NextRequest, NextResponse } from 'next/server';

let users: User[] = [];

export async function POST(req: NextRequest) {
  const { userId, points } = await req.json();
  users = users.map((user) =>
    user.id === userId ? { ...user, points } : user
  );
  return new NextResponse(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}