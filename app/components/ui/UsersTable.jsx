import React from "react";
import UserCard from "./UserCard";

const UsersTable = ({ usersData }) => {
  return (
    <>
      <h2 className="mb-2 text-2xl text-center">USERS</h2>
      <hr />
      <table className="table mt-2">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
