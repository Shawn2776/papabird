import React from "react";
import defaultProfilePic from "/public/defaultProfilePic.jpg";
import Image from "next/image";

const UserCard = ({ user }) => {
  const { id, name, email, username, status, role, profilePic } = user;
  return (
    <tr>
      <td>
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
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{username}</td>
      <td>{role}</td>
      <td>{status}</td>
      <th>
        <button className="btn btn-md">edit</button>
      </th>
    </tr>
  );
};

export default UserCard;
