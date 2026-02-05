import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import AccessGate from "../pages/AccessGate";

const Layout = () => {
  const hasAccess = localStorage.getItem("site_access") === "granted";

  if (!hasAccess) {
    return <AccessGate />;
  }

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
