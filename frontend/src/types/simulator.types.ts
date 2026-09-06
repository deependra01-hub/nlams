export type ScenarioStatus = "draft" | "active" | "approved" | "archived";

export interface SimulatorScenario {
  id: string;
  name: string;
  projectId: string;
  parcelId: string;
  status: ScenarioStatus;
  description: string;
  costLakh: number;
  delayWeeks: number;
  disputeRisk: number;
  rrImpact: number;
  confidence: number;
  updatedAt: string;
  assumptions: string[];
}

export interface SimulatorSummary {
  totalScenarios: number;
  activeScenarios: number;
  averageCostLakh: number;
  averageDelayWeeks: number;
  highRiskScenarios: number;
}
