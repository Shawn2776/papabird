import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Navbar = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-oxford">
      <div className="flex items-center justify-between w-full h-10 pl-2 pr-10 text-white bg-oxford">
        <div>uTalkTo</div>
        <div>
          {session && session.user?.email ? (
            <div className="flex gap-4">
              <p>Hello, {session.user?.name}</p>
              <Link href="/auth/signout">Sign Out</Link>
            </div>
          ) : (
            <Link href="/auth/signin">Sign In</Link>
          )}
          <Link href="/"></Link>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-[5%] min-h-screen">Left</div>
        <div className="w-full h-[95vh] bg-neutral-800 rounded-md">
          {children}
        </div>
        <div className="w-[2%]"></div>
      </div>
      <div className="w-full h-5 bg-oxford">Bottom</div>
    </div>
    // <div className="flex justify-between w-full gap-4 px-4 py-8 bg-neutral-700">
    //   <div>
    //     <Link href="/">uTalkTo</Link>
    //   </div>
    //   <div>
    //     {session && session.user?.email ? (
    //       <div className="flex gap-4">
    //         <p>Hello, {session.user?.name}</p>
    //         <Link href="/auth/signout">Sign Out</Link>
    //       </div>
    //     ) : (
    //       <Link href="/auth/signin">Sign In</Link>
    //     )}
    //     <Link href="/"></Link>
    //   </div>
    // </div>
  );
};

export default Navbar;
