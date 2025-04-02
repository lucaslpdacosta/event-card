import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" }
    );

    const response = NextResponse.json({ message: "Login bem-sucedido" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}