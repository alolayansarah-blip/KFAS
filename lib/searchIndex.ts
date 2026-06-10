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
      { label: "Tech Deployment", href: "/research/TechDeployment" },
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
        children: [
          {
            label: "Scholar Fellowship",
            href: "/Learning-and-Development/Researchers/ScholarFellowship",
          },
          {
            label: "Scholarly Publication",
            href: "/Learning-and-Development/Researchers/Scholarly-Publication",
          },
          {
            label: "Scientific Missions",
            href: "/Learning-and-Development/Researchers/ScientificMissions",
          },
          {
            label: "Scholarship Bridging Grant",
            href: "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
          },
          {
            label: "Extension of Scholarship Bridging Grant",
            href: "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
          },
          {
            label: "PhD Students Supplementary Fund Grant",
            href: "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
          },
          {
            label: "International Collaborative Research",
            href: "/Learning-and-Development/Researchers/International-Collaborative-Research",
          },
        ],
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
const EXTRA_PAGES: SearchItem[] = [
  // Example — uncomment / edit for your real pages:
  // { title: "Contact Us", description: "Get in touch with KFAS.", url: "/contact", category: "Contact", keywords: ["contact", "email", "phone", "address", "reach", "support"] },
  // { title: "Careers", description: "Work at KFAS.", url: "/careers", category: "Careers", keywords: ["jobs", "career", "hiring", "vacancy", "work"] },
];

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
  "/Learning-and-Development/Researchers/Scholarly-Publication": [
    "publish",
    "paper",
    "journal",
    "research paper",
  ],
  "/Learning-and-Development/Researchers/ScholarFellowship": [
    "fellowship",
    "scholar",
    "scholarship",
  ],
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
  "/Learning-and-Development/Researchers/Scholarly-Publication":
    "Support for scholarly and research publications.",
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
