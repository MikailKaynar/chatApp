import React from "react";
import Messages from "./Messages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="row-span-3 col-span-3 bg-slate-800 max-h-155 overflow-hidden ">
      <div>
        <div className="bg-indigo-800 w-full h-20 text-left flex items-center text-4xl pl-4 text-white ">
          {data.user?.kullaniciAd}
        </div>
        <div className="bg-gray-800 w-full h-145 ">
          <Messages />
        </div>
      </div>

      <Input />
    </div>
  );
};

export default Chat;
