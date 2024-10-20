"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import React, { useState } from "react";
import MobileItem from "./MobileItem";
import SettingsModal from "./SettingsModal";
import Avatar from "../Avatar";
import { User } from "@prisma/client";

interface DesktopSidebarProps {
  currentUser: User;
}

const MobileFooter: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isopen, setIsOpen] = useState(false);

  if (isOpen) {
    return null;
  }
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isopen}
        onClose={() => setIsOpen(false)}
      />

      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick && (() => route.onClick())}
          />
        ))}
        {/* <nav className="mt-4 flex flex-col justify-center items-center"> */}
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition mr-3"
          >
            
              <Avatar user={currentUser} />
            
          </div>
        {/* </nav> */}
      </div>
    </>
  );
};

export default MobileFooter;
