import { useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const { girisKullanici } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "kullaniciChatler", girisKullanici.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    girisKullanici.uid && getChats();
  }, [girisKullanici.uid]);

  const handleSec = (k) => {
    dispatch({type:"CHANGE_USER", payload:k})
  };

  return (
    <ul className="space-y-2 font-medium overflow-y-scroll scrollbar scrollbar-track-indigo-700 scrollbar-thumb-indigo-500 max-h-150">
      {Object.entries(chats)?.sort((a,b)=>b[1].tarih-a[1].tarih).map((chat) => (
        <li key={chat[0]} onClick={()=>{handleSec(chat[1].kullaniciBilgi)}}>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white border-none hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <img
              src={chat[1].kullaniciBilgi.fotoURL}
              className="bg-indigo-300 h-14 w-20 rounded-full"
            />
            <div>
              <span className="ml-3 text-2xl font-mono text block">
                {chat[1].kullaniciBilgi.kullaniciAd}
              </span>
              <span className="ml-3 text-base font-thin block">
                {chat[1].sonMesaj?.text}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Chatlist;
