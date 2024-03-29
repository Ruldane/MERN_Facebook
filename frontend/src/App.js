import Login from "./pages/login";
import Profile from "./pages/profile";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  // const get = async () => {
  //   const res = await fetch('http://localhost:8000');
  //   console.log(res);
  // };
  // get();
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {visible ? <CreatePostPopup user={user} setVisible={setVisible} /> : null}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home setVisible={setVisible} />} />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
