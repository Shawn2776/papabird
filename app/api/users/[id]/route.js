import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  try {
    const { params } = context;

    await prisma.users.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete user." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  try {
    const { params } = context;
    const body = await request.json();

    await prisma.users.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        email: body.email,
        username: body.username,
        status: body.statusName,
        role: body.roleName,
        profilePic: body.profilePic,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated user." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update user." },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  try {
    const { params } = context;
    const user = await prisma.users.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Could not get user." }, { status: 500 });
  }
}
