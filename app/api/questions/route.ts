import {  NextResponse } from 'next/server';
import questions from '@/questions.json';

export async function GET() {
  return NextResponse.json(questions);
}