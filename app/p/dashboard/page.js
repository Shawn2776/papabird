import UserCard from "@/app/components/ui/UserCard";
import prisma from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getUsers() {
  const response = await prisma.users.findMany({
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

  return response;
}

export default async function DashboardPage() {
  const users = await getUsers();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
