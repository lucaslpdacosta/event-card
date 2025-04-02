import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}