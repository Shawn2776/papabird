import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import defaultProfilePic from "/public/defaultProfilePic.jpg";

async function getUser() {
  const { user } = await getServerSession(authOptions);

  const response = await prisma.users.findUnique({
    where: {
      email: user?.email,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      status: true,
      role: true,
      profilePic: true,
    },
  });

  return response;
}

const Navbar = async ({ children }) => {
  const user = await getUser();
  return (
    <div className="container min-h-screen mx-auto">
      {/* TOP */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="text-xl btn btn-ghost">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="w-24 input input-bordered md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              {user ? (
                <Image
                  alt={`${user?.name}'s profile picture}`}
                  src={user.profilePic ? user.profilePic : defaultProfilePic}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-32 h-32 skeleton"></div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* MIDDLE */}
      <div className="flex w-full min-h-[95vh]">
        {/* LEFT */}
        <div className="w-[10%] bg-base-100">
          <Link className="text-xl" href="/p/dashboard">
            Users
          </Link>
        </div>
        <div className="w-full p-4 px-6 rounded-md bg-base-300">{children}</div>
        {/* RIGHT */}
        <div className="w-[2%] bg-base-100"></div>
      </div>
      {/* BOTTOM */}
      <div>
        <footer className="p-4 footer footer-center bg-base-100 text-base-content">
          <aside>
            <p>Copyright © 2024 - All right reserved by webDev2776 Ltd</p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default Navbar;
