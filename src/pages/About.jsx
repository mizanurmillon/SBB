import React, { useEffect } from "react";
const aboutData = [
  {
    title: "Our mission",
    sub_title: "Turning bettor complaints into data.",
    description:
      "Sports Bettors bureau is a bettor-powered data platform that collects and organizes real complaints to identify trends across games, players, referees, and betting lines.",
  },
  {
    title: "What makes sbb different",
    sub_title:
      "Individual complaints are opinions. Thousands of complaints become data.",
    description:
      "SB aggregates bettor experiences at scale to surface patterns that would otherwise go unnoticed.",
  },
  {
    title: "Why complaints matter",
    sub_title: "Structured complaints help:",
    features: [
      "Identify unusual game outcomes",
      "Highlight recurring officiating concerns",
      "Surface player performance anomalies",
      "Reveal betting lines drawing abnormal volume",
    ],
  },
  {
    title: "How it works",
    features: [
      "Submit complaints anonymously",
      "Complaints are categorized and stored as data",
      "Weekly reports show early trend signals",
      "Insights strengthen as more bettors participate",
    ],
  },
];

const About = () => {
  
  useEffect(() => {
    document.title = "SBB - About Us";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  return (
    <section className="h-auto w-full bg-black py-6 ">
      <div className="container flex flex-col items-center mb-3">
        <div className=" flex flex-col gap-y-6">
          <h2 className="text-3xl max-w-[352px] text-white font-bold leading-[112.5%] tracking-[0.32px] uppercase text-center">
            about SBB
          </h2>

          <div className="flex flex-col gap-y-5">
            {aboutData?.map((item, idx) => {
              return (
                <div key={idx} className="border-t border-[#E7000B] pt-4">
                  <h3 className="text-xl uppercase font-bold leading-[120%] text-[#E7000B] mb-2">
                    {item?.title}
                  </h3>

                  <h4 className="text-lg text-white mb-3">{item?.sub_title}</h4>

                  {item?.description && (
                    <p className="text-[#A8A8A8] text-[15px]">
                      {item?.description}
                    </p>
                  )}

                  {item?.features && (
                    <ul className="list-disc ms-5">
                      {item?.features?.map((feature, idx) => {
                        return (
                          <li
                            className="text-sm text-[#A8A8A8] leading-[170%]"
                            key={idx}
                          >
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {idx === 2 && (
                    <p className="text-[15px] text-[#A8A8A8] pt-2">
                      Accountability starts with volume, consistency, and data.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
