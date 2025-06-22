import React from "react";
import Sidebar from "../components/layouts/Sidebar";
import Users from "../features/user/components/Users";

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <Users />
      </main>
    </div>
  );
};

export default HomePage;
