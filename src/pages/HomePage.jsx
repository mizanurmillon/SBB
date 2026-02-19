import React, { useEffect, useMemo, useState } from "react";
import {
  CrossMark,
  FileIcon,
  SearchIcon,
  WeeklyReport,
  HowItWorksIcon,
} from "../components/SvgContainer/SvgContainer";
import { Link, useNavigate } from "react-router";
import { useStore } from "../store/useStore";
import { FaArrowRightLong } from "react-icons/fa6";

const navLinks = [
  { path: "/", label: "Home" },
  // { label: "Complaint feed", path: "/complaint-feed" },
  { label: "Submit a complaint", path: "/submit-application" },
  { label: "Community Standards", path: "community-standards" },
  { label: "Live Data View", path: "/live-data" },
  { label: "how it works", path: "/how-it-works" },
  { label: "about sbb", path: "/about" },
  { label: "contact/support", path: "/contact" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalComplaintCount, setTotalComplaintCount] = useState(null);
  const { isMenuOpen, toggleMenu } = useStore();

  const handleLinkClick = link => {
    navigate(link);
    setTimeout(() => {
      toggleMenu();
    }, 100);
  };

  const memoizedNavLinks = useMemo(() => navLinks, []);

  // Data fetching
  useEffect(() => {
    const fetchComplaintsCount = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/complaints_total_count`,
          {
            method: "GET",
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Fetch error:", text);
          return;
        }

        const data = await response.json();
        setTotalComplaintCount(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsCount();
  }, []);

  return (
    <section className="w-full px-2 bg-black py-6">
      <div className="container w-full relative flex flex-col gap-y-6 items-center">
        {isMenuOpen ? (
          <div className="flex flex-col gap-y-42.75 items-center pb-5">
            <div className="flex flex-col gap-y-6 items-center justify-center">
              <h1 className="text-[32px] max-w-[318px] text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
                THE OFFICIAL COMPLAINT PLATFORM FOR SPORTS BETTORS
              </h1>

              <button
                onClick={() => {
                  navigate(`/submit-application`);
                }}
                className="py-3.5 w-full cursor-pointer h-auto bg-[#E7000B] rounded-lg text-white font-bold leading-[150%] uppercase"
              >
                SUBMIT YOUR COMPLAINT
              </button>

              <p className="text-sm font-normal leading-[142%] text-[#99A1AF] text-center pb-1">
                File player complaints, Report suspicious games, Hold players,
                teams, and refs accountable
              </p>

              <p className="border-b-2 w-10/12 mx-auto border-[#B0B0B0]"></p>

              <p className="text-sm leading-[142%] text-[#99A1AF] text-center uppercase">
                live complaints field
              </p>

              <h3 className="text-4xl -my-4 font-bold text-white">
                {loading ? "—" : totalComplaintCount}
              </h3>

              <p className="text-sm leading-[142%] text-[#99A1AF] text-center pb-1 uppercase">
                Across all major sports
              </p>

              <Link
                to="/live-data"
                className="border border-[#2A2A2A] rounded-lg px-10 tracking-[1.5px] py-3 cursor-pointer flex flex-col items-center justify-center font-bold"
              >
                <p className="text-sm text-white text-center pb-1 uppercase flex items-center gap-3">
                  Live Data view <FaArrowRightLong className="text-lg" />
                </p>
                <p className="text-xs font-normal text-[#B0B0B0] text-center pb-1">
                  Real-time complaint activity
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="pb-25.5 pt-29 w-full">
            <ul className="flex flex-col gap-y-6 items-center justify-center">
              {memoizedNavLinks?.map((navLink, idx) => {
                return (
                  <li
                    onClick={() => handleLinkClick(navLink.path)}
                    className="w-full relative items-center flex flex-col gap-y-2.5 text-base font-normal leading-[150%] uppercase text-white "
                    key={idx}
                  >
                    {navLink.label}
                    <hr className="text-[#1E2939] border-b-[1.2px] border-solid w-full" />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
