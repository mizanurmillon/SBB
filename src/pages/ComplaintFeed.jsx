import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  DropdownIcon,
  EmptyStar,
  FillStar,
  SearchIconGray,
} from "../components/SvgContainer/SvgContainer";
import { DateFormatter } from "../utils/DateFormatter";

const ComplaintSkeleton = () => {
  return (
    <div className="h-auto py-6.5 border-b border-[#2A2A2A] flex flex-col gap-y-2 px-2 animate-pulse">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-[#2A2A2A] rounded" />
        <div className="h-3 w-24 bg-[#2A2A2A] rounded" />
      </div>

      {/* Sport + player */}
      <div className="flex items-center gap-x-2 mt-1">
        <div className="h-4 w-12 bg-[#2A2A2A] rounded" />
        <div className="h-1 w-1 bg-[#444] rounded-full" />
        <div className="h-4 w-32 bg-[#2A2A2A] rounded" />
      </div>

      {/* Anonymous ID */}
      <div className="h-3 w-32 bg-[#2A2A2A] rounded mt-1" />

      {/* Description */}
      <div className="space-y-2 mt-3">
        <div className="h-3 w-full bg-[#2A2A2A] rounded" />
        <div className="h-3 w-11/12 bg-[#2A2A2A] rounded" />
        <div className="h-3 w-4/5 bg-[#2A2A2A] rounded" />
      </div>

      {/* Severity */}
      <div className="flex items-center gap-2 mt-3">
        <div className="h-3 w-16 bg-[#2A2A2A] rounded" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-5 bg-[#2A2A2A] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

const sportsOptions = [
  "NFL",
  "NBA",
  "MLB",
  "NHL",
  "NCAAF",
  "NCAAB",
  "Soccer",
  "UFC",
  "Tennis",
];

const complaintOptions = [
  "Player Performance",
  "Team Performance",
  "Betting Line / Spread / Total",
  "Officiating / Referee Call",
  "Game Result / Outcome",
];

const ComplaintFeed = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  const navigate = useNavigate();
  const sportDropdownRef = useRef(null);
  const complaintDropdownRef = useRef(null);

  const handleTabChange = tab => {
    setActiveTab(tab);
    if (tab === "All") {
      //
    } else {
      setOpenDropdown(prev => (prev === tab ? null : tab));
    }
  };

  const handleSelectSport = value => {
    setSelectedSport(value);
    setOpenDropdown(null);
  };

  const handleSelectComplaint = value => {
    setSelectedCategory(value);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        sportDropdownRef.current &&
        !sportDropdownRef.current.contains(event.target) &&
        complaintDropdownRef.current &&
        !complaintDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);

      const queryParams = ["order=created_at.desc"];
      if (selectedCategory) queryParams.push(`category=eq.${selectedCategory}`);
      if (selectedSport) queryParams.push(`sport=eq.${selectedSport}`);
      if (search) {
        const encodedSearch = encodeURIComponent(search);
        queryParams.push(
          `or=(` +
            `category_value.ilike.*${encodedSearch}*,` +
            `category.ilike.*${encodedSearch}*,` +
            `sport.ilike.*${encodedSearch}*,` +
            `description.ilike.*${encodedSearch}*` +
            `)`,
        );
      }

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/complaints${queryString}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Fetch error:", text);
          return;
        }

        const data = await response.json();
        setComplaints(data);
        // setFilteredComplaints(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [selectedCategory, selectedSport, search]);

  return (
    <section className="h-auto w-full bg-black pt-3 pb-6">
      <div className="container flex flex-col gap-y-4">
        {/* Logo & Searchbar */}
        <div className="flex w-full relative flex-col gap-y-4">
          <h2 className="text-[22px] text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
            COMPLAINT FEED
          </h2>

          <hr className="h-[1px] w-full !text-transparent bg-[#E7000B]" />

          <div className="relative w-full mt-1">
            <input
              className="w-full px-10 py-2.5 outline-none border border-[#333333] rounded-xl font-normal text-[#A8A8A8] bg-[#111111] text-base md:text-sm placeholder:text-[#A8A8A8]"
              type="text"
              placeholder="Search complaints..."
              onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIconGray />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          {/* All */}
          <button
            onClick={() => {
              handleTabChange("All");
              setSelectedCategory("");
              setSelectedSport("");
            }}
            className={`transition px-2.5 py-1.5 text-[12px] rounded-full ${
              activeTab === "All"
                ? "bg-[#E7000B] text-white"
                : "bg-[#111111] border border-[#333333] text-white"
            }`}
          >
            All
          </button>

          {/* Sport Filter */}
          <div className="relative" ref={sportDropdownRef}>
            <button
              onClick={() => handleTabChange("sport")}
              className={`flex flex-row gap-x-1 px-3 py-1.5 items-center text-[12px] transition rounded-full ${
                activeTab === "sport" || selectedSport
                  ? "bg-[#E7000B] text-white"
                  : "bg-[#111111] text-white border border-[#333]"
              }`}
            >
              {selectedSport ? selectedSport : "Filter by Sport"}
              <DropdownIcon />
            </button>

            {openDropdown === "sport" && (
              <div className="absolute top-12 left-0 w-[183px] bg-[#18181B] rounded-lg shadow-md py-2 flex flex-col">
                {sportsOptions.map((option, index) => (
                  <div key={index}>
                    <div
                      onClick={() => handleSelectSport(option)}
                      className={`px-4 py-2 text-[12px] font-normal capitalize text-white cursor-pointer transition ${
                        selectedSport === option
                          ? "bg-[#E7000B] text-white"
                          : "hover:bg-[#2A2A2D]"
                      }`}
                    >
                      {option}
                    </div>
                    {index < sportsOptions.length - 1 && (
                      <hr className="border-[0.5px] border-solid border-gray-700 " />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Complaint Filter */}
          <div className="relative" ref={complaintDropdownRef}>
            <button
              onClick={() => handleTabChange("complaint")}
              className={`flex flex-row gap-x-1 px-3 py-1.5 items-center text-[12px] transition rounded-full ${
                activeTab === "complaint" || selectedCategory
                  ? "bg-[#E7000B] text-white"
                  : "bg-[#111111] text-white border border-[#333]"
              }`}
            >
              {selectedCategory ? selectedCategory : "Filter by Complaint"}
              <DropdownIcon />
            </button>

            {openDropdown === "complaint" && (
              <div className="absolute top-12 -left-20 w-[230px] bg-[#18181B] rounded-lg shadow-md py-2 flex flex-col">
                {complaintOptions.map((option, index) => (
                  <div key={index}>
                    <div
                      onClick={() => handleSelectComplaint(option)}
                      className={`px-4 py-2 text-[12px] font-normal capitalize text-white cursor-pointer transition ${
                        selectedCategory === option
                          ? "bg-[#E7000B] text-white"
                          : "hover:bg-[#2A2A2D]"
                      }`}
                    >
                      {option}
                    </div>
                    {index < complaintOptions.length - 1 && (
                      <hr className="border-[0.5px] border-solid border-gray-700 " />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* All Complaints List */}
        <div>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ComplaintSkeleton key={i} />
            ))
          ) : complaints?.length > 0 ? (
            complaints?.map((complain, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/complaint/${complain?.id}`)}
                className="h-auto py-6.5 border-b border-[#2A2A2A] flex flex-col gap-y-1.5 cursor-pointer px-2"
              >
                <div className="flex items-center justify-between text-[#A8A8A8] text-xs mb-1.5">
                  {/* Category */}
                  <p className="uppercase">{complain?.category}</p>

                  {/* Date */}
                  <p>{DateFormatter(complain?.created_at)}</p>
                </div>

                <div className="flex flex-row items-center gap-x-1 ">
                  {/* Sport */}
                  <h6 className="font-bold mb-0.5">{complain?.sport}</h6>

                  {complain?.category_value && (
                    <span className="h-1 w-1 bg-[#D9D9D9] rounded-full" />
                  )}

                  {/* Category Value */}
                  <p className="text-sm font-normal leading-[171.429%] text-white truncate">
                    {complain?.category_value}
                  </p>
                </div>

                <p className="text-[#A8A8A8] text-xs">
                  {/* Dynamic ID */}
                  Anonymous SBB-{complain?.id}
                </p>

                {/* Desc */}
                <p className="text-sm text-[#A8A8A8] my-3.5">
                  {complain?.description}
                </p>

                {/* Severity Level */}
                <div className="text-xs flex items-center gap-1">
                  <span className="text-[#A8A8A8]">SEVERITY:</span>
                  <span className="text-[#FFA500]">
                    {+complain?.severity === 1
                      ? "Low"
                      : +complain?.severity === 2 || +complain?.severity === 3
                        ? "Med"
                        : +complain?.severity === 4 || +complain?.severity === 5
                          ? "High"
                          : ""}
                  </span>

                  {/* Severity Count */}
                  <div className="flex gap-x-1 pl-1">
                    {Array.from({ length: +complain?.severity }).map((_, i) => (
                      <FillStar key={i} className="size-5 " />
                    ))}
                    {Array.from({ length: 5 - +complain?.severity }).map(
                      (_, i) => (
                        <EmptyStar key={i} className="size-5 " />
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-500 pt-5">No data found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ComplaintFeed;
