"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const usersQuery = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      return data;
    },
  });
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (usersQuery.isError) {
    return <div>{usersQuery.error.message}</div>;
  }

  if (usersQuery.isSuccess) {
    return (
      <div className="min-h-screen px-2 py-2 rounded-md bg-neutral-900">
        {usersQuery.data.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-2 mb-2 rounded-md bg-neutral-800"
          >
            <div className="text-sm font-medium text-neutral-100">
              {user.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt="Profile picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-start justify-start text-sm font-medium text-left text-neutral-100">
              {user.name}
            </div>
            <div className="flex items-start justify-start text-sm font-medium text-left text-neutral-100">
              {user.email}
            </div>
            <div className="flex items-start justify-start text-sm font-medium text-left text-neutral-100">
              {user.status}
            </div>
            <div className="flex items-start justify-start text-sm font-medium text-left text-neutral-100">
              {user.role}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default DashboardPage;
