// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validations/category';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ data: categories, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { data: null, error: { message: "Invalid JSON body" } },
        { status: 400 }
      );
    }
    
    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { data: null, error: { message: "Validation Error", details: validation.error.issues } },
        { status: 400 }
      );
    }

    const { name, color, budgetLimit } = validation.data;

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { data: null, error: { message: "A category with this name already exists" } }, 
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name, color, budgetLimit }
    });

    return NextResponse.json({ data: category, error: null }, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { data: null, error: { message: "A category with this name already exists" } },
        { status: 400 }
      );
    }
    return NextResponse.json({ data: null, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}