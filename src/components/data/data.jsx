export const sportsOptions = ["NFL", "NBA", "MLB", "NHL", "NCAAB", "Soccer"];

export const complaintOptions = [
  "Player Performance",
  "Team Performance",
  "Sportsbook",
  // "Game Result / Outcome",
];

export const severityOptions = [
  { label: "Minor Issue", count: "1" },
  { label: "Light Impact", count: "2" },
  { label: "Moderate Issue", count: "3" },
  { label: "Severe Issue", count: "4" },
  { label: "Critical Issue", count: "5" },
];

export const DEFAULT_VALUES = {
  sport: "",
  category: "",
  category_value: "",
  description: "",
  severity: "",
};

/* ===============================
   MODERATION LISTS (FULL SPEC)
================================ */

// STRICT BLOCK (violence)
export const VIOLENCE_WORDS = [
  "kill",
  "murder",
  "shoot",
  "stab",
  "hang",
  "hurt",
  "harm",
  "assault",
  "attack",
  "bomb",
  "blow up",
  "execute",
];

export const VIOLENCE_PHRASES = [
  "someone should kill",
  "someone needs to kill",
  "he should be killed",
  "they should die",
  "deserves to die",
  "should get shot",
  "i'll kill",
  "i will kill",
  "i'll hurt",
  "i'm going to hurt",
  "pull up on him",
  "kill the refs",
  "hurt the refs",
  "someone attack vegas",
  "burn the sportsbook",
];

// HARD BLOCK (hate)
export const HATE_WORDS = [
  "nigger",
  "nigga",
  "coon",
  "spic",
  "wetback",
  "beaner",
  "chink",
  "gook",
  "zipperhead",
  "slant",
  "raghead",
  "sand nigger",
  "towelhead",
  "camel jockey",
  "kike",
  "heeb",
  "jewboy",
  "gypsy",
  "paki",
  "terrorist",
  "ape",
  "monkey",
  "porch monkey",
  "sambo",
  "mulatto",
  "half-breed",
  "mongrel",
  "kraut",
  "fritz",
  "yankee",
  "gringo",
  "redskin",
  "eskimo",
  "chinaman",
  "polack",
  "fag",
  "faggot",
  "dyke",
  "queer",
  "homo",
  "no homo",
  "fairy",
  "fruit",
  "poof",
  "pansy",
  "bitch",
  "pussy",
];

export const HATE_PHRASES = [
  "that's so gay",
  "acting gay",
  "gay boy",
  "sissy",
  "tranny",
  "shemale",
  "he-she",
  "it gender",
  "attack helicopter",
];

// SOFT BLOCK (rephrase only)
export const DEFAMATION_WORDS = [
  "rigged",
  "fixed",
  "match fixing",
  "game fixing",
  "point shaving",
  "scripted",
  "paid off",
  "bribed",
  "bribe",
  "fraud",
  "fraudulent",
  "cheated",
  "cheating",
  "crime",
  "criminal",
  "corrupt",
  "stole",
  "theft",
  "scam",
  "scammed",
  "inside job",
  "set up",
  "cover up",
];

export const DEFAMATION_PHRASES = [
  "on purpose",
  "intentionally",
  "did it on purpose",
  "missed on purpose",
  "threw the game",
  "sold the game",
  "gave the game away",
  "let them win",
  "wanted to lose",
  "trying to lose",
  "wasn't trying",
  "didn't try",
  "clearly didn't try",
  "half-assed",
  "tanked",
  "tanking",
  "made sure they lost",
  "vegas made the call",
  "the books wanted this",
  "the league wanted this",
  "refs wanted them to win",
  "nba wanted",
  "nfl wanted",
  "ratings decision",
  "money decision",
  "they needed this win",
  "the system wanted",
];

export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: "50px",
    backgroundColor: state.isDisabled ? "#2a2a2a" : "transparent",
    borderColor: state.isDisabled ? "#2a2a2a" : "#364153",
    boxShadow: "none",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    opacity: state.isDisabled ? 0.6 : 1,
    "&:hover": {
      borderColor: state.isDisabled ? "#2a2a2a" : "#364153",
    },
    borderRadius: "8px",
  }),

  menu: base => ({
    ...base,
    backgroundColor: "#18181B",
    border: "1px solid #364153",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#364153"
      : state.isFocused
        ? "#27272A"
        : "#18181B",
    color: "white",
    cursor: "pointer",
  }),

  singleValue: base => ({
    ...base,
    color: "white",
  }),

  input: base => ({
    ...base,
    color: "white",
  }),
};

export const subCategoryOptionsMap = {
  "Player Performance": ["Player Prop", "General Performance"],
  "Team Performance": ["General Performance", "Game Outcome", "Team Prop"],
  "Sportsbook": ["Point Spread", "Total (Over/Under)", "Live Betting Line"],
  // "Game Result / Outcome": [
  //   "Officiating / Referee",
  //   "Coaching Decisions",
  //   "Unexpected Outcome",
  // ],
};
