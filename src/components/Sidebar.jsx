import React from "react";
import Search from "./Search";
import Chatlist from "./Chatlist";
import Navbar from "./Navbar";
const Sidebar = () => {
  return (
    <div className="h-fit col-span-1 overflow-hidden">
      <Navbar />
      <Search />
      <div className="px-3 pb-4 bg-gray-50 dark:bg-gray-800 rounded-bl-lg max-h-full overflow-y-auto">
        <Chatlist />
      </div>
    </div>
  );
};

export default Sidebar;
