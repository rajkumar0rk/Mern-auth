import useAuth from "@/hooks/useAuth";
import { Heading, Heading1, InfoIcon } from "lucide-react";
import React from "react";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <div className=" flex flex-1 items-center justify-center">
        <div className="">
          <h1 className="text-2xl font-bold">My Account:</h1>
          <hr className="border my-2" />
          <p>Email: {user?.email}</p>
          <p>Created at: {user?.createdAt}</p>
          {!user?.verified && (
            <div className="bg-amber-300 flex text-black/70 gap-2 rounded-xl border py-3 px-2 shadow-sm">
              <InfoIcon /> <span> Please verify email</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
