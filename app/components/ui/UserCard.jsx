"use client";

import React from "react";
import defaultProfilePic from "/public/defaultProfilePic.jpg";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import DeleteButton from "./DeleteButton";

const UserCard = ({ user }) => {
  const { id, name, email, username, status, role, profilePic } = user;
  return (
    <tr>
      <td className="items-center ">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <Image
              src={profilePic ? profilePic : defaultProfilePic}
              alt="Avatar Tailwind CSS Component"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div>{email}</div>
          </div>
        </div>
      </td>
      <td>
        <div
          className={`flex items-center ${
            role.name === "admin"
              ? "badge badge-accent font-bold text-green-500 badge-outline"
              : "badge badge-info badge-outline"
          }`}
        >
          {role.name}
        </div>
      </td>
      <td>
        <div className="flex items-center h-full gap-2 align-middle">
          <div
            className={`${
              status.name === "active"
                ? "badge badge-success badge-xs"
                : "badge badge-warning badge-xs"
            }`}
          ></div>
          <div
            className={status.name === "active" ? "text-white" : "text-warning"}
          >
            {status.name}
          </div>
        </div>
      </td>
      <th>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1 btn">
            <MoreHorizontal />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={`/p/edit/${id}`}>edit</Link>
            </li>
            <li>
              <DeleteButton id={id} />
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};

export default UserCard;
