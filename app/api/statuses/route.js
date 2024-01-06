import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statuses = await prisma.status.findMany();
    return NextResponse.json(statuses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not get statuses" },
      { status: 500 }
    );
  }
}
