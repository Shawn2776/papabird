"use client";

import PaginationComponent from "@/app/components/ui/Pagination";
import UserCard from "@/app/components/ui/UserCard";
import UsersTable from "@/app/components/ui/UsersTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// async function getUsers(page = 1, perPage = 10) {
//   const skip = (page - 1) * perPage;
//   const response = await prisma.users.findMany({
//     skip: skip,
//     take: perPage,
//     select: {
//       id: true,
//       name: true,
//       username: true,
//       email: true,
//       status: true,
//       role: true,
//       profilePic: true,
//     },
//     orderBy: {
//       name: "asc",
//     },
//   });

//   return response;
// }

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const {
    data: usersData,
    isLoading: loadingUsersData,
    isError: errorUsersData,
  } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      return axios
        .get("/api/users/", { params: { page: currentPage, perPage } })
        .then((res) => res.data);
    },
  });

  if (errorUsersData) {
    console.log("errorUsersData", errorUsersData);
    return <div>Error loading user data</div>;
  }

  if (loadingUsersData) {
    return <div>Loading user data ...</div>;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-4">
      <div className="px-2 py-4 rounded-lg shadow-md bg-[#18191A] shadow-black">
        {/* USERS */}
        <UsersTable usersData={usersData} />
        {/* Pagination Controls */}
        <div className="flex justify-center w-full max-w-xs mx-auto mt-4">
          <PaginationComponent
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
