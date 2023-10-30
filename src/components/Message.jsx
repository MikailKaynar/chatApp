import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import "moment/locale/tr";

export default function Message({ mesaj }) {
  const { girisKullanici } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesaj]);

  return (
    <div ref={ref} className="grid justify-items-stretch overflow-y-auto pb-5">
      <div
        className={`mesaj ${
          mesaj.gonderenId === girisKullanici.uid && "giden"
        }`}
      >
        <div className="max-w-max">{mesaj.text}</div>
        {mesaj.resim && <img src={mesaj.resim} className="w-auto h-36" />}
        <div className="text-xs text-right pb-1 text-slate-100 font-bold">
          {moment(new Date(mesaj.tarih.toDate())).fromNow()}
        </div>
      </div>
    </div>
  );
}
