// lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
    email: string;
    name: string;
  };
}

export function authError(message: string, status: number = 401) {
  return NextResponse.json({ error: message }, { status });
}