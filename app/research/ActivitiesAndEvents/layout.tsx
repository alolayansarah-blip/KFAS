import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities & Events | KFAS",
  description:
    "Explore research activities, workshops, and events from the Kuwait Foundation for the Advancement of Sciences.",
};

export default function ActivitiesAndEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
