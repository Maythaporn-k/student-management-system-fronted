import { Paths } from "@/utils/enum";
import React, { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // State to track the selected menu item
  const [selectedItem, setSelectedItem] = useState<string>("home");

  // Function to handle item selection
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } min-h-screen w-64 bg-gradient-to-r from-light-blue to-blue-500  rounded-r-full text-white p-4 flex flex-col justify-center items-center`}
    >
      <h1 className="text-2xl font-bold mb-12 text-center ">Student Portal</h1>
      <nav className="space-y-4 flex flex-col text-center font-bold ">
        <a
          href={Paths.HOME}
          onClick={() => handleSelectItem("home")}
          className={`block p-4 ${
            selectedItem === "home"
              ? " bg-gray-100 text-gray-black font-bold w-[200px] rounded-full "
              : "text-white"
          } `}
        >
          Home
        </a>
        <a
          href={Paths.STUDENT_LIST}
          onClick={() => handleSelectItem("list")}
          className={`block p-4 ${
            selectedItem === "list"
              ? " bg-gray-100 text-gray-black  w-[200px] rounded-full "
              : "text-white"
          } `}
        >
          Student List
        </a>
        <a
          href={Paths.STUDENT_ABSENCE}
          onClick={() => handleSelectItem("absence")}
          className={`block p-4 ${
            selectedItem === "absence"
              ? " bg-gray-100 text-gray-black  w-[200px] rounded-full "
              : "text-white"
          } `}
        >
          Student Absence
        </a>
        <a
          href={Paths.STUDENT_ASSIGNMENT}
          onClick={() => handleSelectItem("assignment")}
          className={`block p-4 ${
            selectedItem === "assignment"
              ? " bg-gray-100 text-gray-black  w-[200px] rounded-full "
              : "text-white"
          } `}
        >
          Student Assignment
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
