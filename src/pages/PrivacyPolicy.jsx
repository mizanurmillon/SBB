import React from "react";
const data = [
  {
    title: "Introduction",
    description:
      "Sports Bettors Bureau (“SBB,” “we,” “our”) operates a public platform where bettors can anonymously submit and view complaints about sports events, officiating, player performance, betting lines, and related topics. This Privacy Policy explains what information we collect, how we store it, and how we protect user anonymity.",
  },
  {
    title: "What Information We Collect",
    description:
      "SBB does NOT collect or store personal user identity information such as personal names, email addresses, phone numbers, accounts, login credentials, or device identifiers. When a user submits a complaint, the following NON-personal fields are stored: sport, complaint category, summary/title, description, severity rating, player/team/referee/bet data (if included), and timestamp.",
  },
  {
    title: "Anonymous Submissions",
    description:
      "SBB is intentionally designed as an anonymous complaint platform. We do not create user accounts, require login, link complaints to individuals, or track users. Once a complaint is submitted, it becomes part of the public feed.",
  },
  {
    title: "How Complaints Are Stored",
    description:
      "Complaints are stored in a secure Supabase database. Supabase provides encrypted data storage, secure API access, restricted permissions, and real-time updates. Only authorized system processes can modify complaint data",
  },
  {
    title: "Public Display of Complaints",
    description:
      "All complaints submitted become publicly visible. They may appear in feeds, filters, searches, and weekly reports. Complaints cannot be edited or removed by the user after submission. Submission indicates consent for public display",
  },
  {
    title: "Cookies & Tracking",
    description:
      "SBB does NOT use tracking cookies, ad pixels, or personalized tracking. Basic anonymous analytics may be collected for performance improvement but are NOT connected to individual complaints.",
  },
  {
    title: "Third-Party Services",
    description:
      "Third-party services we use include: Supabase (database + API), Carrd (front-end hosting), and CDN providers. These services do not receive personal user information.",
  },
  {
    title: "Data Security",
    description:
      "Data is protected through SSL encryption, row-level security, limited access control, and no personal data collection. Because complaints are anonymous, identity exposure risk is extremely low.",
  },
  {
    title: "Children's Privacy",
    description:
      "SBB is not intended for users under age 18. We do not knowingly collect data from minors.",
  },
  {
    title: "Changes to This Privacy Policy",
    description:
      "We may update this Privacy Policy as the platform evolves. Changes will be posted with a new 'Last Updated' date.",
  },
  {
    title: "Contact",
    description:
      "For questions about this Privacy Policy, contact us through the SBB website contact form.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <h1 className="text-center font-bold uppercase text-[26px] font-sans py-5">
        SPORTS BETTORS BUREAU (SBB) – PRIVACY POLICY
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

export default PrivacyPolicy;
