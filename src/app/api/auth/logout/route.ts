import { NextResponse } from "next/server";

export async function GET() {
  const cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  
  return NextResponse.json({ message: "Logout bem-sucedido" }, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}