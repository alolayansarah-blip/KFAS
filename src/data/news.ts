export type NewsItem = {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  dateISO: string;
  /**
   * Destination of the story card.
   * - "" (empty): the card renders as display-only — no Read More, not clickable.
   * - "/path": internal route — opens with the locale-aware Link (keeps /ar).
   * - "https://...": external source — opens in a new tab.
   * HANDOVER NOTE (KFAS): to activate a card, simply fill this field.
   */
  link: string;
};

/** A card is clickable only when its link is real (not empty, not "#"). */
export const hasLink = (link: string): boolean => !!link && link !== "#";

/** Internal routes start with "/" and must use the locale-aware Link. */
export const isInternalLink = (link: string): boolean => link.startsWith("/");

/** Shared KFAS news catalogue — homepage shows the latest; /news lists all. */
export const NEWS: NewsItem[] = [
  {
    id: "ictp-scifablab",
    image: "/image/news1.jpeg",
    titleKey: "news1Title",
    descriptionKey: "news1Description",
    dateISO: "2026-01-10",
    link: "",
  },
  {
    id: "mbrsc-mou",
    image: "/image/news2.jpeg",
    titleKey: "news2Title",
    descriptionKey: "news2Description",
    dateISO: "2024-12-05",
    link: "",
  },
  {
    id: "innovation-workshop",
    image: "/image/news3.jpeg",
    titleKey: "news3Title",
    descriptionKey: "news3Description",
    dateISO: "2024-11-28",
    link: "",
  },
];

export const sortedNews = [...NEWS].sort(
  (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
);
