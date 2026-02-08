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

const WeeklyReport = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    document.title = "SBB - Weekly Report";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchWeeklyReport = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/complaint_weekly_report`,
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
        setWeeklyData(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyReport();
  }, []);

  return (
    <section className="h-auto w-full py-6 bg-black">
      <div className="container flex flex-col gap-y-[21.81px]">
        <div className="flex flex-col space-y-2.5 pb-3">
          <h2 className="text-[32px]  text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
            Weekly REPORTS
          </h2>
          <p className="text-[#888888] text-center text-lg">
            Early Trend Report
          </p>
          <p className="text-[#888888] text-center text-[15px] pb-2.5">
            Insights update as more complaints are submitted
          </p>
          <hr className="h-1 w-full bg-gray-700 " />
        </div>

        <ul className="flex flex-col gap-y-5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <WeeklyReportSkeleton key={i} />
            ))
          ) : weeklyData?.length > 0 ? (
            weeklyData?.map((report, idx) => {
              return (
                <li
                  key={idx}
                  className="flex flex-col gap-y-1 w-full border-b border-gray-700 last:border-b-0 pb-3"
                >
                  <div className="flex gap-0.5 items-start w-full justify-between">
                    <h2
                      dangerouslySetInnerHTML={{ __html: report?.type || "" }}
                      className="font-bold text-white"
                    />

                    {report?.is_most && (
                      <div className="text-xs rounded-[6px] px-2 py-1.5 bg-[#E7000B] font-bold uppercase text-[#18181B] inline-flex items-center">
                        Alerts
                      </div>
                    )}
                  </div>

                  <p className="py-1.5 leading-[150%] text-gray-50">
                    {report?.title}
                  </p>

                  <span className="text-base font-normal leading-[150%] text-gray-100">
                    {`${report?.complaints} complaints this week.`}
                  </span>
                </li>
              );
            })
          ) : (
            <p className="text-red-500 pt-5">No data found</p>
          )}
        </ul>

        <div className="p-3 rounded-lg bg-[#18181B]">
          <div className="flex gap-3 items-center mb-2.5">
            <Logo />
            <p className="text-[#FBF7CD]">Early Data Notice</p>
          </div>

          <p className="text-sm text-[#888888]">
            Weekly reports strengthen as more bettors submit complaints. You’re
            viewing early trend signals
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeeklyReport;
