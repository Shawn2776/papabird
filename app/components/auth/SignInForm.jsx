"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "/public/logos/uTalkTo-logos_white.png";

const SignInForm = () => {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
        router.refresh();
      } else {
        location.reload();
      }
    } catch (err) {
      console.error(err);
      setMessage("Sign-in failed");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status, router]);

  return (
    <section className="bg-primary dark:bg-base-100">
      <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto md:flex-row lg:py-0">
        <a
          href="#"
          className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={logo}
            alt="logo"
            width={800}
            height={800}
            className="mb-0"
          />
        </a>
        <div className="w-full rounded-lg shadow-md shadow-black bg-primary dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="items-center justify-center text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-black"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-black"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full border text-2xl text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-md shadow-black"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    // <div className="flex flex-col justify-center w-full max-w-4xl mx-auto">
    //   <div className="flex justify-center pt-8 mb-8">
    //     <h1>Sign In</h1>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="flex flex-col items-center justify-center gap-4"
    //   >
    //     <input
    //       className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
    //       placeholder="email"
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       placeholder="password"
    //       className="pl-4 border-2 border-gray-400 rounded-md placeholder:text-black"
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Sign In</button>
    //   </form>
    //   <p>{message}</p>
    // </div>
  );
};

export default SignInForm;
