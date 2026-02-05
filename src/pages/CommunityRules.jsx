const data = [
  {
    title: "No Criminal Accusations Stated as Fact",
    description:
      "Users may not state or imply that any individual or entity committed crimes or illegal acts as fact. This includes, but is not limited to, bribery, corruption, fraud, fixing games, or being paid off.",
  },
  {
    title: "Opinion-Based Content Only",
    description:
      "All submissions must be framed as personal opinion, observation, or experience. Statements presented as verified facts or accusations are prohibited.",
  },
  {
    title: "No Hate Speech, Harassment, or Threats",
    description:
      "Content that targets, insults, demeans, or threatens an individual or group is not allowed. This includes harassment based on race, ethnicity, nationality, religion, sexual orientation, gender or gender identity, disability, age, or any other protected characteristic. Violent language, threats, or encouragement of harm are strictly prohibited.",
  },
  {
    title: "No Naming Private Individuals",
    description:
      "Users may not identify private individuals who are not public figures. This includes non-public persons involved in games, betting, or operations.",
  },
  {
    title: "No Impersonation or False Authority",
    description:
      "Users may not claim insider knowledge, official authority, verification, or special access they do not possess.",
  },
  {
    title: "No Spam or Manipulation",
    description:
      "Repeated or duplicative submissions intended to flood the platform, manipulate trends, or mislead users are prohibited.",
  },
  {
    title: "Moderation & Enforcement",
    description:
      "SBB reserves the right to limit, delay, restrict, remove, or decline any submission at its discretion to protect platform integrity and user safety.",
  },
  {
    title: "No Verification Disclaimer",
    description:
      "SBB does not independently verify user submissions. Content reflects user opinion only and does not represent confirmed facts or conclusions.",
  },
  {
    title: "Consequences",
    description:
      "Violations may result in content removal, posting restrictions, cooldowns, shadowlimiting, temporary suspension, or permanent removal from the platform.",
  },
  {
    title: "Acceptance",
    description:
      "By using Sports Bettors Bureau, you agree to comply with these Community Rules. Continued use of the platform constitutes acceptance of enforcement actions.",
  },
];

const CommunityRules = () => {
  return (
    <div className="container">
      <h1 className="text-center font-bold uppercase text-[26px] font-sans py-5">
        SPORTS BETTORS BUREAU (SBB) COMMUNITY RULES
      </h1>

      <h3 className="text-[19px] font-bold mb-1">Purpose</h3>

      <p className="text-gray-50 mb-7">
        The Community Rules exist to protect users, individuals referenced on
        the platform, and Sports Bettors Bureau (SBB). These rules outline
        enforceable standards for participation and apply to all submissions,
        comments, and interactions.
      </p>

      <div className="space-y-5.5 mb-7">
        {data?.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <p className="shrink-0 size-5 mt-1 font-bold rounded-full grid place-items-center bg-[#E10600] text-white text-[12px]">
              {idx + 1}
            </p>

            <div>
              <h3 className="text-white font-semibold mb-1.5">{item?.title}</h3>
              <p className="text-gray-200 text-[15px]">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityRules;
