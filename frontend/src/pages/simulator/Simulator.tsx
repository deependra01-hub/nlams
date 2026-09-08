import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { parcelService } from "../../services/parcel.service";
import { projectService } from "../../services/project.service";
import { simulatorService } from "../../services/simulator.service";
import { useFilterStore } from "../../store/filter.store";
import type { ScenarioStatus } from "../../types/simulator.types";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { Sparkles, TriangleAlert, Wallet, Waypoints } from "lucide-react";

export function Simulator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const scenarios = simulatorService.getScenarios();
  const summary = simulatorService.getSummary();
  const { searchText, geographicScope } = useFilterStore();
  const [status, setStatus] = useState<ScenarioStatus | "all">("all");
  const [query, setQuery] = useState("");
  const scopeTarget = getScopeTarget(geographicScope, user?.role);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return scenarios.filter((scenario) => {
      const project = projectService.getProjectById(scenario.projectId);
      const parcel = parcelService.getParcelById(scenario.parcelId);
      const scopeRecord = {
        state: project?.state ?? parcel?.state,
        district: project?.district ?? parcel?.district,
      };
      const matchesStatus = status === "all" || scenario.status === status;
      const matchesQuery =
        normalized.length === 0 ||
        [scenario.name, scenario.description, scenario.projectId, scenario.parcelId, ...scenario.assumptions]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesGlobal =
        matchesScope(scopeRecord, geographicScope, user?.role) &&
        matchesSearch(
          [
            scenario.id,
            scenario.name,
            scenario.description,
            scenario.projectId,
            scenario.parcelId,
            scenario.status,
            project?.name,
            project?.state,
            project?.district,
            parcel?.surveyNo,
            parcel?.ownerName,
            parcel?.state,
            parcel?.district,
            ...scenario.assumptions,
          ],
          searchText,
        );
      return matchesStatus && matchesQuery && matchesGlobal;
    });
  }, [geographicScope, query, scenarios, searchText, status, user?.role]);

  return (
    <div className="space-y-7">
      <AppCard title="Impact simulator" description="Test acquisition scenarios before they affect the workflow.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Scenarios" value={String(summary.totalScenarios)} detail="Saved simulation setups." icon={Sparkles} />
          <MetricCard label="Visible" value={String(filtered.length)} detail={`Filtered in ${scopeTarget.label}`} icon={Waypoints} />
          <MetricCard label="Average cost" value={`${summary.averageCostLakh} lakh`} detail="Estimated financial impact." icon={Wallet} />
          <MetricCard label="High risk" value={String(summary.highRiskScenarios)} detail="Requires review." icon={TriangleAlert} />
        </div>
      </AppCard>

      <div className="grid gap-3 rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-5 shadow-[0_12px_40px_rgba(15,29,47,0.05)] lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-900">Search scenarios</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search scenario, project, parcel, or assumption"
            className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["all", "draft", "active", "approved", "archived"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={[
                "rounded-full border px-3 py-2 text-sm font-semibold transition",
                status === item
                  ? "border-gov-300 bg-gov-50 text-gov-800"
                  : "border-sky-100 bg-white/90 text-slate-600 hover:border-gov-200 hover:bg-gov-50",
              ].join(" ")}
            >
              {item === "all" ? "All statuses" : simulatorService.getStatusLabel(item)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((scenario) => (
          <article
            key={scenario.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{scenario.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{scenario.description}</p>
              </div>
              <Badge tone={scenario.status === "approved" ? "success" : scenario.status === "active" ? "primary" : "neutral"}>
                {simulatorService.getStatusLabel(scenario.status)}
              </Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label="Cost" value={`${scenario.costLakh} lakh`} />
              <Info label="Delay" value={`${scenario.delayWeeks} weeks`} />
              <Info label="Dispute risk" value={`${scenario.disputeRisk}/100`} />
              <Info label="RR impact" value={`${scenario.rrImpact}/100`} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {scenario.assumptions.map((item) => (
                <Badge key={item} tone="neutral">
                  {item}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => navigate(`/simulator/${scenario.id}`)}>Open scenario</Button>
              <Link to="/simulator/create" className="inline-flex">
                <Button variant="secondary">Create scenario</Button>
              </Link>
            </div>
          </article>
        ))}
        {filtered.length === 0 ? (
          <EmptyState
            title="No scenarios match the filters"
            description="Try a broader query or reset the status filter."
            icon={Sparkles}
            actionLabel="Reset filters"
            onAction={() => {
              setQuery("");
              setStatus("all");
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
