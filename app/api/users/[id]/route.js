import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request, context) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    return NextResponse.redirect("/auth/signin");
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.redirect("/auth/signin");
    }
  } catch (error) {
    return NextResponse.redirect("/auth/signin");
  }

  try {
    const { params } = context;

    if (session.user.id === params.id) {
      return NextResponse.json(
        { message: "You cannot delete your own account." },
        { status: 403 }
      );
    }

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
