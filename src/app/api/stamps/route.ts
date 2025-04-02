import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const stamps = await prisma.stamp.findMany();
    return NextResponse.json(stamps);
  } catch (error) {
    console.error('Erro ao recuperar stamps:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar stamps' },
      { status: 500 }
    );
  }
}