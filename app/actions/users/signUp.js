"use server";

import prisma from "@/lib/prisma";
import createUniqueUsername from "@/utils/misc/createUniqueUsername";
import bcrypt from "bcryptjs";

export const signUp = async (email, password, name) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return "User with that email already exists.";
  }

  const newUsername = await createUniqueUsername();

  const passwordHash = bcrypt.hashSync(password, 10);

  await prisma.users.create({
    data: {
      email,
      hPassword: passwordHash,
      name,
      username: newUsername,
      role: "user",
    },
  });

  return "Successfully created new user!";
};
