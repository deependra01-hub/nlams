import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { HeadsUpDialog } from "../../components/common/HeadsUpDialog";
import { MetricCard } from "../../components/common/MetricCard";
import { useProjects } from "../../hooks/useProjects";
import { projectService } from "../../services/project.service";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { BarChart3, MapPinned, Users } from "lucide-react";

export function ProjectList() {
  const navigate = useNavigate();
  const { projects, stats, setActiveProjectId } = useProjects();
  const [activeProjectId, setActiveProjectIdLocal] = useState<string | null>(null);

  const activeProject = activeProjectId ? projectService.getProjectById(activeProjectId) : null;

  const openProject = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-7">
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <AppCard title="Projects" description="A quiet portfolio view. Open a card for more detail.">
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Projects" value={String(stats.totalProjects)} detail="Current portfolio" icon={BarChart3} />
            <MetricCard label="Budget" value={formatCurrencyInCrore(stats.totalBudgetCrore)} detail="Estimated envelope" icon={MapPinned} />
            <MetricCard label="Avg progress" value={formatPercentage(stats.averageProgress)} detail="Portfolio mean" icon={Users} />
          </div>
        </AppCard>

        <AppCard title="Focus" description="Only the sharpest signals stay on the surface.">
          <div className="grid gap-3">
            <MiniLine label="High-risk projects" value={String(stats.highRiskProjects)} />
            <MiniLine label="Active issues" value={String(stats.activeIssues)} />
            <MiniLine label="Planning" value={String(projectService.listProjects("planning").length)} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[28px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.94)_100%)] p-6 shadow-[0_12px_40px_rgba(15,29,47,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.code}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{project.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
              <Badge tone="neutral">{formatPercentage(project.progress)}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">
                {project.district}, {project.state}
              </Badge>
              <Badge tone="neutral">{projectService.getStatusLabel(project.status)}</Badge>
              <Badge tone={project.riskScore >= 70 ? "warning" : "success"}>Risk {project.riskScore}</Badge>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <p className="text-sm text-slate-500">{project.affectedFamilies} families</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => setActiveProjectIdLocal(project.id)}>
                  Heads up
                </Button>
                <Button onClick={() => openProject(project.id)}>Open</Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <HeadsUpDialog
        open={Boolean(activeProject)}
        title={activeProject?.name ?? ""}
        description={activeProject?.description ?? ""}
        onClose={() => setActiveProjectIdLocal(null)}
        primaryAction={
          activeProject ? <Button onClick={() => openProject(activeProject.id)}>Open project page</Button> : null
        }
      >
        {activeProject ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniLine label="Code" value={activeProject.code} />
            <MiniLine label="Target" value={activeProject.targetDate} />
            <MiniLine label="Stage" value={projectService.getStatusLabel(activeProject.status)} />
          </div>
        ) : null}
      </HeadsUpDialog>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
