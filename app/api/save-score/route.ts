import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { username, score } = await request.json();
  const filePath = path.join(process.cwd(), 'public/data/scores.json');

  let data = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      data = JSON.parse(fileContent);
    }
  }

  // Проверка на существование пользователя с таким же никнеймом
  const existingUser = data.find((entry: { username: string }) => entry.username === username);
  if (existingUser) {
    // Обновление баллов для существующего пользователя
    existingUser.score = score;
  } else {
    // Добавление нового пользователя
    data.push({ username, score });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: 'Score saved successfully' });
}