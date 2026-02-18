import React, { useEffect } from "react";
import { GreenTick } from "../components/SvgContainer/SvgContainer";
import { useNavigate, useSearchParams } from "react-router";

const ComplainField = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    document.title = "SBB - COMPLAINT FIELD";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  return (
    <section className="h-auto py-9 w-full bg-black ">
      <div className="container flex flex-col gap-y-[198.07px]  items-center ">
        <div className="flex flex-col items-center gap-y-6">
          <div className="h-[63.9px] w-[63.9px] border-[3.58px] border-solid rounded-full border-[#00C950] flex items-center justify-center ">
            <GreenTick />
          </div>
          <div className="flex items-center flex-col gap-y-[21.8px]">
            <div className="flex flex-col gap-y-1 items-center ">
              <h2 className="text-[32px] max-w-[352px] text-white font-bold leading-[112.5%] tracking-[0.32px]  uppercase text-center">
                Your complaint has been filed
              </h2>
              <span className="text-[#6A7282] font-normal  leading-[142%] ">
                Thank you for your submission.
              </span>
            </div>

            <div className="flex flex-col gap-y-1 ">
              <span className="text-base font-normal leading-[150%]  text-[#6A7282] uppercase">
                Complaint ID
              </span>
              <p className="text-white  text-base font-normal leading-[150%]">
                #SBB-{id}
              </p>
            </div>

            <div className="flex w-full relative flex-col gap-y-3">
              <button
                onClick={() => {
                  navigate(`/live-data`);
                }}
                className="py-3.5 w-full cursor-pointer h-auto bg-[#E7000B]  rounded-lg  text-white font-bold leading-[150%] uppercase"
              >
                Live Data View
              </button>

              <button
                onClick={() => {
                  navigate(`/submit-application`);
                }}
                className="py-3.5 w-full cursor-pointer h-auto border border-solid border-[#E7000B]  rounded-lg  text-white font-bold leading-[150%] uppercase"
              >
                SUBMIT ANOTHER COMPLAINT
              </button>
            </div>
          </div>
        </div>

        <span className="text-[#6A7282] font-normal leading-[142%]">
          Powered by Sports Bettor Bureau
        </span>
      </div>
    </section>
  );
};

export default ComplainField;
