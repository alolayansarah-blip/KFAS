export interface CounterStat {
  value: number;
  label: string;
}

export const COUNTER_FALLBACKS: CounterStat[] = [
  { value: 1146, label: "Profiles" },
  { value: 111, label: "Organizations" },
  { value: 3750, label: "Research Outputs" },
  { value: 1732, label: "Projects" },
  { value: 98, label: "Impacts" },
  { value: 389, label: "Prizes" },
  { value: 916, label: "Equipment" },
];

export function fallbackFor(label: string): number {
  return COUNTER_FALLBACKS.find((s) => s.label === label)?.value ?? 0;
}
