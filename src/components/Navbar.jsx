import { React, useContext } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { girisKullanici } = useContext(AuthContext);

  return (
    <div className="flex justify-between bg-indigo-800">
      <div className="w-fit h-20 rounded-tl-lg text-left text-white p-5 text-2xl">
        <h1>{girisKullanici.displayName}</h1>
      </div>
      <div className="">
        <div className="p-4 min-w-fit">
          <div className=" flex px-4 bg-black rounded-full min-w-fit max-h-min text-gray-200">
            <img
              className=" h-12 w-12 min-w-fit min-h-fit rounded-full overflow-hidden -ml-4 "
              src={girisKullanici.photoURL}
            />
            <button
              onClick={() => signOut(auth)}
              className="pt-2 pb-3 pr-16 text-lg"
            >
              <h1 className="whitespace-nowrap">Çıkış Yap </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
