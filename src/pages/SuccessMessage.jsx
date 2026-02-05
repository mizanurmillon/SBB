import React from "react";
import { GreenTick } from "../components/SvgContainer/SvgContainer";
import { useNavigate } from "react-router";

const SuccessMessage = () => {
  const navigate = useNavigate();
  return (
    <section className="h-auto py-9 w-full bg-black ">
      <div className="container flex flex-col gap-y-[198.07px]  items-center ">
        <div className="flex flex-col items-center gap-y-6">
          <h2 className="text-[32px] max-w-[352px] text-white font-bold leading-[112.5%] tracking-[0.32px]  uppercase text-center ">
            Message sent
          </h2>

          <div className="h-[63.9px] w-[63.9px] border-[3.58px] border-solid rounded-full border-[#00C950] flex items-center justify-center ">
            <GreenTick />
          </div>

          <span className="text-[#6A7282] font-normal text-center  leading-[142%] ">
            Thank You for reaching out.We will respond within 24-48 hours
          </span>

          <button
            onClick={() => {
              navigate(`/`);
            }}
            className="
              py-3.5 w-full cursor-pointer h-auto bg-[#E7000B]  rounded-lg  text-white font-bold leading-[150%] uppercase
            "
          >
            Back to home
          </button>
        </div>
        <span className="text-[#6A7282] font-normal  leading-[142%] ">
          Powered by Sports Bettor Bureau
        </span>
      </div>
    </section>
  );
};

export default SuccessMessage;
