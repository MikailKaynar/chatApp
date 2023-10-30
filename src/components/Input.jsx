import { useState, useContext } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsFileImage } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase/config";
import { doc, updateDoc, Timestamp, arrayUnion,serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { girisKullanici } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleGonder = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef,img).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL)=>{
          await updateDoc(doc(db,"chatler",data.chatId),{
            mesajlar:arrayUnion({
              id:uuid(),
              text,
              gonderenId:girisKullanici.uid,
              tarih:Timestamp.now(),
              resim:downloadURL
            })
          })
        })
      })
    } else {
      await updateDoc(doc(db, "chatler",data.chatId), {
        mesajlar: arrayUnion({
          id: uuid(),
          text,
          gonderenId: girisKullanici.uid,
          tarih: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"kullaniciChatler",girisKullanici.uid),{
      [data.chatId+".sonMesaj"]:{
        text
      },
      [data.chatId+".tarih"]:serverTimestamp()
    })
    await updateDoc(doc(db,"kullaniciChatler",data.user.uid),{
      [data.chatId+".sonMesaj"]:{
        text
      },
      [data.chatId+".tarih"]:serverTimestamp()
    })

    setText("")
    setImg(null)
  };

  return (
    <div className="flex border border-gray-300 ">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        className="pl-5 border-r-0 w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-3xl"
        placeholder="Mesaj"
      />
      <div className="grid grid-cols-3 gap-4 align-middle items-center bg-white border border-l-0 border-gray-300 pr-5">
        <div className="w-16 py-5 px-3">
          <MdOutlineAttachFile className="w-auto h-10 opacity-40" />
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          className="rounded-none relative block w-full border-l-0 px-3 py-5  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-4xl"
        />
        <label htmlFor="file" className="w-16 py-5 px-3">
          <BsFileImage className="w-auto h-10 opacity-40" />
        </label>
        <button onClick={handleGonder} className=" bg-indigo-400 w-16 p-6 rounded-ss-large rounded-es-large rounded-se-large">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
