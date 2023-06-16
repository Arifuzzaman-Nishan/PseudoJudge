"use client";
import { FaHamburger } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleSidebarCollapse } from "@/redux/features/sidebar/sidebarCollapseSlice";
import { headerData } from "../assets/header.data";

export default function Header() {
  const collapseValue = useAppSelector(
    (state) => state.sidebarCollapseReducer.collapsed
  );
  const dispatch = useAppDispatch();

  const handleHamburgerClick = () => {
    dispatch(toggleSidebarCollapse(!collapseValue));
  };

  return (
    <header className="w-full border px-7 py-5">
      <nav>
        <ul className="flex justify-between items-center">
          <ul>
            <li className=" ">
              <FaHamburger
                onClick={handleHamburgerClick}
                className="text-5xl cursor-pointer py-2.5 px-2.5 rounded-full transition duration-200 hover:bg-blue-200 block text-primary"
              />
            </li>
          </ul>
          <ul className="flex">
            {headerData.map((header) => {
              const Icon = header.icon;
              return (
                <li className="ml-7" key={header.id}>
                  <Icon className="text-2xl cursor-pointer" />
                </li>
              );
            })}
          </ul>
        </ul>
      </nav>
    </header>
  );
}
