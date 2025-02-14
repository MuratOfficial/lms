import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/data/scores.json');

export async function POST(request: Request) {
  const { username, points } = await request.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const existingUser = data.find((entry: { username: string }) => entry.username === username);
  if (existingUser) {
    existingUser.score += points;
  } else {
    data.push({ username, score: points });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Score updated successfully' });
}