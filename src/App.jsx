import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles/tailwind.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { girisKullanici } = useContext(AuthContext);
  const YonlendirmeKontrol = ({ children }) => {
    if (!girisKullanici) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <YonlendirmeKontrol><MainPage /></YonlendirmeKontrol>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
