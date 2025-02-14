import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/data/cards.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const newQuestion = await request.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.push(newQuestion);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Question added successfully' });
}

export async function PUT(request: Request) {
  const updatedQuestion = await request.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const index = data.findIndex((q: { id: number }) => q.id === updatedQuestion.id);
  if (index !== -1) {
    data[index] = updatedQuestion;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Question updated successfully' });
  }
  return NextResponse.json({ message: 'Question not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data = data.filter((q: { id: number }) => q.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Question deleted successfully' });
}