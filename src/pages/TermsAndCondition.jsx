import React, { useEffect } from "react";
const data = [
  {
    title: "Nature of the Platform",
    description:
      "SBB is a public, anonymous, user-generated complaint board where individuals can submit their own experiences, opinions, and observations related to sports events, betting outcomes, or perceived issues. All content posted on SBB reflects the views of individual users and not the views of SBB. SBB does not verify, validate, investigate, or confirm the accuracy of any complaint or submission.",
  },
  {
    title: "No Betting Advice or Predictions",
    description:
      "SBB does not provide legal advice, betting recommendations, predictions, or guaranteed outcomes. Any trends or patterns displayed represent aggregated user submissions only and should not be interpreted as proof of wrongdoing or legitimacy.",
  },
  {
    title: "No Claims About Rigged Games or Misconduct",
    description:
      "SBB does not claim or imply that any athlete, team, official, coach, league, or sportsbook has engaged in cheating, game fixing, or wrongdoing. User complaints may be biased, inaccurate, or opinion-based. Repeated complaints do not constitute factual confirmation.",
  },
  {
    title: "User Responsibilities",
    description:
      "You agree to submit only content reflecting your own experiences or opinions, avoid false or defamatory statements, avoid spam or automated submissions, and comply with Community Standards. SBB may remove or restrict submissions that violate these requirements.",
  },
  {
    title: "Platform Integrity & Abuse Prevention",
    description:
      "Sports Bettors Bureau reserves the right to limit, delay, restrict, or prevent submissions that are duplicative, excessive, automated, or otherwise disruptive to the platform. Users acknowledge that submissions may be subject to automated systems designed to protect platform integrity, and that not all submissions are guaranteed to appear in public feeds or analytics.",
  },
  {
    title: "Limitation of Liability",
    description:
      "To the fullest extent permitted by law, SBB is not liable for any losses, decisions, or damages resulting from use of the platform. The platform is provided as is without warranties of any kind.",
  },
  {
    title: "No Guarantee of Service Availability",
    description:
      "SBB does not guarantee uptime, data accuracy, or uninterrupted access and may modify or discontinue features at any time",
  },
  {
    title: "Intellectual Property",
    description:
      "All SBB branding and platform elements belong to Sports Bettors Bureau. Usersubmitted content remains the property of the user, but users grant SBB a royalty-free license to display and distribute submissions.",
  },
  {
    title: "Governing Law",
    description:
      "These Terms are governed by the laws of the jurisdiction in which SBB operates.",
  },
  {
    title: "Changes to These Terms",
    description:
      "SBB may update these Terms at any time. Continued use of the platform constitutes acceptance of any updates.",
  },
];

const TermsAndCondition = () => {
  
  useEffect(() => {
    document.title = "SBB - Terms And Conditions";

    // reset to default title on unmount
    return () => {
      document.title = "SBB - Serving Sports Fans. Anytime. Anywhere.";
    };
  }, []);

  return (
    <div className="container">
      <h1 className="text-center font-bold uppercase text-[26px] font-sans py-5">
        SPORTS BETTORS BUREAU (SBB) – TERMS OF USE
      </h1>

      <div className="space-y-5 mb-7">
        {data?.map(item => (
          <div key={item?.title}>
            <h3 className="text-white font-semibold text-lg mb-1">
              {item?.title}
            </h3>

            <p className="text-gray-200">{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndCondition;
