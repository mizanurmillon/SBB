import React, { useEffect } from "react";

const Disclaimer = () => {
  
  useEffect(() => {
    document.title = "SBB - Disclaimer";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);
  
  return (
    <div className="container">
      <h1 className="text-center font-bold uppercase text-3xl font-sans py-5">
        DISCLAIMER
      </h1>

      <div className="space-y-4 leading-[140%] text-gray-100 mb-7">
        <p>
          Sports Bettors Bureau (SBB) is a public platform where users
          anonymously submit their own experiences, opinions, and observations
          related to sports events. All complaints, statements, and patterns
          shown on this platform are user generated content and reflect the
          views of individual bettors — not SBB.
        </p>
        <p>
          SBB does not verify, investigate, confirm, or guarantee the accuracy
          of any usersubmitted complaint. The presence of repeated complaints or
          “patterns” does not indicate proven wrongdoing, cheating,
          match-fixing, or intentional misconduct by players, referees, teams,
          coaches, or sportsbooks.
        </p>
        <p>
          SBB does not provide betting advice, predictions, guaranteed outcomes,
          or recommendations. Patterns displayed on the website are not
          indicators of future results and should not be interpreted as evidence
          that a game was rigged or improperly influenced.
        </p>
        <p>
          All information on SBB is for informational and entertainment purposes
          only. Users are solely responsible for how they interpret or use the
          information provided on the platform.
        </p>
      </div>

      <div className="px-3 py-3 border border-gray-300 rounded mb-3">
        <h3 className="text-gray-100 text-lg mb-2">
          By using SBB, you acknowledge that:
        </h3>
        <ul className="list-disc text-sm space-y-2 ms-5">
          <li>User reports may be incomplete, inaccurate, or biased</li>
          <li>Repeated complaints do not equal proof</li>
          <li>SBB does not endorse or confirm any claim</li>
          <li>SBB does not guarantee betting wins or improved outcomes</li>
        </ul>
      </div>

      <p className="text-gray-100 mb-10">
        If you believe a sporting event involves actual misconduct, you should
        contact the appropriate league, regulatory body, or law enforcement
        agency.
      </p>
    </div>
  );
};

export default Disclaimer;
