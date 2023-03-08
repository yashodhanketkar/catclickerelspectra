import { Outlet, Routes, Route } from "react-router-dom";
import MainUI from "../components/mainUI";
import Home from "./home";

const Layout = () => {
  return (
    <MainUI>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Outlet />
    </MainUI>
  );
};

export default Layout;
