import type { AIHistoryEntry, AIInsight, AISummary, AIRiskLevel } from "../types/ai.types";

const INSIGHTS: AIInsight[] = [
  {
    id: "ai-001",
    entityName: "NH-07 Varanasi corridor",
    domain: "project",
    route: "/projects/prj-nh-07",
    score: 82,
    level: "high",
    confidence: 91,
    summary:
      "The project is trending toward schedule pressure because compensation and possession are concentrated in a short window.",
    drivers: ["Dense compensation queue", "Multiple objections resolved late", "Possession scheduling lag"],
    recommendation: "Prioritize payment clearance and possession handoff in the next review cycle.",
    owner: "State officer",
    updatedAt: "2026-09-05",
  },
  {
    id: "ai-002",
    entityName: "Parcel 317/8",
    domain: "parcel",
    route: "/parcels/parcel-317",
    score: 95,
    level: "critical",
    confidence: 97,
    summary:
      "The parcel remains blocked by a title dispute and map mismatch, creating a high likelihood of delay spillover.",
    drivers: ["Open title objection", "Revenue map mismatch", "Survey rerun likely"],
    recommendation: "Escalate to records correction and keep the hearing queue focused on this parcel.",
    owner: "Field officer",
    updatedAt: "2026-09-06",
  },
  {
    id: "ai-003",
    entityName: "RR family - Shivpuri",
    domain: "rehabilitation",
    route: "/rr/families",
    score: 38,
    level: "medium",
    confidence: 88,
    summary:
      "Rehabilitation actions are progressing well but livelihood support remains incomplete for one family cluster.",
    drivers: ["Livelihood support pending", "House site already approved", "Compensation is complete"],
    recommendation: "Close the livelihood package and trigger a completion check after field confirmation.",
    owner: "RR cell",
    updatedAt: "2026-09-04",
  },
];

const HISTORY: AIHistoryEntry[] = [
  {
    id: "hist-1",
    entityName: "Parcel 317/8",
    score: 91,
    delta: 4,
    note: "Risk increased after the survey replay flagged the boundary mismatch.",
    date: "2026-09-02",
  },
  {
    id: "hist-2",
    entityName: "NH-07 Varanasi corridor",
    score: 78,
    delta: 4,
    note: "Risk rose slightly as possession dates moved later in the cycle.",
    date: "2026-09-03",
  },
  {
    id: "hist-3",
    entityName: "RR family - Shivpuri",
    score: 42,
    delta: -4,
    note: "Risk dropped after the house site approval was recorded.",
    date: "2026-09-04",
  },
];

export const aiService = {
  getInsights() {
    return INSIGHTS.slice();
  },

  getInsightById(insightId: string) {
    return INSIGHTS.find((insight) => insight.id === insightId) ?? null;
  },

  getHistory() {
    return HISTORY.slice();
  },

  getSummary(): AISummary {
    return {
      totalScans: 128,
      averageScore: 68,
      criticalRisks: INSIGHTS.filter((entry) => entry.level === "critical").length,
      recommendedActions: 5,
    };
  },

  getRiskLabel(level: AIRiskLevel) {
    switch (level) {
      case "low":
        return "Low";
      case "medium":
        return "Medium";
      case "high":
        return "High";
      case "critical":
        return "Critical";
    }
  },
};
