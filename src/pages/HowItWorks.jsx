import React from "react";
import { useNavigate } from "react-router";

const workProcess = [
  {
    title: "Submit a Complaint",
    subTitle: "Fill out the complaint form",
  },
  {
    title: "Get Confirmation",
    subTitle: "Receive a Complaint ID",
  },
  {
    title: "View Complaint Feed",
    subTitle: "See what complaints other bettors are reporting",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <section className=" h-auto w-full bg-black py-6 ">
      <div className="container flex flex-col gap-y-[227.41px] ">
        <div className="flex flex-col gap-y-6 items-center ">
          <h2 className="text-[32px]  text-white font-bold leading-[112.5%] tracking-[0.32px]  uppercase text-center ">
            How it works?
          </h2>{" "}
          <hr className="h-1 w-full bg-[#E7000B] " />
          <ul className="flex flex-col gap-y-5  ">
            {workProcess.map((work, idx) => {
              return (
                <li className="flex  flex-row gap-x-6  " key={idx}>
                  <div className="h-[30px]! w-[30px]! rounded-full  flex items-center justify-center  text-lg text-white font-bold leading-[122%] bg-[#E7000B] ">
                    {idx + 1}
                  </div>
                  <div className="flex max-w-[288px] flex-col gap-y-1 ">
                    <h4 className="text-2xl text-white font-bold leading-[130%]  ">
                      {" "}
                      {work?.title}{" "}
                    </h4>
                    <span className="text-base  font-normal leading-[150%] text-white ">
                      {" "}
                      {work?.subTitle}{" "}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={() => {
            navigate(`/submit-application`);
          }}
          className="
              py-3.5 w-full cursor-pointer h-auto bg-[#E7000B]  rounded-lg  text-white font-bold leading-[150%] uppercase
            "
        >
          SUBMIT YOUR COMPLAINT
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
