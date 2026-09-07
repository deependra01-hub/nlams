import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { AppCard } from "../../components/common/AppCard";
import { PRIMARY_NAV_ITEMS } from "../../app/config/navigation";
import { useProjects } from "../../hooks/useProjects";
import { useParcels } from "../../hooks/useParcels";
import { useCompensation } from "../../hooks/useCompensation";
import { useRehabilitation } from "../../hooks/useRehabilitation";
import { aiService } from "../../services/ai.service";
import { simulatorService } from "../../services/simulator.service";
import { reportService } from "../../services/report.service";
import { notificationService } from "../../services/notification.service";
import { Rocket, Sparkles, SquareKanban, Landmark, ReceiptText, ShieldCheck, FileText, Radar } from "lucide-react";

const FEATURE_SUMMARY = [
  {
    title: "Acquisition",
    description: "Survey, hearings, objections, award, and possession move in one clean flow.",
    icon: SquareKanban,
    path: "/acquisition",
    facts: ["4 active cases", "1 blocked", "Fast drill-in"],
  },
  {
    title: "GIS Explorer",
    description: "Spatial layers stay available, but the first view is just a light gateway.",
    icon: Landmark,
    path: "/gis",
    facts: ["Layered map", "Feature preview", "Spatial crosswalk"],
  },
  {
    title: "Documents",
    description: "Versioned evidence with linked records, not a wall of file metadata.",
    icon: FileText,
    path: "/documents",
    facts: ["4 key records", "Version history", "Verified trace"],
  },
  {
    title: "AI Intelligence",
    description: "Risk prompts and recommendations stay concise and action-first.",
    icon: Radar,
    path: "/ai",
    facts: ["Critical flag", "Confidence score", "Next action"],
  },
];

export function NationalDashboard() {
  const navigate = useNavigate();
  const { stats: projectStats } = useProjects();
  const { stats: parcelStats } = useParcels();
  const { summary: compensationSummary } = useCompensation();
  const { summary: rrSummary } = useRehabilitation();
  const [activeFeature, setActiveFeature] = useState<(typeof FEATURE_SUMMARY)[number] | null>(null);

  const quickStats = useMemo(
    () => [
      {
        label: "Projects",
        value: String(projectStats.totalProjects),
        detail: "Clean portfolio overview",
        icon: SquareKanban,
      },
      {
        label: "Parcels",
        value: String(parcelStats.totalParcels),
        detail: "Registry summary",
        icon: Landmark,
      },
      {
        label: "Compensation",
        value: String(compensationSummary.totalCases),
        detail: "Cases in motion",
        icon: ReceiptText,
      },
      {
        label: "R&R families",
        value: String(rrSummary.totalFamilies),
        detail: "Support records",
        icon: ShieldCheck,
      },
    ],
    [compensationSummary.totalCases, parcelStats.totalParcels, projectStats.totalProjects, rrSummary.totalFamilies],
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-[0_20px_70px_rgba(15,29,47,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gov-700">National command shell</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950">
            Minimal, calm, and click-first land acquisition operations.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            This view keeps the front door light. Open a module only when you need it. The detailed
            workflows remain a click away, not stacked on the homepage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button leadingIcon={Rocket} onClick={() => navigate("/projects")}>
              Open modules
            </Button>
            <Button variant="secondary" leadingIcon={Sparkles} onClick={() => setActiveFeature(FEATURE_SUMMARY[0] ?? null)}>
              Heads up
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {quickStats.map((stat) => (
            <MetricCard key={stat.label} label={stat.label} value={stat.value} detail={stat.detail} icon={stat.icon} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {FEATURE_SUMMARY.map((feature) => (
          <button
            key={feature.title}
            type="button"
            onClick={() => setActiveFeature(feature)}
            className="group rounded-[28px] border border-slate-100 bg-white p-5 text-left shadow-[0_12px_40px_rgba(15,29,47,0.05)] transition hover:-translate-y-0.5 hover:border-gov-200 hover:shadow-[0_18px_50px_rgba(15,29,47,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-2xl bg-gov-50 p-3 text-gov-700">
                <feature.icon className="h-5 w-5" />
              </div>
              <Badge tone="neutral">Open</Badge>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {feature.facts.map((fact) => (
                <Badge key={fact} tone="neutral">
                  {fact}
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AppCard title="Today at a glance" description="Very short operational signals.">
          <div className="grid gap-3 sm:grid-cols-2">
            <MiniSignal label="Critical risks" value={`${aiService.getSummary().criticalRisks}`} />
            <MiniSignal label="Active scenarios" value={`${simulatorService.getSummary().activeScenarios}`} />
            <MiniSignal label="Ready reports" value={`${reportService.getReports().filter((report) => report.status === "ready").length}`} />
            <MiniSignal label="Unread notices" value={`${notificationService.getUnreadCount()}`} />
          </div>
        </AppCard>

        <AppCard title="Fast links" description="Open a page without scanning long summaries.">
          <div className="grid gap-3 sm:grid-cols-2">
            {PRIMARY_NAV_ITEMS.filter((item) => item.available && item.path !== "/dashboard").slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 transition hover:border-gov-200 hover:bg-white"
              >
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </AppCard>
      </section>

      <HeadsUpDialog
        open={Boolean(activeFeature)}
        title={activeFeature?.title ?? ""}
        description={activeFeature?.description ?? ""}
        onClose={() => setActiveFeature(null)}
        primaryAction={
          activeFeature ? (
            <Button onClick={() => navigate(activeFeature.path)}>Open module</Button>
          ) : null
        }
      >
        {activeFeature ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {activeFeature.facts.map((fact) => (
              <div key={fact} className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Heads up</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{fact}</p>
              </div>
            ))}
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
