import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Sessão expirada. Tente novamente.' }, { status: 401 });
    
    const { id: userId } = verifyToken(token);
    const { code } = await request.json();

    const stamp = await prisma.stamp.findUnique({ where: { code } });
    if (!stamp) return NextResponse.json({ error: 'Código inválido.' }, { status: 400 });

    const existing = await prisma.userStamp.findUnique({
      where: { userId_stampId: { userId, stampId: stamp.id } }
    });
    if (existing) return NextResponse.json({ error: 'Código já resgatado.' }, { status: 400 });

    await prisma.userStamp.create({
      data: { userId, stampId: stamp.id }
    });

    return NextResponse.json({ success: true, stamp });
  } catch (error) {
    console.error('Erro ao resgatar:', error);
    return NextResponse.json(
      { error: 'Erro ao resgatar.' },
      { status: 500 }
    );
  }
}