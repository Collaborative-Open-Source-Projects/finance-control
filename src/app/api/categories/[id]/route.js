import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validations/category';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({ where: { id } });
    
    if (!category) {
      return NextResponse.json({ data: null, error: { message: "Category not found" } }, { status: 404 });
    }
    
    return NextResponse.json({ data: category, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { data: null, error: { message: "Invalid JSON body" } },
        { status: 400 }
      );
    }
    
    const validation = categorySchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { data: null, error: { message: "Validation Error", details: validation.error.issues } },
        { status: 400 }
      );
    }
    if (Object.keys(validation.data).length === 0) {
      return NextResponse.json(
        { data: null, error: { message: "At least one field must be provided" } },
        { status: 400 }
      );
    }

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ data: null, error: { message: "Category not found" } }, { status: 404 });
    }

    const category = await prisma.category.update({
      where: { id },
      data: validation.data
    });

    return NextResponse.json({ data: category, error: null }, { status: 200 });
  } catch (error) {
    if (error.code === 'P2002') {
        return NextResponse.json({ data: null, error: { message: "Category name already exists" } }, { status: 400 });
    }
    return NextResponse.json({ data: null, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ data: null, error: { message: "Category not found" } }, { status: 404 });
    }

    await prisma.category.delete({ where: { id } });
    
    return NextResponse.json({ data: { success: true, id }, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}