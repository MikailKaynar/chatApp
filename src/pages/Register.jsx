import { useState, useRef } from "react";
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [hata, setHata] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = () => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHata(false);

    const kullaniciAd = e.target[0].value;
    const email = e.target[1].value;
    const parola = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, parola);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${kullaniciAd + date}`);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          //console.log(downloadURL);
          try {
            await updateProfile(res.user, {
              displayName: kullaniciAd,
              photoURL: downloadURL,
            });
            //console.log(res.user);
            await setDoc(doc(db, "kullanicilar", res.user.uid), {
              uid: res.user.uid,
              kullaniciAd,
              email,
              fotoURL: downloadURL,
            });

            await setDoc(doc(db, "kullaniciChatler", res.user.uid), {});
            navigate("/");
          } catch (error) {
            setHata(error.message);
            setLoading(false);
          }
        });
      });
      setLoading(false);
    } catch (error) {
      setHata(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Kaydol
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label  className="sr-only">
                Kullanıcı adı
              </label>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Kullanıcı adın"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email adresi
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email adresin"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Parolan"
              />
            </div>
            <div className="mt-1 flex items-center rounded-b-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm">
              {image ? (
                <img
                  className=" rounded-full  w-14 h-14 object-cover"
                  src={URL.createObjectURL(image)}
                />
              ) : (
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-200"></span>
              )}
              <label
                htmlFor="profile-picture"
                className="cursor-pointer ml-5 rounded-md border-2 border-indigo-200 py-2 px-3 inline-flex items-center hover:bg-gray-100 hover:border-indigo-300"
              >
                <svg
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2 text-sm ">Resim Seç</span>
                <input
                  id="profile-picture"
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              {loading === true ? (
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Üyeliğiniz oluşturulurken bekleyiniz
                </a>
              ) : (
                <Link
                  to={"/login"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Zaten bir hesabın var mı?
                </Link>
              )}
              {hata && <p>{hata}</p>}
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kaydol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
