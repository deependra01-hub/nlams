import { useMemo, type ComponentType } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarRange,
  CircleCheckBig,
  CircleDashed,
  FileText,
  Landmark,
  MapPinned,
  Radar,
  Rocket,
  ShieldCheck,
  SquareKanban,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { PRIMARY_NAV_ITEMS } from "../../app/config/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCompensation } from "../../hooks/useCompensation";
import { useParcels } from "../../hooks/useParcels";
import { useProjects } from "../../hooks/useProjects";
import { useRehabilitation } from "../../hooks/useRehabilitation";
import { aiService } from "../../services/ai.service";
import { notificationService } from "../../services/notification.service";
import { reportService } from "../../services/report.service";
import { simulatorService } from "../../services/simulator.service";

const PROJECT_ROWS = [
  { name: "Guwahati Smart City", location: "Guwahati, Assam", plots: "320", area: "2,450 ac", status: "Active", tone: "success" as const },
  { name: "Dhola SRR", location: "Ahmedabad, Gujarat", plots: "210", area: "1,050 ac", status: "Active", tone: "success" as const },
  { name: "Mumbai Metro Land", location: "Mumbai, Maharashtra", plots: "145", area: "980 ac", status: "In progress", tone: "primary" as const },
  { name: "Bangalore Tech Park", location: "Bangalore, Karnataka", plots: "98", area: "560 ac", status: "Review", tone: "warning" as const },
];

const ACTIVITY_ROWS = [
  { title: "New plot data uploaded", subtitle: "Project: Guwahati Smart City", time: "5 min ago" },
  { title: "Land record verified", subtitle: "Project: Dhola SRR", time: "25 min ago" },
  { title: "Case update added", subtitle: "Case ID: OLX-2024-12", time: "1 hr ago" },
  { title: "New team member added", subtitle: "John Smith joined the workspace", time: "2 hrs ago" },
];

export function NationalDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats: projectStats } = useProjects();
  const { stats: parcelStats } = useParcels();
  const { summary: compensationSummary } = useCompensation();
  const { summary: rrSummary } = useRehabilitation();
  const quickStats = useMemo(
    () => [
      {
        label: "Projects",
        value: String(projectStats.totalProjects),
        detail: "Portfolio in motion",
        icon: SquareKanban,
        tone: "violet" as const,
      },
      {
        label: "Parcels",
        value: String(parcelStats.totalParcels),
        detail: "Registry summary",
        icon: Landmark,
        tone: "cyan" as const,
      },
      {
        label: "Compensation",
        value: String(compensationSummary.totalCases),
        detail: "Cases in motion",
        icon: Wallet,
        tone: "emerald" as const,
      },
      {
        label: "R&R families",
        value: String(rrSummary.totalFamilies),
        detail: "Support records",
        icon: ShieldCheck,
        tone: "amber" as const,
      },
      {
        label: "Open risks",
        value: String(aiService.getSummary().criticalRisks),
        detail: "Needs attention",
        icon: Radar,
        tone: "rose" as const,
      },
    ],
    [compensationSummary.totalCases, parcelStats.totalParcels, projectStats.totalProjects, rrSummary.totalFamilies],
  );

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="National command shell"
        description="Active cases, live portfolio health, and the current spatial pulse stay visible in a slim ribbon instead of a popover."
        items={[
          { label: "Projects", value: String(projectStats.totalProjects) },
          { label: "Parcels", value: String(parcelStats.totalParcels) },
          { label: "Compensation", value: String(compensationSummary.totalCases) },
          { label: "R&R", value: String(rrSummary.totalFamilies) },
          { label: "Risks", value: String(aiService.getSummary().criticalRisks) },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.96)_56%,rgba(234,239,255,0.96)_100%)] p-8 shadow-[0_24px_70px_rgba(80,96,170,0.10)]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">National command shell</Badge>
            <Badge tone="neutral">Lightweight view</Badge>
            <Badge tone="success">Live data</Badge>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-blue-950">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}!` : ""} Keep an eye on the land acquisition pulse without losing the spacious feel.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-700/75">
            KPI cards, module shortcuts, and spatial signals are visible at a glance, while deeper work remains one click away.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button leadingIcon={Rocket} onClick={() => navigate("/projects")}>
              Open modules
            </Button>
            <Button variant="secondary" leadingIcon={CalendarRange} onClick={() => navigate("/reports")}>
              Last 30 days
            </Button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-[26px] bg-[linear-gradient(135deg,rgba(87,103,255,0.94)_0%,rgba(114,82,255,0.92)_100%)] p-5 text-white shadow-[0_18px_40px_rgba(87,103,255,0.24)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Status</p>
                  <p className="mt-2 text-lg font-semibold">Your data is up to date</p>
                  <p className="mt-1 text-sm text-white/75">All systems updated • 5 min ago</p>
                </div>
                <CircleCheckBig className="h-7 w-7 text-white/85" />
              </div>
            </div>
            <div className="rounded-[26px] border border-emerald-100 bg-[linear-gradient(135deg,rgba(232,250,238,0.98)_0%,rgba(242,255,248,0.96)_100%)] p-5 shadow-[0_18px_40px_rgba(60,162,109,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Profile</p>
                  <p className="mt-2 text-lg font-semibold text-emerald-950">Complete your profile</p>
                  <p className="mt-1 text-sm text-emerald-800/75">Unlock personalized insights and reports</p>
                </div>
                <CircleDashed className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <AppCard title="Summary report" description="A compact status panel for the current cycle.">
          <div className="flex items-center gap-5">
            <div className="relative h-28 w-28 shrink-0 rounded-full bg-[conic-gradient(#4f46e5_0deg_304deg,#f97316_304deg_330deg,#22c55e_330deg_360deg)] p-3">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center shadow-inner">
                <div>
                  <p className="text-2xl font-semibold text-blue-950">89%</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Success</p>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <SummaryStat label="Success" value="89%" tone="text-violet-700" />
              <SummaryStat label="In progress" value="7%" tone="text-amber-600" />
              <SummaryStat label="At risk" value="4%" tone="text-rose-600" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <SmallStat label="My assets" value="67 acres" icon={Landmark} />
            <SmallStat label="Net expenses" value="₹1,20,921/-" icon={TrendingUp} />
            <SmallStat label="Reports" value="24 this month" icon={FileText} />
            <SmallStat label="Alerts" value={`${notificationService.getUnreadCount()}`} icon={MapPinned} />
          </div>
          <div className="mt-6 rounded-2xl bg-[linear-gradient(135deg,rgba(240,245,255,0.9)_0%,rgba(247,242,255,0.92)_100%)] px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">Oxl... AI Insights</p>
                <p className="mt-2 text-sm text-blue-700/75">AI has identified 4 potential risks in your projects.</p>
              </div>
              <Badge tone="primary">New</Badge>
            </div>
            <Button variant="secondary" className="mt-4 border-violet-200 bg-white text-violet-800" onClick={() => navigate("/ai")}>
              View AI insights
            </Button>
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {quickStats.map((stat) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            icon={stat.icon}
            tone={stat.tone}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr_0.9fr]">
        <AppCard title="Project overview" description="A quick read on the active layer distribution.">
          <div className="space-y-4">
            {[
              { label: "Plot layer", value: 320, width: "82%", tone: "bg-violet-500" },
              { label: "Village layer", value: 280, width: "71%", tone: "bg-cyan-500" },
              { label: "District layer", value: 180, width: "46%", tone: "bg-emerald-500" },
              { label: "State layer", value: 120, width: "31%", tone: "bg-amber-500" },
            ].map((row) => (
              <div key={row.label} className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-blue-950">{row.label}</p>
                  <p className="text-blue-700/70">{row.value}</p>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className={`h-3 rounded-full ${row.tone}`} style={{ width: row.width }} />
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard title="Geospatial analytics" description="The map stays visible in the dedicated GIS module.">
          <div className="rounded-[24px] border border-slate-100 bg-[radial-gradient(circle_at_20%_20%,rgba(109,93,252,0.18),transparent_36%),radial-gradient(circle_at_70%_30%,rgba(46,122,240,0.16),transparent_30%),linear-gradient(135deg,#eef5ff_0%,#f9f7ff_100%)] p-4">
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-4">
              <div className="rounded-2xl bg-white/85 p-4 shadow-sm backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">Total parcels</p>
                <p className="mt-2 text-3xl font-semibold text-blue-950">{parcelStats.totalParcels}</p>
                <p className="mt-3 text-sm text-blue-700/75">Mapped across the current scope.</p>
                <Button variant="secondary" className="mt-4 border-violet-200 bg-white text-violet-800" onClick={() => navigate("/gis")}>
                  View full map
                </Button>
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-white/55 p-4">
                <div className="grid gap-3 text-center">
                  <MapPinned className="mx-auto h-10 w-10 text-violet-700" />
                  <p className="text-sm font-semibold text-blue-950">Spatial layers ready</p>
                  <p className="text-xs leading-5 text-blue-700/70">Open GIS for the live map, layer toggles, and feature drill-in.</p>
                </div>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Litigation overview" description="A compact view of the current case mix.">
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28 shrink-0 rounded-full bg-[conic-gradient(#4f46e5_0deg_178deg,#22c55e_178deg_268deg,#f59e0b_268deg_328deg,#ef4444_328deg_360deg)] p-3">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-blue-950">{projectStats.totalProjects}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-700">Total cases</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <MetricDot label="Ongoing" value="42" tone="bg-violet-500" />
              <MetricDot label="Disposed" value="26" tone="bg-emerald-500" />
              <MetricDot label="Pending" value="12" tone="bg-amber-500" />
              <MetricDot label="Appealed" value="6" tone="bg-rose-500" />
            </div>
          </div>
          <Button variant="secondary" className="mt-5 w-full border-violet-200 bg-white text-violet-800" onClick={() => navigate("/reports")}>
            View all cases
          </Button>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr_0.8fr]">
        <AppCard title="Recent projects" description="The latest portfolio moves in a lighter table.">
          <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] shadow-[0_12px_40px_rgba(15,29,47,0.05)]">
            <div className="grid grid-cols-[1.3fr_1fr_0.6fr_0.8fr_0.7fr] gap-2 border-b border-sky-100 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Project name</span>
              <span>Location</span>
              <span>Plots</span>
              <span>Area</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-sky-100 bg-transparent">
              {PROJECT_ROWS.map((row) => (
                <div key={row.name} className="grid grid-cols-[1.3fr_1fr_0.6fr_0.8fr_0.7fr] gap-2 px-4 py-4 text-sm">
                  <span className="font-semibold text-violet-700">{row.name}</span>
                  <span className="text-blue-700/75">{row.location}</span>
                  <span className="text-blue-950">{row.plots}</span>
                  <span className="text-blue-950">{row.area}</span>
                  <Badge tone={row.tone}>{row.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </AppCard>

        <AppCard title="Activity feed" description="A quick glance at what changed most recently.">
          <div className="space-y-3">
            {ACTIVITY_ROWS.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-sky-100 bg-white/90 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-blue-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-blue-700/75">{item.subtitle}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard title="Data layer distribution" description="One compact rollup for the current stack.">
          <div className="flex items-center justify-center">
            <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(#4f46e5_0deg_162deg,#22c55e_162deg_270deg,#f59e0b_270deg_324deg,#ef4444_324deg_360deg)] p-3">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-blue-950">{parcelStats.totalParcels}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-700">Layers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <MetricDot label="Plot layer" value="45%" tone="bg-violet-500" />
            <MetricDot label="Village layer" value="30%" tone="bg-emerald-500" />
            <MetricDot label="District layer" value="15%" tone="bg-amber-500" />
            <MetricDot label="State layer" value="10%" tone="bg-rose-500" />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AppCard title="Fast links" description="Open a page without scanning long summaries.">
          <div className="grid gap-3 sm:grid-cols-2">
            {PRIMARY_NAV_ITEMS.filter(
              (item) => item.available && item.path !== "/dashboard" && !item.hiddenRoles?.includes(user?.role ?? "central_admin"),
            )
              .slice(0, 6)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="rounded-2xl border border-slate-100 bg-white px-4 py-4 transition hover:border-violet-200 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,248,255,0.98))]"
                >
                  <p className="font-semibold text-blue-950">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-blue-700/75">{item.description}</p>
                </Link>
              ))}
          </div>
        </AppCard>

        <AppCard title="Today at a glance" description="Very short operational signals.">
          <div className="grid gap-3 sm:grid-cols-2">
            <MiniSignal label="Critical risks" value={`${aiService.getSummary().criticalRisks}`} />
            <MiniSignal label="Active scenarios" value={`${simulatorService.getSummary().activeScenarios}`} />
            <MiniSignal label="Ready reports" value={`${reportService.getReports().filter((report) => report.status === "ready").length}`} />
            <MiniSignal label="Unread notices" value={`${notificationService.getUnreadCount()}`} />
          </div>
        </AppCard>
      </section>

    </div>
  );
}

function MiniSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(242,248,255,0.94)_100%)] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-blue-950">{value}</p>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-blue-950">{label}</p>
      <p className={`text-sm font-semibold ${tone}`}>{value}</p>
    </div>
  );
}

function SmallStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl bg-white/90 px-4 py-4 shadow-[0_8px_24px_rgba(15,29,47,0.05)]">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-sky-50 p-2 text-violet-700">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      </div>
      <p className="mt-3 text-lg font-semibold text-blue-950">{value}</p>
    </div>
  );
}

function MetricDot({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
      <span className="min-w-0 flex-1 font-medium text-blue-950">{label}</span>
      <span className="font-semibold text-blue-700">{value}</span>
    </div>
  );
}
