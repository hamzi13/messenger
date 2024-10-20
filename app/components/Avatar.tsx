"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative h-9 w-9 overflow-hidden rounded-full inline-block md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
