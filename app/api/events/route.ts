import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      // Example: Send a message when a new message is added to the database
      const intervalId = setInterval(async () => {
        const messages = await prisma.message.findMany({
          orderBy: { timestamp: 'desc' },
          take: 1,
        });
        if (messages.length > 0) {
          sendEvent(JSON.stringify(messages[0]));
        }
      }, 1000);

      req.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}