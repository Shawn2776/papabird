"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ id }) => {
  const router = useRouter();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/users/${id}`); // prisma.users.delete
    },
    onError: () => {
      console.error(error);
    },
    onSuccess: () => {
      alert("User deleted successfully");
      router.push("/");
      router.refresh();
    },
  });
  return (
    <span onClick={() => deleteUser()}>
      {isLoading && <span className="loading loading-spinner"></span>}
      {isLoading ? "Loading ..." : "Delete User"}
    </span>
  );
};

export default DeleteButton;
