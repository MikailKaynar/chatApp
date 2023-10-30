import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const MainPage = () => {
  return (
    <div className="grid grid-cols-4 pt-3 gap-1 max-h-screen">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default MainPage;
