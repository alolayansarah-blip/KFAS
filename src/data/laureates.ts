export type PrizeKey = "kuwait" | "jaber" | "sumait";

export interface Laureate {
  id: string;
  prize: PrizeKey;
  year: number;
  status: "awarded" | "shared";
  name: string;
  nameAr?: string;
  verified: boolean;
  country?: string;
  field: string;
  kind?: string;
  brief?: string;
  specializationAr?: string;
  affiliationAr?: string;
  image?: string;
}

/** Sample laureates restored from git — replace with full workbook export when available. */
export const LAUREATES: Laureate[] = [
  {
    id: "kp-2024-ibrahim",
    prize: "kuwait",
    year: 2024,
    status: "awarded",
    name: "Prof. Ashraf Ibrahim",
    verified: true,
    country: "Jordan",
    field: "Basic Sciences — Biological Sciences",
    brief:
      "Pioneering diagnostic and therapeutic approaches in translational medicine for chronic and complex diseases.",
  },
  {
    id: "kp-2024-farhat",
    prize: "kuwait",
    year: 2024,
    status: "awarded",
    name: "Prof. Charbel Farhat",
    verified: true,
    country: "Lebanon",
    field: "Applied Sciences — Engineering Sciences",
    brief:
      "Advances in computational aerosciences and aircraft structural engineering.",
  },
  {
    id: "kp-2024-kafafi",
    prize: "kuwait",
    year: 2024,
    status: "awarded",
    name: "Prof. Zeidan Kafafi",
    verified: true,
    country: "Jordan",
    field: "Arts, Humanities & Literature",
    brief:
      "Contributions to archaeology and the civilizational history of the Arab region.",
  },
  {
    id: "kp-2019-jamal",
    prize: "kuwait",
    year: 2019,
    status: "awarded",
    name: "Prof. Amaney Jamal",
    verified: true,
    country: "United States",
    field: "Economics & Social Sciences",
    brief:
      "Scholarship in political science and democratization in the Arab world.",
  },
  {
    id: "ja-2025-qahim",
    prize: "jaber",
    year: 2025,
    status: "awarded",
    name: "Dr. Yousef Al-Qahim",
    verified: true,
    country: "Kuwait",
    field: "Engineering Sciences",
    brief: "Applied engineering solutions serving the oil and gas sectors.",
  },
  {
    id: "ja-2025-khazi",
    prize: "jaber",
    year: 2025,
    status: "awarded",
    name: "Dr. Yousef Al-Khazi",
    verified: true,
    country: "Kuwait",
    field: "Natural Sciences & Mathematics",
    brief: "Distinguished research in mathematics and the natural sciences.",
  },
  {
    id: "ja-2025-azmi",
    prize: "jaber",
    year: 2025,
    status: "awarded",
    name: "Dr. Aisha Al-Azmi",
    verified: true,
    country: "Kuwait",
    field: "Social Sciences & Humanities",
    brief:
      "Developing educational policy and improving the efficiency of education systems.",
  },
  {
    id: "ja-2025-behbehani",
    prize: "jaber",
    year: 2025,
    status: "awarded",
    name: "Dr. Hussein Behbehani",
    verified: true,
    country: "Kuwait",
    field: "Life Sciences",
    brief: "Distinguished scientific research in the biological sciences.",
  },
  {
    id: "as-marsh",
    prize: "sumait",
    year: 2017,
    status: "awarded",
    name: "Prof. Kevin Marsh",
    verified: true,
    country: "United Kingdom",
    field: "Health",
    brief:
      "Sustained efforts to control and eradicate malaria across Africa.",
  },
];
