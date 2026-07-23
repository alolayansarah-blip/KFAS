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
// Kept in sync with components/Header.tsx's DEFAULT_NAV_ITEMS_EN / _AR.
const SEARCH_NAV_EN: NavItem[] = [
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
      {
        label: "Success Stories and Impact",
        href: "/research/SuccessStories",
      },
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

const SEARCH_NAV_AR: NavItem[] = [
  {
    label: "عن المؤسسة",
    href: "/about",
    children: [
      { label: "من نحن", href: "/about/AboutKfas" },
      { label: "تاريخنا", href: "/about/OurHistory" },
      { label: "استراتيجيتنا", href: "/about/OurStrategy" },
      { label: "مجلس الإدارة", href: "/about/BoardOfDirectors" },
      { label: "فريقنا", href: "/about/our-team" },
    ],
  },
  {
    label: "البحث العلمي",
    href: "/Research",
    children: [
      { label: "دعم البحوث / المنح", href: "/research/grants" },
      { label: "الأنشطة والفعاليات", href: "/research/ActivitiesAndEvents" },
      { label: "الدراسات بالتكليف", href: "/research/AssignedStudies" },
      { label: "رعاية المؤتمرات العلمية", href: "/research/SCS" },
      { label: "نشر التكنلوجيـا", href: "/research/TechDeployment" },
      {
        label: "البحث والتطوير في القطاع الخاص",
        href: "/research/RandDPrivate",
      },
      {
        label: "قصص النجاح والأثر",
        href: "/research/SuccessStories",
      },
      { label: "بوابة أبحاث المؤسسة", href: "/research/KFASResearchPortal" },
    ],
  },
  {
    label: "التعلّم والتطوير",
    href: "/Learning-and-Development",
    children: [
      {
        label: "الباحثون",
        href: "/Learning-and-Development/Researchers",
      },
      {
        label: "المهنيون",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "الشباب", href: "/Learning-and-Development/Youth" },
    ],
  },
  {
    label: "العلوم والمجتمع",
    href: "/Science-and-Society",
    children: [
      {
        label: "رعاية الأنشطة والفعاليات",
        href: "/ScienceAndSociety/ActivitiesAndEventsSponsership",
      },
      { label: "المنشورات", href: "https://www.aspdkw.com/" },
      {
        label: "ذوو الاحتياجات الخاصة",
        href: "/ScienceAndSociety/SpecialNeeds",
      },
    ],
  },
  {
    label: "الجوائز",
    href: "/prizes",
    children: [
      { label: "جائزة الكويت", href: "/prizes/KuwaitPrize" },
      { label: "جائزة جابر الأحمد", href: "/prizes/Jaber-AlAhmadPrize" },
      { label: "جائزة السميط", href: "/prizes/AlSumaitPrize" },
      { label: "الفائزون", href: "/prizes/Laureates" },
    ],
  },
];

// ── Pages NOT in the header nav (Contact, Careers...). NO Home here. ──────────
const RESEARCHER_PROGRAMS_EN: SearchItem[] = [
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

const RESEARCHER_PROGRAMS_AR: SearchItem[] = [
  {
    title: "البحوث التعاونية الدولية",
    description:
      "تمويل يمكّن الباحثين الكويتيين من التعاون مع مؤسسات عالمية رائدة في مشاريع بحثية مشتركة.",
    url: "/Learning-and-Development/Researchers/International-Collaborative-Research",
    category: "الباحثون",
    keywords: ["دولي", "تعاون", "بحث مشترك", "عالمي"],
  },
  {
    title: "منح الزمالة البحثية",
    description:
      "فرص زمالة تدعم الباحثين في تطوير مسيرتهم الأكاديمية والعلمية.",
    url: "/Learning-and-Development/Researchers/ScholarFellowship",
    category: "الباحثون",
    keywords: ["زمالة", "باحث", "منحة", "مسيرة مهنية"],
  },
  {
    title: "دعم النشر العلمي",
    description:
      "دعم لنشر الأبحاث العلمية عالية الجودة في مجلات ومنافذ علمية مرموقة.",
    url: "/Learning-and-Development/Researchers/Scholarly-Publication",
    category: "الباحثون",
    keywords: ["نشر", "بحث", "مجلة", "ورقة بحثية"],
  },
  {
    title: "المهمات العلمية",
    description:
      "منح تمكّن الباحثين من المشاركة في المهمات العلمية والمؤتمرات والأنشطة الميدانية.",
    url: "/Learning-and-Development/Researchers/ScientificMissions",
    category: "الباحثون",
    keywords: ["مهمات", "مؤتمر", "ميداني", "سفر"],
  },
  {
    title: "المنحة الدراسية الجزئية",
    description:
      "دعم جزئي للباحثين المنتقلين بين المراحل أو البرامج الأكاديمية.",
    url: "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
    category: "الباحثون",
    keywords: ["منحة جزئية", "منحة دراسية", "انتقال أكاديمي"],
  },
  {
    title: "تمديد المنحة الدراسية الجزئية",
    description:
      "دعم إضافي للباحثين المؤهلين الذين يحتاجون وقتاً إضافياً لإتمام أهدافهم.",
    url: "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
    category: "الباحثون",
    keywords: ["تمديد", "منحة جزئية", "منحة دراسية"],
  },
  {
    title: "منحة مكمّلة لطلبة الدكتوراه",
    description:
      "تمويل مكمّل لطلبة الدكتوراه لدعم احتياجاتهم البحثية ودراستهم.",
    url: "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
    category: "الباحثون",
    keywords: ["دكتوراه", "منحة مكملة", "طلبة", "تمويل"],
  },
];

const EXTRA_PAGES_EN: SearchItem[] = [
  {
    title: "All News",
    description:
      "Stories, announcements, and highlights from the Kuwait Foundation for the Advancement of Sciences.",
    url: "/news",
    category: "News",
    keywords: ["news", "updates", "announcements", "press", "media"],
  },
  {
    title: "Website Policy",
    description:
      "Terms of use, privacy, cookies, and legal information for the KFAS website.",
    url: "/Policy",
    category: "Legal",
    keywords: ["policy", "privacy", "cookies", "terms", "legal"],
  },
];

const EXTRA_PAGES_AR: SearchItem[] = [
  {
    title: "جميع الأخبار",
    description: "قصص وإعلانات وأبرز مستجدات مؤسسة الكويت للتقدم العلمي.",
    url: "/news",
    category: "الأخبار",
    keywords: ["أخبار", "مستجدات", "إعلانات", "إعلام", "صحافة"],
  },
  {
    title: "سياسة الموقع",
    description:
      "شروط الاستخدام والخصوصية وملفات تعريف الارتباط والمعلومات القانونية لموقع المؤسسة.",
    url: "/Policy",
    category: "قانوني",
    keywords: ["سياسة", "خصوصية", "ملفات تعريف", "شروط", "قانوني"],
  },
];

// ── Extra keywords per URL (synonyms, abbreviations…) ──────────────────────────
const KEYWORDS_EN: Record<string, string[]> = {
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
  "/research/SuccessStories": [
    "success stories",
    "impact",
    "case studies",
    "kdd",
    "soof",
    "innovation",
  ],
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
  "/news": ["news", "updates", "announcements", "press", "media"],
  "/Policy": [
    "policy",
    "privacy",
    "cookies",
    "terms",
    "legal",
    "website policy",
  ],
  // …add more URLs and terms here anytime
};

const KEYWORDS_AR: Record<string, string[]> = {
  "/about": ["من نحن", "الرسالة", "الرؤية", "القيم", "المؤسسة", "كفاس"],
  "/about/AboutKfas": ["من نحن", "الرسالة", "الرؤية", "القيم"],
  "/about/OurHistory": ["تاريخ", "الذكرى", "50 عام", "تأسست"],
  "/about/our-team": ["فريق", "موظفين", "الفريق"],
  "/research/grants": ["تمويل", "منحة", "مال", "تقديم", "طلب", "منح"],
  "/research/SCS": ["مؤتمر", "رعاية", "تمويل فعاليات"],
  "/research/SuccessStories": [
    "قصص النجاح",
    "أثر",
    "نماذج",
    "ابتكار",
    "سوف",
  ],
  "/research/KFASResearchPortal": ["بوابة", "تسجيل دخول", "تقديم الطلب"],
  "/Learning-and-Development/Youth": ["طلاب", "مدرسة", "شباب", "أطفال"],
  "/ScienceAndSociety/SpecialNeeds": [
    "إعاقة",
    "ذوي الإعاقة",
    "إمكانية الوصول",
    "احتياجات خاصة",
  ],
  "/ScienceAndSociety/ActivitiesAndEventsSponsership": [
    "رعاية",
    "فعاليات",
    "أنشطة",
    "تمويل فعالية",
  ],
  "https://www.aspdkw.com/": ["منشورات", "مجلة", "كتب", "تقارير"],
  "/prizes/KuwaitPrize": ["جائزة", "جائزة الكويت"],
  "/prizes/AlSumaitPrize": ["جائزة", "أفريقيا", "السميط"],
  "/prizes/Laureates": ["فائزون", "حائزون", "الفائزون"],
  "/news": ["أخبار", "مستجدات", "إعلانات", "إعلام"],
  "/Policy": ["سياسة", "خصوصية", "شروط", "ملفات تعريف", "قانوني"],
};

// Optional: nicer descriptions per URL. Missing ones fall back to "".
const DESCRIPTIONS_EN: Record<string, string> = {
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
  "/research/SuccessStories":
    "KFAS success stories and real-world impact projects.",
  "/research/KFASResearchPortal": "Access the KFAS research portal.",
  "/ScienceAndSociety/ActivitiesAndEventsSponsership":
    "Sponsorship for scientific activities and events.",
  "/ScienceAndSociety/SpecialNeeds": "Support programs for special needs.",
  "https://www.aspdkw.com/": "Science and society publications.",
  "/prizes/KuwaitPrize": "The Kuwait Prize for scientific achievement.",
  "/prizes/AlSumaitPrize": "The Al Sumait Prize.",
  "/prizes/Laureates": "Past prize laureates and winners.",
  "/news": "All KFAS news, announcements, and updates.",
  "/Policy": "Website policy, privacy, and terms of use.",
};

const DESCRIPTIONS_AR: Record<string, string> = {
  "/about":
    "تعرّف على مؤسسة الكويت للتقدم العلمي — الرسالة والتاريخ والاستراتيجية والقيادة.",
  "/about/AboutKfas": "رسالتنا وقيمنا.",
  "/about/OurHistory": "خمسون عاماً من التقدم العلمي.",
  "/about/OurStrategy": "الرؤية والأهداف الاستراتيجية.",
  "/about/BoardOfDirectors": "الحوكمة والقيادة.",
  "/about/our-team": "تعرّف على فريق المؤسسة.",
  "/research/grants": "فرص التمويل وبرامج المنح.",
  "/research/ActivitiesAndEvents": "الأنشطة والفعاليات البحثية.",
  "/research/AssignedStudies": "الدراسات المكلَّف بها.",
  "/research/SCS": "رعاية المؤتمرات العلمية.",
  "/research/TechDeployment": "برامج نشر التكنولوجيا.",
  "/research/RandDPrivate": "دعم البحث والتطوير في القطاع الخاص.",
  "/research/SuccessStories": "قصص النجاح ومشاريع الأثر لمؤسسة الكويت للتقدم العلمي.",
  "/research/KFASResearchPortal": "الوصول إلى بوابة أبحاث المؤسسة.",
  "/ScienceAndSociety/ActivitiesAndEventsSponsership":
    "رعاية الأنشطة والفعاليات العلمية.",
  "/ScienceAndSociety/SpecialNeeds": "برامج دعم ذوي الاحتياجات الخاصة.",
  "https://www.aspdkw.com/": "منشورات العلوم والمجتمع.",
  "/prizes/KuwaitPrize": "جائزة الكويت للإنجاز العلمي.",
  "/prizes/AlSumaitPrize": "جائزة السميط.",
  "/prizes/Laureates": "الفائزون السابقون بالجوائز.",
  "/news": "جميع أخبار وإعلانات ومستجدات المؤسسة.",
  "/Policy": "سياسة الموقع والخصوصية وشروط الاستخدام.",
};

// Unicode-aware so Arabic labels split into real words too.
function keywordsFrom(label: string): string[] {
  return label
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 1);
}

function flatten(
  items: NavItem[],
  category: string,
  descriptions: Record<string, string>,
  extraKeywords: Record<string, string[]>,
): SearchItem[] {
  const out: SearchItem[] = [];
  for (const item of items) {
    if (item.children?.length) {
      // Section parents (/about, /Research, ...) have no pages of their own —
      // they only open dropdowns in the header. Index their children, never
      // the parent itself, so search can't surface a dead route.
      out.push(
        ...flatten(item.children, category, descriptions, extraKeywords),
      );
    } else {
      out.push({
        title: item.label,
        description: descriptions[item.href] ?? "",
        url: item.href,
        category,
        keywords: [
          ...keywordsFrom(item.label),
          ...(extraKeywords[item.href] ?? []),
        ],
      });
    }
  }
  return out;
}

function buildIndex(
  nav: NavItem[],
  extraPages: SearchItem[],
  descriptions: Record<string, string>,
  extraKeywords: Record<string, string[]>,
): SearchItem[] {
  const derived = nav.flatMap((top) =>
    flatten([top], top.label, descriptions, extraKeywords),
  );
  const all = [...extraPages, ...derived];
  const seen = new Set<string>();
  return all.filter((it) =>
    seen.has(it.url) ? false : (seen.add(it.url), true),
  );
}

const searchIndexEn: SearchItem[] = buildIndex(
  SEARCH_NAV_EN,
  [...EXTRA_PAGES_EN, ...RESEARCHER_PROGRAMS_EN],
  DESCRIPTIONS_EN,
  KEYWORDS_EN,
);

const searchIndexAr: SearchItem[] = buildIndex(
  SEARCH_NAV_AR,
  [...EXTRA_PAGES_AR, ...RESEARCHER_PROGRAMS_AR],
  DESCRIPTIONS_AR,
  KEYWORDS_AR,
);

// Merge in the other language's title/description/keywords as extra search
// terms, so typing an Arabic word while browsing the English site (or vice
// versa) still finds the right page — titles/descriptions shown to the user
// stay in the current locale, only the match terms are bilingual.
function withBilingualKeywords(
  primary: SearchItem[],
  secondary: SearchItem[],
): SearchItem[] {
  const secondaryByUrl = new Map(secondary.map((item) => [item.url, item]));
  return primary.map((item) => {
    const other = secondaryByUrl.get(item.url);
    if (!other) return item;
    return {
      ...item,
      keywords: [
        ...item.keywords,
        ...keywordsFrom(other.title),
        ...keywordsFrom(other.description),
        ...other.keywords,
      ],
    };
  });
}

const bilingualIndexEn = withBilingualKeywords(searchIndexEn, searchIndexAr);
const bilingualIndexAr = withBilingualKeywords(searchIndexAr, searchIndexEn);

export function getSearchIndex(isArabic: boolean): SearchItem[] {
  return isArabic ? bilingualIndexAr : bilingualIndexEn;
}

// Backward-compatible default (English) export.
export const searchIndex: SearchItem[] = searchIndexEn;
