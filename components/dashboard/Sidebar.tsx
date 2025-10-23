"use client";
import React from "react";
import { Menus } from "./menus";

interface SidebarProps {
  sideMenuIsExpand: boolean;
  setSideMenuIsExpand: (value: boolean) => void;
  myIndex: number;
  setMyIndex: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sideMenuIsExpand,
  setSideMenuIsExpand,
  myIndex,
  setMyIndex,
}) => {
  return (
    <div
      className={`bg-white border-r shadow-md h-screen transition-all duration-300
      ${sideMenuIsExpand ? "w-56" : "w-16"} fixed left-0 top-0`}
    >
      <div className="flex items-center justify-between p-4">
        {sideMenuIsExpand && <h2 className="font-bold text-lg">Dashboard</h2>}
        <button onClick={() => setSideMenuIsExpand(!sideMenuIsExpand)}>
          {sideMenuIsExpand ? "<" : ">"}
        </button>
      </div>

      <ul className="mt-4">
        {Menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => setMyIndex(index)}
            className={`flex items-center gap-3 cursor-pointer px-4 py-2 
            hover:bg-gray-100 text-sm font-medium ${
              myIndex === index && "bg-gray-200"
            }`}
          >
            <menu.icon />
            {sideMenuIsExpand && <span>{menu.title}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
