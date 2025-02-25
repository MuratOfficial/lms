
import { NextResponse } from "next/server";

interface Client {
  id:number;
  sendEvent(data:string):void
}

let clients: Client[] = [];

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const clientId = Date.now();
      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      clients.push({ id: clientId, sendEvent });

      controller.close = () => {
        clients = clients.filter(client => client.id !== clientId);
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

export async function POST(request: Request) {
  const { event, data } = await request.json();
  clients.forEach(client => client.sendEvent(JSON.stringify({ event, data })));
  return NextResponse.json({ success: true });
}