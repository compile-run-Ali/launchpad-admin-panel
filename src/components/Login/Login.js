import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { usersData } from "../../data/users";
import { BackendUrlRef } from "../../config/constants/LaunchpadAddress";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const login = (e) => {
    e.preventDefault();
    const response = fetch(`${BackendUrlRef}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "",
        username: username,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user.role !== "admin") {
          alert("You are not authorized to login");
          return;
        }
        const expiryTime = new Date(new Date().getTime() + 40 * 60000); //40 minutes
        // add expiryTime to data.user
        data.user.expiryTime = expiryTime;
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    console.log(response);
  };

  return (
    <>
      <div className="mt-[15%] flex ">
        <div className="flex justify-center w-1/2 login ">
          <span className=" font-bold pt-4 leading-[77px] text-left text-6xl MRS-shadow  text-white">
            Arborswap <br /> Management
          </span>
        </div>
        <div className=" w-1/2 flex justify-center ">
          <form className="login-form">
            <div className=" rounded-md shadow-sm ">
              <div className=" flex items-center justify-between w-[397.15px] h-[61.38px]  rounded-[10px]  px-5 bg-[#EAF0F7] text-[#4F555A] leading-[77px]">
                <input
                  name="username"
                  type="email"
                  value={username}
                  required
                  className=" bg-transparent tracking-[3px]  h-10 w-full focus:outline-none "
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <img
                  className="ml-2 cursor-pointer"
                  src="/images/x-icon.svg"
                  alt=""
                  onClick={() => setUsername("")}
                />
              </div>
              <div className=" flex items-center text-[26px]  mt-5 justify-between w-[397.15px] h-[61.38px]  rounded-[10px]  px-5 bg-[#EAF0F7] text-[#4F555A] leading-6">
                <input
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  required
                  className=" bg-transparent h-10 w-full focus:outline-none "
                  placeholder=""
                  onChange={(event) => setPassword(event.target.value)}
                />
                <img
                  className="pl-2 cursor-pointer "
                  src="/images/hide.svg"
                  alt=""
                  onClick={() => setViewPassword(!viewPassword)}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="group relative h-[61.5px] flex w-full justify-center rounded-[10px]  bg-[#FB9E00] signin-shadow px-3 py-5 text-sm font-normal text-white"
                onClick={login}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
