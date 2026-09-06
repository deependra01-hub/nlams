import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Layers3,
  Landmark,
  Sparkles,
  ShieldCheck,
  SquareAsterisk,
  TextCursorInput,
} from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { Alert } from "../../components/common/Alert";
import { AppCard } from "../../components/common/AppCard";
import { Input, Textarea } from "../../components/common/Input";
import { MetricCard } from "../../components/common/MetricCard";
import { ProgressBar } from "../../components/common/ProgressBar";
import { SkeletonCard } from "../../components/common/Skeleton";
import { Tabs } from "../../components/common/Tabs";
import { getApiBaseUrl } from "../../services/api";
import { APP_NAME, STATUS_META } from "../../constants/status";
import { RISK_LEVELS, SEMANTIC_COLORS, SEMANTIC_SURFACES, TRUST_LEVELS } from "../../constants/theme";

export function NationalDashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
      <section className="grid gap-4">
        <AppCard
          title="Phase 2: Design System"
          description="Semantic tokens and reusable UI primitives for a government-grade command center."
        >
          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4">
              <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(27,82,181,0.08),rgba(255,255,255,0.95))] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gov-700">
                  Design Principles
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {APP_NAME} visual foundation
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  The system prioritizes authority, clarity, compact information density, and
                  consistent semantic meaning across dashboard, GIS, simulator, and AI workflows.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone="primary">Government blue</Badge>
                  <Badge tone="success">Verified</Badge>
                  <Badge tone="warning">Attention</Badge>
                  <Badge tone="danger">Critical</Badge>
                  <Badge tone="neutral">Neutral</Badge>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Typography"
                  value="Clear hierarchy"
                  detail="Readable numbers, compact labels, and strong section hierarchy."
                  delta="+1 tokenized system"
                  icon={TextCursorInput}
                />
                <MetricCard
                  label="Interaction"
                  value="Accessible first"
                  detail="Visible focus, semantic states, and keyboard-safe controls."
                  delta="WCAG minded"
                  icon={ShieldCheck}
                />
              </div>

              <AppCard title="Component Samples" description="Reusable controls built for later phases.">
                <div className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Button leadingIcon={Sparkles}>Primary Action</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost Action</Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      id="design-input"
                      label="User ID"
                      placeholder="CENTRAL-001"
                      hint="Compact fields with clear labels."
                    />
                    <Textarea
                      id="design-notes"
                      label="Review notes"
                      placeholder="Enter verification notes..."
                      hint="Large forms can be grouped into logical sections."
                    />
                  </div>

                  <Alert tone="info">
                    Semantic colors are mapped through reusable tokens, not scattered ad hoc values.
                  </Alert>
                </div>
              </AppCard>
            </div>

            <div className="grid gap-4">
              <AppCard title="Token Ledger" description="Base surface and semantic color tokens.">
                <div className="grid gap-3">
                  <TokenGrid title="Surfaces" items={SEMANTIC_SURFACES} />
                  <TokenGrid title="Colors" items={SEMANTIC_COLORS} />
                </div>
              </AppCard>

              <AppCard title="Status Language" description="Reusable mappings for future screens.">
                <div className="grid gap-3">
                  {STATUS_META.map((status) => (
                    <div
                      key={status.key}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium text-slate-700">{status.label}</span>
                      <Badge
                        tone={
                          status.key === "verified"
                            ? "success"
                            : status.key === "blocked"
                              ? "danger"
                              : status.key === "pending"
                                ? "warning"
                                : "neutral"
                        }
                      >
                        {status.label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </AppCard>
            </div>
          </div>
        </AppCard>

        <div className="grid gap-4 xl:grid-cols-2">
          <AppCard title="Progress and Risk" description="Compact, readable signal presentation.">
            <div className="grid gap-4">
              <ProgressBar label="Acquisition Progress" value={68} tone="primary" />
              <ProgressBar label="Compensation Disbursed" value={74} tone="success" />
              <ProgressBar label="Objections Pending" value={32} tone="warning" />
              <ProgressBar label="Critical Blocks" value={12} tone="danger" />
            </div>
          </AppCard>

          <AppCard title="Tabs and States" description="Accessible navigation primitives and empty/loading states.">
            <Tabs
              defaultActiveId="overview"
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content: (
                    <div className="space-y-3">
                      <Alert tone="success">
                        Layouts and tokens are now ready for the national dashboard phase.
                      </Alert>
                      <EmptyState
                        title="No live feed yet"
                        description="This placeholder will later show live dashboard data and action prompts."
                        icon={CheckCircle2}
                        actionLabel="Refresh"
                      />
                    </div>
                  ),
                },
                {
                  id: "loading",
                  label: "Loading",
                  content: <SkeletonCard />,
                },
              ]}
            />
          </AppCard>
        </div>

        <AppCard title="Table Rhythm" description="Compact rows with clear hierarchy and status labels.">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Metric</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Value</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">State</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <Row metric="Projects at risk" value="12" state={<Badge tone="warning">High</Badge>} />
                <Row metric="Trust score" value="94%" state={<Badge tone="success">Trusted</Badge>} />
                <Row metric="Open grievances" value="38" state={<Badge tone="danger">Escalated</Badge>} />
              </tbody>
            </table>
          </div>
        </AppCard>
      </section>

      <aside className="grid gap-4">
        <AppCard
          title="Phase 2 Validation"
          description="The new foundation is intentionally temporary, but polished enough to judge visually."
        >
          <ul className="space-y-3 text-sm text-slate-700">
            <li>Semantic token mapping is centralized.</li>
            <li>Reusable controls share the same radius, border, and focus style.</li>
            <li>Loading, empty, and alert states are represented.</li>
            <li>Responsive table handling is demonstrated.</li>
          </ul>
        </AppCard>

        <AppCard title="API Boundary" description="Environment-based backend configuration remains intact.">
          <code className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {getApiBaseUrl()}
          </code>
        </AppCard>

        <AppCard title="Source Quality" description="Architectural boundaries stay ready for later phases.">
          <div className="grid gap-3">
            <MetricCard
              label="Router"
              value="React Router"
              detail="Route-level structure is preserved."
              icon={Layers3}
            />
            <MetricCard
              label="API Client"
              value="Axios"
              detail="Centralized client boundary is still in place."
              icon={Landmark}
            />
            <MetricCard
              label="State"
              value="Zustand"
              detail="Feature stores remain separated."
              icon={ShieldCheck}
            />
            <MetricCard
              label="Risk Semantics"
              value="Low to Critical"
              detail="Human-readable risk language stays consistent."
              icon={AlertTriangle}
            />
            <MetricCard
              label="Design Tokens"
              value="Semantic CSS"
              detail="No scattered ad hoc semantic colors."
              icon={SquareAsterisk}
            />
          </div>
        </AppCard>

        <AppCard
          title="Risk and Trust Language"
          description="The UI talks about model risk and source confidence consistently."
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Risk Levels
              </p>
              <div className="flex flex-wrap gap-2">
                {RISK_LEVELS.map((level) => (
                  <Badge
                    key={level.key}
                    tone={
                      level.key === "low"
                        ? "success"
                        : level.key === "moderate"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {level.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Trust Levels
              </p>
              <div className="flex flex-wrap gap-2">
                {TRUST_LEVELS.map((level) => (
                  <Badge
                    key={level.key}
                    tone={level.key === "trusted" ? "success" : level.key === "review" ? "warning" : "danger"}
                  >
                    {level.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </AppCard>
      </aside>
    </div>
  );
}

function TokenGrid({
  title,
  items,
}: {
  title: string;
  items: Array<{
    label: string;
    token?: string;
    value?: string;
    swatch: string;
    textClass?: string;
  }>;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-full ${item.swatch}`} />
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
            <span className={`text-xs font-semibold ${item.textClass ?? "text-slate-500"}`}>
              {item.token ?? item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({
  metric,
  value,
  state,
}: {
  metric: string;
  value: string;
  state: ReactNode;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="px-3 py-3 font-medium text-slate-800">{metric}</td>
      <td className="px-3 py-3 text-slate-700">{value}</td>
      <td className="px-3 py-3">{state}</td>
      <td className="px-3 py-3 text-gov-700">View</td>
    </tr>
  );
}
