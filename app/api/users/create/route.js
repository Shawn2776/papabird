import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const user = await prisma.users.create({
      data: {
        email: body.email,
        hPassword: body.hPassword,
        name: body.name,
        username: body.username,
        role: body.role,
        status: body.status,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create user." },
      { status: 500 }
    );
  }
}
