import React from "react";
import StudentList from "./StudentData";

const HomePage: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-max">
      <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-4 text-center">
        Welcome to the Student Management Dashboard
      </h2>

      <StudentList />
    </div>
  );
};

export default HomePage;
