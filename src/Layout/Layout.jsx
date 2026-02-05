import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
