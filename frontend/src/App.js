import Login from './pages/login';
import Profile from './pages/profile';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

function App() {
  // const get = async () => {
  //   const res = await fetch('http://localhost:8000');
  //   console.log(res);
  // };
  // get();

  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} exact />
      </Route>
      <Route element={<NotLoggedInRoutes />}>
        <Route path="/login" element={<Login />} exact />
      </Route>
    </Routes>
  );
}

export default App;
