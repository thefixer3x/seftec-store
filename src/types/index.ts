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
