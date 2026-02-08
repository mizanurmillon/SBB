import React, { useEffect, useState } from "react";
import { EmptyStar, FillStar } from "../components/SvgContainer/SvgContainer";
import { useParams } from "react-router";
import { DateFormatter } from "../utils/DateFormatter";

const ComplaintsDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    document.title = `SBB - Complaint Details - ${id}`;

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/complaints?id=eq.${id}`,
      {
        method: "GET",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_KEY,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error("Fetch error:", text);
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => setDetailsData(data))
      .catch((error) => console.error("Unexpected error:", error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="h-screen w-full bg-black py-6">
      <div className="container flex flex-col gap-y-6.5 ">
        <div className="flex w-full relative flex-col gap-y-6">
          <h2 className="text-[32px]  text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
            COMPLAINT DETails
          </h2>

          <p className="h-0.5 w-full bg-[#E7000B]" />
          {loading ? (
            <div className="flex justify-center items-center w-full h-full py-10">
              <p
                className="size-10 border-4 border-t-red-600 border-b-gray-600 rounded-full animate-spin"
                style={{ borderColor: "#E7000B #2A2A2A #2A2A2A #2A2A2A" }}
              />
            </div>
          ) : (
            <div className="flex w-full relative flex-col gap-y-5">
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-2">
                  {/* Category */}
                  <h2 className="text-xl font-bold leading-[120%] text-white">
                    {detailsData?.[0]?.category}
                  </h2>

                  {/* Dynamic ID */}
                  <span className="text-sm font-normal leading-[128%] text-[#888]">
                    Submitted by Anonymous SBB-{detailsData?.[0]?.id}
                  </span>
                </div>

                <div className=" flex flex-col gap-y-3">
                  <div className="flex gap-5 justify-between">
                    <p className="flex gap-2 items-center">
                      <span className="text-sm font-normal leading-[140%] text-white">
                        {detailsData?.[0]?.category === "Player Performance"
                          ? "Player Name:"
                          : detailsData?.[0]?.category === "Team Performance"
                            ? "Team Name:"
                            : detailsData?.[0]?.category ===
                                "Betting Line / Spread / Total"
                              ? "Betting Line/ Spread/ Total:"
                              : detailsData?.[0]?.category ===
                                  "Officiating / Referee Call"
                                ? "Referee Name:"
                                : "Game Result / Outcome:"}
                      </span>

                      <span className="text-sm font-normal leading-[140%] text-white">
                        {detailsData?.[0]?.category_value}
                      </span>
                    </p>

                    <p className="text-sm font-normal leading-[140%] text-white shrink-0">
                      {detailsData?.[0]?.sport}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-sm font-normal leading-[140%] text-white  ">
                      Severity:
                    </span>

                    <div className="leading-[140%] text-white flex gap-x-1">
                      {Array.from({
                        length: +detailsData?.[0]?.severity,
                      }).map((_, idx) => (
                        <FillStar key={idx} className="size-5" />
                      ))}
                      {Array.from({
                        length: 5 - +detailsData?.[0]?.severity,
                      }).map((_, idx) => (
                        <EmptyStar key={idx} className="size-5" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-sm font-normal leading-[140%] text-white  ">
                      Reported on:
                    </span>

                    <p className="text-sm font-normal leading-[140%] text-white  ">
                      {DateFormatter(detailsData?.[0]?.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="bg-gray-200 w-full h-0.5" />

              <p className="text-base font-normal leading-[150%] text-white">
                {detailsData?.[0]?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ComplaintsDetails;
