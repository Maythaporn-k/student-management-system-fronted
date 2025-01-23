import React from "react";
import StudentList from "./StudentData";

const HomePage: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h2 className="text-3xl font-semibold text-gray-800 mt-4 text-center h-fit">
        Welcome to the Student Dashboard
      </h2>

      <StudentList />
    </div>
  );
};

export default HomePage;
