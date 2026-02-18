import React, { useEffect, useState } from "react";
import { Logo } from "../components/SvgContainer/SvgContainer";

const WeeklyReportSkeleton = () => {
  return (
    <li className="flex flex-col gap-y-1 w-full animate-pulse">
      <div className="flex flex-row items-start w-full justify-between">
        <div className="h-[20px] w-[220px] bg-[#2A2A2A] rounded-md" />
        <div className="h-[18px] w-[50px] bg-[#2A2A2A] rounded-md" />
      </div>
      <div className="h-[17px] w-[140px] bg-[#2A2A2A] rounded-md mt-1" />
      <div className="h-[15px] w-[190px] bg-[#2A2A2A] rounded-md mt-1" />
      <div className="h-[1px] w-full bg-[#333] mt-2" />
    </li>
  );
};

const DataNotice = () => {
  const [dataView, setDataView] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "SBB - Live data view";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchDataView = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/complaints`,
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
        setDataView(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataView();
  }, []);

  return (
    <section className="h-auto w-full py-6 bg-black">
      <div className="container flex flex-col gap-y-[21.81px]">
        <div className="flex flex-col space-y-2.5 pb-3 border-b-2 border-gray-500">
          <h2 className="text-[32px]  text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
            live Data View
          </h2>
          <p className="text-[#888888] text-center text-lg">Live Updating</p>
          <p className="text-[#888888] text-center text-[15px] pb-3">
            Insights update as more complaints are submitted
          </p>
        </div>

        <ul className="flex flex-col gap-y-5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <WeeklyReportSkeleton key={i} />
            ))
          ) : (
            <div className="space-y-5">
              {/* Overview Summary */}
              <div className="flex flex-col gap-y-1 w-full border-b border-[#a8a8a850] space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">Overview Summary</h2>

                <div className="flex gap-2 items-center justify-between">
                  <p className="text-[#A8A8A8] text-sm">
                    Total Complaints (Last 24H)
                  </p>

                  <p className="text-sm text-[#A8A8A8]">
                    {dataView?.overview_summary?.total_complaints}
                  </p>
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <p className="text-[#A8A8A8] text-sm">High Severity</p>

                  <p className="text-sm text-[#A8A8A8]">
                    {dataView?.overview_summary?.high_severity_percentage}%
                  </p>
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <p className="text-[#A8A8A8] text-sm">Change vs prior 24H</p>

                  <p className="text-sm text-red-500">
                    +{dataView?.change_vs_prior_24h?.percent_change}%
                  </p>
                </div>
              </div>

              {/* About Team */}
              <div className="flex flex-col gap-y-1 w-full border-b border-gray-700 last:border-b-0 space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">
                  Most Complained About Team
                </h2>

                <div className="flex gap-2 items-center justify-between">
                  <p className="text-[#A8A8A8] text-sm">Miami Hurricanes</p>

                  <p className="text-sm text-[#A8A8A8]">
                    {dataView?.most_complained_team?.total} complaints
                  </p>
                </div>
              </div>

              {/* Top 3 Players (Last 24H) */}
              <div className="flex flex-col gap-y-1 w-full border-b border-[#a8a8a850] space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">
                  Top 3 Players (Last 24H)
                </h2>

                {dataView?.top_players?.map((player, idx) => (
                  <div
                    key={player?.total}
                    className="flex gap-2 items-center justify-between"
                  >
                    <p className="text-[#A8A8A8] text-sm">
                      {idx + 1}. {player?.category_value}
                    </p>

                    <p className="text-sm text-[#A8A8A8]">
                      {player?.total} complaints
                    </p>
                  </div>
                ))}
              </div>

              {/* Top Sport (Last 24H) */}
              <div className="flex flex-col gap-y-1 w-full border-b border-gray-700 last:border-b-0 space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">
                  Top Sport (Last 24H)
                </h2>

                <div className="flex gap-2 items-center justify-between">
                  <p className="text-[#A8A8A8] text-sm">
                    {dataView?.top_sport?.sport}
                  </p>

                  <p className="text-sm text-[#A8A8A8]">
                    {dataView?.top_sport?.total} complaints
                  </p>
                </div>
              </div>

              {/* Most Complained About Bet Type */}
              <div className="flex flex-col gap-y-1 w-full border-b border-[#a8a8a850] space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">
                  Most Complained About Bet Type
                </h2>

                {dataView?.top_bet_types?.map(bet => (
                  <div
                    key={bet?.total}
                    className="flex gap-2 items-center justify-between"
                  >
                    <p className="text-[#A8A8A8] text-sm">
                      {bet?.category_value}
                    </p>

                    <p className="text-sm text-[#A8A8A8]">
                      {bet?.total} complaints
                    </p>
                  </div>
                ))}
              </div>

              {/* Complaint-to-Game Ratio */}
              <div className="flex flex-col gap-y-1 w-full border-b border-[#a8a8a850] space-y-0.5 pb-5">
                <h2 className="font-bold text-white pb-1">
                  Complaint-to-Game Ratio
                </h2>

                {dataView?.complaint_to_game_ratio?.map(bet => (
                  <div key={bet?.total} className="flex gap-2 items-center">
                    <p className="text-[#A8A8A8] text-sm">{bet?.sport}: </p>

                    <p className="text-sm text-[#A8A8A8]">
                      {bet?.avg_complaints} complaints
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ul>

        <div className="p-3 rounded-lg bg-[#18181B]">
          <div className="flex gap-3 items-center mb-2.5">
            <Logo />
            <p className="text-[#FBF7CD]">Early Data Notice</p>
          </div>

          <p className="text-sm text-[#888888]">
            Live Data View strengthen as more bettors submit complaints. You’re
            viewing early trends signals
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataNotice;
