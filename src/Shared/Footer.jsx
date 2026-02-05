import React from "react";
import { Link } from "react-router";

const navLinkArr = [
  {
    label: "Terms and conditions",
    redirectLink: "/terms-and-conditions",
  },
  {
    label: "Disclaimer",
    redirectLink: "/disclaimer",
  },
  {
    label: "Privacy Policy",
    redirectLink: "/privacy-policy",
  },
];

const Footer = () => {
  return (
    <section className="h-auto w-full bg-[#18181B] py-3 ">
      <div className="container">
        <ul className="flex flex-row justify-between  items-center  ">
          {navLinkArr.map((link, idx) => {
            return (
              <li key={idx}>
                <Link
                  className="text-white text-sm font-normal leading-[142%] "
                  to={link.redirectLink}
                >
                  {" "}
                  {link.label}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
