"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import { sidebarData } from "../assets/sidebar.data";

export default function Sidenavbar() {
  const collapseValue = useAppSelector(
    (state) => state.sidebarCollapseReducer.collapsed
  );

  let collapseCSS = "translate-x-0 md:static";
  if (!collapseValue) {
    collapseCSS = "-translate-x-full";
  }

  return (
    <div
      className={`bg-blue-800 text-white space-y-6 py-7 px-2  transform transition duration-200 ease-in-out absolute inset-y-0 left-0 w-64 h-screen ${collapseCSS}`}
    >
      <Link href="/">
        <div className="text-white flex items-center space-x-2 px-4 cursor-pointer">
          <span className="text-xl font-extrabold">Your Logo</span>
        </div>
      </Link>
      <nav>
        {sidebarData.map((sidebar) => {
          const Icon = sidebar.icon;
          return (
            <Link key={sidebar.id} href={sidebar.path}>
              <div className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                <Icon className="text-xl" />
                <span className="ml-6">{sidebar.title}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
