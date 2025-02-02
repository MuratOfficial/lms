import { NextRequest, NextResponse } from 'next/server';

let users: User[] = [];

export async function POST(req: NextRequest) {
  const { newName } = await req.json();
  const userId = req.headers.get('x-user-id');
  users = users.map((user) =>
    user.id === userId ? { ...user, name: newName } : user
  );
  return new NextResponse(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}