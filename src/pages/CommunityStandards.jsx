import React, { useEffect } from "react";
import clipboard from "../assets/img/clipboard.png";
import privacy from "../assets/img/privacy.png";
import { ArrowIcon } from "../components/SvgContainer/SvgContainer";
import { Link } from "react-router";

const CommunityStandards = () => {
   
  useEffect(() => {
    document.title = "SBB - Community Standards";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  return (
    <section className="h-auto pb-5  pt-6 w-full bg-black">
      <div className="container flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3 ">
          <h2 className="text-2xl text-center font-bold leading-[200%] text-white ">
            Community Standards
          </h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-normal leading-[142%] max-w-[408px] text-[#A8A8A8]  ">
              Sports Bettors Bureau is built to give bettors a voice while
              keeping the platform fair, responsible, and sustainable.
            </p>
            <p className="text-sm font-normal leading-[142%] max-w-[408px] text-[#A8A8A8]  ">
              Community Standards explain how to participate, what's allowed,
              and how moderation works.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <div className="h-auto w-full bg-[#111] border border-solid border-[#2a2a2a] rounded-[14px] px-4 py-5 flex flex-col gap-y-4 ">
            <div className="flex flex-col gap-y-2.5  ">
              <div className="flex items-start flex-row gap-x-4 ">
                <img
                  src={clipboard}
                  alt="not found"
                  className="h-[34px] mt-1.5 w-[34px] object-cover"
                />
                <div className="flex flex-col gap-y-0.5">
                  <h5 className="text-lg font-[600] leading-[175%] text-white  ">
                    Community Guidelines
                  </h5>
                  <p className="text-sm font-normal leading-[171%] text-[#E10600]  ">
                    How to post responsibly
                  </p>
                </div>
              </div>
              <p className="text-[13px] font-normal leading-[130%] text-[#A8A8A8] ">
                The Community Guidelines explain how to submit complaints in a
                way that helps SBB track patterns and insights over time.
              </p>
            </div>
            <div className="flex flex-col gap-y-3 items-start  ">
              <div className="flex flex-col gap-y-1.5 ">
                <p className="text-[13px] font-normal leading-[130%] text-[#A8A8A8] ">
                  You should review these if you want to:
                </p>
                <ul className="flex flex-col gap-y-1">
                  <li className="flex flex-row gap-x-2 items-center ">
                    <span className="w-1 h-1 rounded-full bg-[#E10600] "></span>
                    <p className="text-xs font-normal leading-[166%] text-[#A8A8A8]  ">
                      Understand how the complaint system works
                    </p>
                  </li>
                  <li className="flex flex-row gap-x-2 items-center ">
                    <span className="w-1 h-1 rounded-full bg-[#E10600] "></span>
                    <p className="text-xs font-normal leading-[166%] text-[#A8A8A8]  ">
                      Learn how to describe suspicious or unusual situations
                    </p>
                  </li>
                  <li className="flex flex-row gap-x-2 items-center ">
                    <span className="w-1 h-1 rounded-full bg-[#E10600] "></span>
                    <p className="text-xs font-normal leading-[166%] text-[#A8A8A8]  ">
                      Know how to frame opinions and observations safely
                    </p>
                  </li>
                </ul>
              </div>
              <Link
                to="/community-guidelines"
                className="px-2 py-2.5 h-auto w-auto flex flex-row gap-1.5 items-center bg-[#E10600] text-white text-xs font-medium leading-[187.5%] rounded-[5px] cursor-pointer "
              >
                View Community Guidelines <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="h-auto w-full bg-[#111] border border-solid border-[#2a2a2a] rounded-[14px] px-4 py-5 flex items-start flex-col gap-y-4 ">
            <div className="flex flex-col gap-y-2.5  ">
              <div className="flex items-start flex-row gap-x-4 ">
                <img
                  src={privacy}
                  alt="not found"
                  className="h-[34px] mt-1.5 w-[34px] object-cover"
                />
                <div className="flex flex-col gap-y-0.5">
                  <h5 className="text-lg font-[600] leading-[175%] text-white  ">
                    Community Rules
                  </h5>
                  <p className="text-sm font-normal leading-[171%] text-[#E10600]  ">
                    What’s enforced
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-[13px] font-normal leading-[130%] text-[#A8A8A8] ">
                  The Community Rules define what is and isn't allowed on SBB
                  and how violations are handled.
                </p>
                <p className="text-[13px] font-normal leading-[130%] text-[#A8A8A8] ">
                  These rules exist to protect users, individuals referenced on
                  the platform, and SBB itself.
                </p>
              </div>
            </div>
            <Link
              to="/community-rules"
              className="px-2 py-2.5 h-auto w-auto flex flex-row gap-1.5 items-center bg-[#E10600] text-white text-xs font-medium leading-[187.5%] rounded-[5px] cursor-pointer "
            >
              View Community Rules <ArrowIcon />
            </Link>
          </div>

          <div className="h-auto w-full bg-[#111] border border-solid border-[#2a2a2a] rounded-[14px] px-4 py-5 flex items-start flex-col gap-y-5 ">
            <div className="flex flex-col gap-y-4">
              <h3 className="text-base uppercase leading-[125%] font-bold tracking-[0.2px] text-[#666666]   ">
                Important Notice
              </h3>
              <p className="text-[15px] font-normal  max-w-[368px] text-[#A8A8A8]   ">
                All content on Sports Bettors Bureau reflects user opinion only.
              </p>
              <p className="text-[15px] font-normal  max-w-[368px] text-[#A8A8A8]   ">
                SBB does not independently verify, confirm, or endorse user
                submissions.
              </p>
              <p className="text-[15px] font-normal  max-w-[368px] text-[#A8A8A8]   ">
                Submissions are used to identify trends and patterns, not to
                establish facts or wrongdoing.
              </p>
            </div>
            <span className="text-sm leading-[142%] tracking-[-0.15px] text-[#666666]   ">
              By using this platform, you agree to follow Community Standards.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStandards;
