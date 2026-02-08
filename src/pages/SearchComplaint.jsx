import React, { useEffect } from "react";
import { SearchIconGray } from "../components/SvgContainer/SvgContainer";

const complaintsDetails = [
  {
    title: "TRAE YOUNG",
    detail: "Unexpected benching after three quarters",
    sport: "Basketball",
    category: "Player",
  },
  {
    title: "LAKERS VS KINGS",
    detail: "Most free throw since 2004",
    sport: "Basketball",
    category: "Game",
  },
  {
    title: "SCOTT FOSTER",
    detail: "Critical late foul decision",
    sport: "Basketball",
    category: "Ref",
  },
  {
    title: "HOWKS +4.5",
    detail: "Critical late foul decision",
    sport: "Basketball",
    category: "Ref",
  },
  {
    title: "TRAE YOUNG",
    detail: "Unexpected benching after three quarters",
    sport: "Basketball",
    category: "Player",
  },
  {
    title: "SCOTT FOSTER",
    detail: "Critical late foul decision",
    sport: "Basketball",
    category: "Ref",
  },
];

const SearchComplaint = () => {
  const Tabs = ["player", "team", "ref", "game"];

  
  useEffect(() => {
    document.title = "SBB - Search Complaint";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  return (
    <section className="h-auto w-full py-6 bg-black">
      <div className="flex w-full container  relative flex-col gap-y-6">
        <h2 className="text-[32px]  text-white font-bold leading-[112.5%] tracking-[0.32px]  uppercase text-center ">
          COMPLAINT FEED
        </h2>{" "}
        <div className="relative w-full">
          <input
            className="w-full px-10 py-3.5 outline-none border border-solid rounded-md font-normal text-sm text-[#6A7282] bg-[#18181B]"
            type="text"
            placeholder="Search complaints..."
          />

          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIconGray />
          </div>
        </div>
        <span className="text-[#888] text-center text-sm font-normal leading-[128%] ">
          Search players, teams, refs, games,
        </span>
        <div className="flex justify-between w-full flex-row">
          {Tabs.map((tab, idx) => {
            return (
              <div
                key={idx}
                className="text-white font-bold leading-[112%] uppercase text-lg "
              >
                {" "}
                {tab}{" "}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col  items-start gap-y-[22px]  ">
          {complaintsDetails.map((complaint, idx) => {
            return (
              <div
                key={idx}
                className=" w-full relative  flex items-start  flex-col gap-y-1"
              >
                <h3
                  className="
                text-white font-bold leading-[125%] uppercase text-base "
                >
                  {" "}
                  {complaint.title}{" "}
                </h3>
                <span className="text-sm font-normal leading-[142%] text-white ">
                  {" "}
                  {complaint.detail}{" "}
                </span>
                <div className="flex flex-row gap-x-4 items-center ">
                  <span className="text-white font-normal leading-[142%] ">
                    {" "}
                    {complaint.sport}{" "}
                  </span>
                  <span className="text-white font-normal leading-[142%] ">
                    {" "}
                    {complaint.category}{" "}
                  </span>
                </div>
                <hr className="h-0.5 w-full bg-[#6A7282] " />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchComplaint;
