import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const messages = await prisma.message.findMany();
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const { senderId, receiverId, content } = await req.json();
  const newMessage = await prisma.message.create({
    data: { senderId, receiverId, content },
  });
  return NextResponse.json(newMessage);
}