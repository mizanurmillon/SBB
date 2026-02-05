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

const navLinks = [
  { path: "/", label: "Home" },
  { label: "Complaint feed", path: "/complaint-feed" },
  { label: "Submit a complaint", path: "/submit-application" },
  { label: "Community Standards", path: "community-standards" },
  { label: "weekly report", path: "/weekly-report" },
  { label: "how it works", path: "/how-it-works" },
  { label: "about sbb", path: "/about" },
  { label: "contact/support", path: "/contact" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalComplaintCount, setTotalComplaintCount] = useState(null);
  const { isMenuOpen, toggleMenu, closeMenu } = useStore();

  const handleLinkClick = link => {
    navigate(link);
    setTimeout(() => {
      toggleMenu();
    }, 100);
  };

  const reportSyestem = [
    {
      svg: FileIcon,
      label: loading ? "—" : totalComplaintCount,
      subTitle: "complaints filed",
      link: "complaint-feed",
    },
    {
      svg: HowItWorksIcon,
      label: "How it works",
      subTitle: "major sports",
      link: "how-it-works",
    },
    {
      svg: WeeklyReport,
      label: "Weekly",
      subTitle: "report",
      link: "weekly-report",
    },
  ];

  // const memoizedReports = useMemo(() => reportSyestem, []);
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
          <div className="flex flex-col gap-y-42.75 items-center">
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

              <p className="text-sm font-normal leading-[142%] text-[#99A1AF] text-center">
                File player complaints, Report suspicious games, Hold players,
                teams, and refs accountable
              </p>

              <ul className="flex flex-row items-center w-full justify-between">
                {reportSyestem?.map((report, idx) => {
                  const Svg = report.svg;
                  return (
                    <Link
                      to={report?.link}
                      key={idx}
                      className="flex cursor-pointer items-center flex-col gap-y-1.5"
                    >
                      <div className="flex flex-col gap-y-2 items-center">
                        <Svg />
                        <h5 className="text-sm text-white font-normal leading-[142%]">
                          {report.label}
                        </h5>
                      </div>
                      <span className="text-xs font-normal leading-[125%] text-white">
                        {report.subTitle}
                      </span>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <p className="text-xs font-normal leading-[162.5%] text-white text-center">
              Powered by Sports Bettors Bureau - built to protect the bettor's
              voice.
            </p>
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
