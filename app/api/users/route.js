import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";

export async function GET(request, context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const page = request.nextUrl.searchParams.get("page");
    const perPage = request.nextUrl.searchParams.get("perPage");

    const users = await prisma.users.findMany({
      take: parseInt(perPage),
      skip: (parseInt(page) - 1) * parseInt(perPage),
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        status: true,
        role: true,
        profilePic: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!users) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
