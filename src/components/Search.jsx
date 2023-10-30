import { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Search = () => {
  const [arananKullanici, setArananKullanici] = useState("");
  const [kullanici, setKullanici] = useState(null);
  const [hata, setHata] = useState(false);
  const { girisKullanici } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  const handleAra = async () => {
    const q = query(
      collection(db, "kullanicilar"),
      where("kullaniciAd", "==", arananKullanici)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setKullanici(doc.data());
      });
    } catch (err) {
      setHata(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleAra();
  };

  const handleSec = async () => {
    const birlestirilmisId =
      girisKullanici.uid > kullanici.uid
        ? girisKullanici.uid + kullanici.uid
        : kullanici.uid + girisKullanici.uid;
    try {
      const res = await getDoc(doc(db, "chatler", birlestirilmisId));

      if (!res.exists()) {
        await setDoc(doc(db, "chatler", birlestirilmisId), { mesajlar: [] });

        await updateDoc(doc(db, "kullaniciChatler", girisKullanici.uid), {
          [birlestirilmisId + ".kullaniciBilgi"]: {
            uid: kullanici.uid,
            kullaniciAd: kullanici.kullaniciAd,
            fotoURL: kullanici.fotoURL,
          },
          [birlestirilmisId + ".tarih"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "kullaniciChatler", kullanici.uid), {
          [birlestirilmisId + ".kullaniciBilgi"]: {
            uid: girisKullanici.uid,
            kullaniciAd: girisKullanici.displayName,
            fotoURL: girisKullanici.photoURL,
          },
          [birlestirilmisId + ".tarih"]: serverTimestamp(),
        });
      }
      dispatch({type:"CHANGE_USER",payload:kullanici})
    } catch (error) {}

    setKullanici(null);
    setArananKullanici("");
  };

  return (
    <div>
      <div className="pt-2 pb-1 px-3 bg-gray-800">
        <input
          onKeyDown={handleKey}
          onChange={(e) => setArananKullanici(e.target.value)}
          value={arananKullanici}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-slate-900 ring-2 border-indigo-700 placeholder-gray-300 text-indigo-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
          placeholder="Ara"
        />
      </div>
      {hata && <span>Kullanıcı Bulunamadı </span>}
      {kullanici && (
        <li
          onClick={handleSec}
          className="flex justify-center py-2 bg-indigo-950 mx-5 rounded-ee-xl rounded-es-xl"
        >
          <a className="flex items-center p-2 w-72 text-gray-900 rounded-lg bg-indigo-800 hover:bg-indigo-700">
            <img
              src={kullanici.fotoURL}
              className="bg-indigo-300 object-cover h-14 w-14 rounded-md "
            />
            <div>
              <span className="ml-3 text-2xl font-mono text-slate-100 block">
                {kullanici.kullaniciAd}
              </span>
              <span className="ml-3 text-base font-thin block text-slate-300">
                Lorem ipsum dolor sit amet.
              </span>
            </div>
          </a>
        </li>
      )}
    </div>
  );
};
export default Search;
