import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.users.findMany();

  if (!users) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(users, { status: 200 });
}
