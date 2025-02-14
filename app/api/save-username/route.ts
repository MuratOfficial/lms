import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { username } = await request.json();
  const filePath = path.join(process.cwd(), 'public/data/usernames.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.push({ username });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: 'Username saved successfully' });
}