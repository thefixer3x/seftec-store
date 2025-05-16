
export interface Milestone {
  quarter: string;
  title: string;
  description: string;
  status: "current" | "upcoming" | "planned" | "completed";
}

export interface RoadmapEvent {
  title: string;
  description: string;
  timeline: string;
}

export interface MainNavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}
