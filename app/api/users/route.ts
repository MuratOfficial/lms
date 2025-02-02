import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { name, email, bio } = await req.json();
  const newUser = await prisma.user.create({
    data: { name, email, bio },
  });
  return NextResponse.json(newUser);
}
