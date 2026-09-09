import React from "react";
import { useEffect, useState, useContext } from "react";
import { BackendUrlRef } from "../../config/constants/LaunchpadAddress";
import { UserContext } from "../../context/userContext/UserContext";
import axios from "axios";
import SearchSVG from "../../svgs/search";

export default function UsersTable(users) {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(users, "users in table");

  const filteredUsers = users.users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approveUser = async (id) => {
    try {
      const res = await axios.put(
        `${BackendUrlRef}/users/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-20">
      <div className="flex items-center justify-between border-2 border-white dark:border-dark-1 bg-[#F5F1EB] dark:bg-dark-3 rounded-md w-4/6 px-5 py-3 mb-12">
        <input
          className="bg-transparent dark:text-white placeholder:text-dim-text dark:placeholder:text-dim-text-dark focus:outline-none w-full"
          placeholder={"search by email"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchSVG className="fill-dark-text dark:fill-light-text" />
      </div>
      <table className="table-auto w-full dark:text-white text-center overflow-x-auto text-[12px]">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 ">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => approveUser(user.id)}
                  className="bg-primary-green text-white font-bold py-2 px-4 rounded"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
