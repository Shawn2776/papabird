"use client";

import { signUp } from "@/app/actions/users/signUp";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Creating user...");

    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    const name = `${capitalizedFirstName} ${capitalizedLastName}`;

    const newMessage = await signUp(email, password, name);

    setMessage(newMessage);
    redirect("/auth/signin");
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-4xl mx-auto">
      <div className="flex justify-center pt-8 mb-8">
        <h1>Sign Up</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
        />

        <input
          className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignUpForm;
