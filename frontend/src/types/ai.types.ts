export type AIRiskDomain = "project" | "parcel" | "compensation" | "rehabilitation";

export type AIRiskLevel = "low" | "medium" | "high" | "critical";

export interface AIInsight {
  id: string;
  entityName: string;
  domain: AIRiskDomain;
  route: string;
  score: number;
  level: AIRiskLevel;
  confidence: number;
  summary: string;
  drivers: string[];
  recommendation: string;
  owner: string;
  updatedAt: string;
}

export interface AIHistoryEntry {
  id: string;
  entityName: string;
  score: number;
  delta: number;
  note: string;
  date: string;
}

export interface AISummary {
  totalScans: number;
  averageScore: number;
  criticalRisks: number;
  recommendedActions: number;
}
