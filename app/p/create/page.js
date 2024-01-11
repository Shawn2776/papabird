"use client";

import BackButton from "@/app/components/ui/BackButton";
import UserForm from "@/app/components/forms/UserForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const CreateUserPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleCreateUser = (data) => {
    createUser(data);
  };

  const { mutate: createUser, isLoading: isLoadingNewUser } = useMutation({
    mutationFn: (newUser) => {
      return axios.post("/api/users/create", newUser);
    },
    onError: () => {
      console.error(error);
    },
    onSuccess: () => {
      alert("User created successfully");
      router.push("/");
      router.refresh();
    },
  });

  if (status === "loading") {
    return <div>Loading ...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/");
  }
  return (
    <div>
      <BackButton />
      <h1 className="my-4 text-2xl font-bold text-center">Add New User</h1>
      <UserForm submit={handleCreateUser} isLoadingNewUser={isLoadingNewUser} />
    </div>
  );
};

export default CreateUserPage;
