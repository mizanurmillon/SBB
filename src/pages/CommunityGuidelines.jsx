const data = [
  {
    title: "Purpose of Sports Bettors Bureau",
    description:
      "Sports Bettors Bureau exists to give sports fans and bettors a place to express opinions, frustrations, and observations about games, players, referees, and outcomes.",
  },
  {
    title: "Freedom of Expression",
    description:
      "We support strong opinions, emotional reactions, and honest discussion. Users are free to describe how a game felt, what seemed unusual, or what did not make sense to them",
  },
  {
    title: "How to Phrase Complaints",
    description:
      "When describing a game, player, referee, or outcome, focus on what you observed and how it felt, rather than stating illegal behavior as fact.",
  },
  {
    title: "Instead of stating accusations as facts:",
    isList: true,
    lists: [
      "“This game was rigged.”",
      "“The ref was paid off.”",
      "“This was fraud.”",
    ],
  },
  {
    title: "Try phrasing it as an observation or opinion:",
    isList: true,
    lists: [
      "“The officiating felt suspicious late in the game.”",
      "“Several calls didn’t make sense in the final minutes.”",
      "“The outcome raised questions based on how the game was handled.”",
    ],
  },
  {
    title: "What’s Allowed",
    isList: true,
    lists: [
      "Expressing opinions and personal experiences",
      "Describing questionable or unusual moments",
      "Discussing officiating, performance, or outcomes.",
      "Highlighting patterns you personally observe.",
    ],
  },
  {
    title: "What’s Not Allowed",
    description:
      "Because SBB stores and organizes complaints, users may not post direct accusations of criminal or illegal behavior stated as fact.",
  },
  {
    title: "Moderation",
    description:
      "Posts containing high-risk language may be flagged and require rephrasing before publication. SBB does not verify, confirm, or endorse user opinions.",
  },
  {
    title: "User Responsibility",
    description: "Users are solely responsible for the content they submit.",
  },
  {
    title: "Agreement",
    description:
      "By using Sports Bettors Bureau, you agree to follow these Community Guidelines.",
  },
];

const CommunityGuidelines = () => {
  return (
    <div className="container">
      <h1 className="text-center font-bold uppercase text-[26px] font-sans py-5">
        SPORTS BETTORS BUREAU COMMUNITY GUIDELINES
      </h1>

      <h3 className="text-[19px] font-bold mb-2">
        Submitting a Complaint: Why It Matters
      </h3>

      <p className="text-gray-50 mb-3">
        The Submit Complaint form is the foundation of Sports Bettors Bureau
        (SBB). Every complaint helps identify patterns, trends, and recurring
        issues across games, players, referees, and sportsbooks.
      </p>

      <p className="text-gray-50 mb-8">
        Providing accurate and complete information allows SBB to organize
        complaints over time and turn individual experiences into meaningful
        insights.
      </p>

      <div className="space-y-5 mb-7">
        {data?.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <p className="shrink-0 size-5 mt-1 font-bold rounded-full grid place-items-center bg-[#E10600] text-white text-[12px]">
              {idx + 1}
            </p>

            <div>
              <h3 className="text-white font-semibold mb-1.5">{item?.title}</h3>

              {item?.isList ? (
                <ul className="list-disc text-[15px] space-y-1 ms-3">
                  {item?.lists?.map((list, idx) => (
                    <li key={idx}>{list}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-200 text-[15px]">{item?.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGuidelines;
