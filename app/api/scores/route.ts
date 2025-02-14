import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/data/scores.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { username, score } = await request.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const existingUser = data.find((entry: { username: string }) => entry.username === username);
  if (existingUser) {
    existingUser.score = score;
  } else {
    data.push({ username, score });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Score saved successfully' });
}

export async function PUT(request: Request) {
  const { username, newUsername, score } = await request.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const existingUser = data.find((entry: { username: string }) => entry.username === username);
  if (existingUser) {
    existingUser.username = newUsername || existingUser.username;
    existingUser.score = score !== undefined ? score : existingUser.score;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'User updated successfully' });
  }
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { username } = await request.json();
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data = data.filter((entry: { username: string }) => entry.username !== username);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'User deleted successfully' });
}