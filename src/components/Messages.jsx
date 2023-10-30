import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase/config";
import Message from "./Message";

export default function Messages () {
  const [mesajlar, setMesajlar] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chatler", data.chatId), (doc) => {
      doc.exists() && setMesajlar(doc.data().mesajlar);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  console.log(mesajlar);
  return (
    <div className="overflow-y-scroll scrollbar scrollbar-track-indigo-700 scrollbar-thumb-indigo-500 max-h-150">
      {mesajlar.map(mesaj => (
        <Message mesaj={mesaj} key={mesaj.id} />
      ))}
    </div>
  );
};

