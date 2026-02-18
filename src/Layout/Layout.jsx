import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import AccessGate from "../pages/AccessGate";

const PIN = "FB39#@SB_NEW";

const Layout = () => {
  const location = useLocation()?.pathname;
  const hasAccess = localStorage.getItem("site_access") === PIN;

  if (!hasAccess) {
    return <AccessGate />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
      {location !== "/" && <Footer />}
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
