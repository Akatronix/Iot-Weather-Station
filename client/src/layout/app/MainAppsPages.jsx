import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const MainAppsPages = () => {
  return (
    <div className="w-screen h-screen  flex items-start bg-slate-300">
      {/* NAVBAR */}
      <Navbar />
      <div className="flex-1 w-full h-full">
        <div className="p-4">
          <p className="text-[#333] md:text-2xl text-md font-bold">
            Weather Station
          </p>
        </div>
        <div className="px-2 w-full mt-2.5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainAppsPages;
