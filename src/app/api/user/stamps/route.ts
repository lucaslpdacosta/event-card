import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { id: userId } = verifyToken(token);
    
    const userStamps = await prisma.userStamp.findMany({
      where: { userId },
      include: { stamp: true }
    });

    const stamps = userStamps.map(us => ({
      ...us.stamp,
      redeemedAt: us.createdAt
    }));

    return NextResponse.json(stamps);
  } catch (error) {
    console.error('Erro ao recuperar stamps:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar stamps' },
      { status: 500 }
    );
  }
}