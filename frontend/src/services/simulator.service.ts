import type { SimulatorScenario, SimulatorSummary, ScenarioStatus } from "../types/simulator.types";

const SCENARIOS: SimulatorScenario[] = [
  {
    id: "sim-001",
    name: "Accelerated compensation",
    projectId: "prj-nh-07",
    parcelId: "parcel-101",
    status: "active",
    description: "Reduce compensation verification time by shifting review earlier in the workflow.",
    costLakh: 54,
    delayWeeks: -2,
    disputeRisk: 34,
    rrImpact: 18,
    confidence: 86,
    updatedAt: "2026-09-04",
    assumptions: ["Extra review staff", "Parallel bank verification", "Early possession planning"],
  },
  {
    id: "sim-002",
    name: "Boundary reset",
    projectId: "prj-wr-12",
    parcelId: "parcel-317",
    status: "draft",
    description: "Re-run survey and boundary closure before sending the parcel to award preparation.",
    costLakh: 22,
    delayWeeks: 4,
    disputeRisk: 82,
    rrImpact: 9,
    confidence: 92,
    updatedAt: "2026-09-05",
    assumptions: ["Map correction", "Hearing rescheduling", "Revenue record refresh"],
  },
  {
    id: "sim-003",
    name: "Possession first",
    projectId: "prj-ir-01",
    parcelId: "parcel-418",
    status: "approved",
    description: "Sequence possession and livelihood support after award issuance to close the corridor faster.",
    costLakh: 31,
    delayWeeks: -1,
    disputeRisk: 26,
    rrImpact: 15,
    confidence: 80,
    updatedAt: "2026-09-03",
    assumptions: ["Award already issued", "Family support cleared", "Payment queue stable"],
  },
];

export const simulatorService = {
  getScenarios() {
    return SCENARIOS.slice();
  },

  getScenarioById(scenarioId: string) {
    return SCENARIOS.find((scenario) => scenario.id === scenarioId) ?? null;
  },

  getSummary(): SimulatorSummary {
    return {
      totalScenarios: SCENARIOS.length,
      activeScenarios: SCENARIOS.filter((scenario) => scenario.status === "active").length,
      averageCostLakh: Math.round(SCENARIOS.reduce((sum, scenario) => sum + scenario.costLakh, 0) / SCENARIOS.length),
      averageDelayWeeks: Math.round(SCENARIOS.reduce((sum, scenario) => sum + scenario.delayWeeks, 0) / SCENARIOS.length),
      highRiskScenarios: SCENARIOS.filter((scenario) => scenario.disputeRisk >= 70).length,
    };
  },

  getStatusLabel(status: ScenarioStatus) {
    switch (status) {
      case "draft":
        return "Draft";
      case "active":
        return "Active";
      case "approved":
        return "Approved";
      case "archived":
        return "Archived";
    }
  },
};
