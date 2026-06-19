// lib/searchIndex.ts
import type { NavItem } from "@/types";

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
};

// ── Single source of truth: mirror of the header nav ──────────────────────────
const SEARCH_NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about/AboutKfas" },
      { label: "Our History", href: "/about/OurHistory" },
      { label: "Our Strategy", href: "/about/OurStrategy" },
      { label: "Board of Directors", href: "/about/BoardOfDirectors" },
      { label: "Our Team", href: "/about/our-team" },
    ],
  },
  {
    label: "Research",
    href: "/Research",
    children: [
      { label: "Grants", href: "/research/grants" },
      { label: "Activities and Events", href: "/research/ActivitiesAndEvents" },
      { label: "Assigned Studies", href: "/research/AssignedStudies" },
      { label: "Scientific Conference Sponsorship", href: "/research/SCS" },
      { label: "Technology Deployment", href: "/research/TechDeployment" },
      { label: "R&D in Private Sector", href: "/research/RandDPrivate" },
      { label: "KFAS Research Portal", href: "/research/KFASResearchPortal" },
    ],
  },
  {
    label: "Learning & Development",
    href: "/Learning-and-Development",
    children: [
      {
        label: "Researchers",
        href: "/Learning-and-Development/Researchers",
      },
      {
        label: "Professionals",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "Youth", href: "/Learning-and-Development/Youth" },
    ],
  },
  {
    label: "Science & Society",
    href: "/Science-and-Society",
    children: [
      {
        label: "Activities and Events Sponsorship",
        href: "/ScienceAndSociety/ActivitiesAndEventsSponsership",
      },
      { label: "Publications", href: "https://www.aspdkw.com/" },
      { label: "Special Needs", href: "/ScienceAndSociety/SpecialNeeds" },
    ],
  },
  {
    label: "Prizes",
    href: "/prizes",
    children: [
      { label: "Kuwait Prize", href: "/prizes/KuwaitPrize" },
      { label: "Jaber Al-Ahmed Prize", href: "/prizes/Jaber-AlAhmadPrize" },
      { label: "Al Sumait Prize", href: "/prizes/AlSumaitPrize" },
      { label: "Laureates", href: "/prizes/Laureates" },
    ],
  },
];

// ── Pages NOT in the header nav (Contact, Careers...). NO Home here. ──────────
const RESEARCHER_PROGRAMS: SearchItem[] = [
  {
    title: "International Collaborative Research",
    description:
      "Funding that enables Kuwaiti researchers to collaborate with leading international institutions on joint research projects.",
    url: "/Learning-and-Development/Researchers/International-Collaborative-Research",
    category: "Researchers",
    keywords: ["international", "collaboration", "joint research", "global"],
  },
  {
    title: "Scholar Fellowship",
    description:
      "Fellowship opportunities that support researchers in advancing their academic and scientific careers.",
    url: "/Learning-and-Development/Researchers/ScholarFellowship",
    category: "Researchers",
    keywords: ["fellowship", "scholar", "scholarship", "career"],
  },
  {
    title: "Scholarly Publication",
    description:
      "Support for publishing high-quality scientific research in reputable journals and outlets.",
    url: "/Learning-and-Development/Researchers/Scholarly-Publication",
    category: "Researchers",
    keywords: ["publish", "paper", "journal", "research paper", "publication"],
  },
  {
    title: "Scientific Missions",
    description:
      "Grants enabling researchers to participate in scientific missions, conferences, and field activities.",
    url: "/Learning-and-Development/Researchers/ScientificMissions",
    category: "Researchers",
    keywords: ["missions", "conference", "field", "travel"],
  },
  {
    title: "Scholarship Bridging Grant",
    description:
      "Bridging support for scholars transitioning between academic stages or programs.",
    url: "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
    category: "Researchers",
    keywords: ["bridging", "scholarship", "grant", "transition"],
  },
  {
    title: "Extension of Scholarship Bridging Grant",
    description:
      "Extended bridging support for eligible scholars who require additional time to complete their objectives.",
    url: "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
    category: "Researchers",
    keywords: ["extension", "bridging", "scholarship", "grant"],
  },
  {
    title: "PhD Students Supplementary Fund Grant",
    description:
      "Supplementary funding for PhD students to support research needs and doctoral studies.",
    url: "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
    category: "Researchers",
    keywords: ["phd", "doctoral", "supplementary", "students", "fund"],
  },
];

const EXTRA_PAGES: SearchItem[] = [...RESEARCHER_PROGRAMS];

// ── Extra keywords per URL (synonyms, abbreviations, Arabic terms…) ───────────
const KEYWORDS: Record<string, string[]> = {
  "/about": ["who we are", "mission", "vision", "values", "foundation", "kfas"],
  "/about/AboutKfas": ["who", "mission", "vision", "values", "foundation"],
  "/about/OurHistory": ["history", "anniversary", "50 years", "founded"],
  "/about/our-team": ["team", "staff", "people", "employees"],
  "/research/grants": [
    "funding",
    "fund",
    "money",
    "apply",
    "application",
    "grant",
  ],
  "/research/SCS": ["conference", "sponsorship", "scs", "event funding"],
  "/research/KFASResearchPortal": ["portal", "login", "submit", "apply online"],
  "/Learning-and-Development/Youth": ["students", "school", "young", "kids"],
  "/ScienceAndSociety/SpecialNeeds": [
    "disability",
    "disabled",
    "accessibility",
    "special needs",
  ],
  "/ScienceAndSociety/ActivitiesAndEventsSponsership": [
    "sponsorship",
    "events",
    "activities",
    "fund event",
  ],
  "https://www.aspdkw.com/": ["publications", "magazine", "books", "reports"],
  "/prizes/KuwaitPrize": ["award", "prize", "kuwait prize"],
  "/prizes/AlSumaitPrize": ["award", "prize", "africa", "sumait"],
  "/prizes/Laureates": ["winners", "recipients", "laureates"],
  // …add more URLs and terms here anytime
};

// Optional: nicer descriptions per URL. Missing ones fall back to "".
const DESCRIPTIONS: Record<string, string> = {
  "/about": "Learn about KFAS — mission, history, strategy and leadership.",
  "/about/AboutKfas": "Our mission and values.",
  "/about/OurHistory": "50 years of scientific progress.",
  "/about/OurStrategy": "Vision and strategic goals.",
  "/about/BoardOfDirectors": "Governance and leadership.",
  "/about/our-team": "Meet the KFAS team.",
  "/research/grants": "Funding opportunities and grant programs.",
  "/research/ActivitiesAndEvents": "Research activities and events.",
  "/research/AssignedStudies": "Assigned and commissioned studies.",
  "/research/SCS": "Scientific conference sponsorship.",
  "/research/TechDeployment": "Technology deployment programs.",
  "/research/RandDPrivate": "R&D support in the private sector.",
  "/research/KFASResearchPortal": "Access the KFAS research portal.",
  "/ScienceAndSociety/ActivitiesAndEventsSponsership":
    "Sponsorship for scientific activities and events.",
  "/ScienceAndSociety/SpecialNeeds": "Support programs for special needs.",
  "https://www.aspdkw.com/": "Science and society publications.",
  "/prizes/KuwaitPrize": "The Kuwait Prize for scientific achievement.",
  "/prizes/AlSumaitPrize": "The Al Sumait Prize.",
  "/prizes/Laureates": "Past prize laureates and winners.",
};

function keywordsFrom(label: string): string[] {
  return label
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1);
}

function flatten(items: NavItem[], category: string): SearchItem[] {
  const out: SearchItem[] = [];
  for (const item of items) {
    out.push({
      title: item.label,
      description: DESCRIPTIONS[item.href] ?? "",
      url: item.href,
      category,
      keywords: [...keywordsFrom(item.label), ...(KEYWORDS[item.href] ?? [])],
    });
    if (item.children?.length) {
      out.push(...flatten(item.children, category));
    }
  }
  return out;
}

export const searchIndex: SearchItem[] = (() => {
  const derived = SEARCH_NAV.flatMap((top) => flatten([top], top.label));
  const all = [...EXTRA_PAGES, ...derived];
  const seen = new Set<string>();
  return all.filter((it) =>
    seen.has(it.url) ? false : (seen.add(it.url), true),
  );
})();
