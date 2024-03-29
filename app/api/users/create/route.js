import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const user = await prisma.users.create({
      data: {
        email: body.email,
        name: body.name,
        username: body.username,
        hPassword: body.hPassword,
        role: {
          connect: {
            id: body.roleId,
          },
        },
        status: {
          connect: {
            id: body.statusId,
          },
        },
      },
    });

    console.log("user", user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create user." },
      { status: 500 }
    );
  }
}
