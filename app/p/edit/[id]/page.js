"use client";

import UserForm from "@/app/components/forms/UserForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const UserEditPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    },
  });

  const { mutate: editUser, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (EditedUser) => {
      return axios.patch(`/api/users/${id}`, EditedUser);
    },
    onError: () => {
      console.error("Could not edit user.", error);
    },
    onSuccess: () => {
      alert("User updated successfully");
      router.push("/");
      router.refresh();
    },
  });

  const handleEditUser = (data) => {
    editUser(data);
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner-lg"></span>
      </div>
    );
  }

  return (
    <>
      <h1 className="mt-10 text-center">Edit User</h1>
      <UserForm
        isLoadingUser={isLoadingUser}
        submit={handleEditUser}
        isEditing={true}
        initialValue={userData}
      />
    </>
  );
};

export default UserEditPage;
