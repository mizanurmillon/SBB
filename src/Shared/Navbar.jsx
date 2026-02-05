import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import {
  BackButton,
  CrossMark,
  ThreeDot,
} from "../components/SvgContainer/SvgContainer";
import { useStore } from "../store/useStore";

const Navbar = () => {
  const { isMenuOpen, toggleMenu } = useStore();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isHome = location === "/";
  const isNotSideButton =
    location !== "/" &&
    location !== "/complaint-filed" &&
    location !== "/message-send";

  return (
    <nav className="h-auto pt-[23.97px] w-full bg-black">
      <div className="container">
        <div className="flex w-full items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <BackButton
              className={`${isNotSideButton ? "opacity-100" : "opacity-0"}`}
            />
          </button>

          <Link to={"/"}>
            <img
              src={logo}
              className="h-30 w-30 object-cover"
              alt="not found"
            />
          </Link>

          <div onClick={toggleMenu}>
            {!isMenuOpen ? (
              <CrossMark className={isHome ? "opacity-100" : "opacity-0"} />
            ) : (
              <ThreeDot className={isHome ? "opacity-100" : "opacity-0"} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
