import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { InfoRibbon } from "../../components/common/InfoRibbon";
import { MetricCard } from "../../components/common/MetricCard";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../hooks/useProjects";
import { projectService } from "../../services/project.service";
import { useFilterStore } from "../../store/filter.store";
import type { Project } from "../../types/project.types";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { getScopeTarget, matchesScope, matchesSearch } from "../../utils/globalFilters";
import { BarChart3, FolderSearch, MapPinned, Users } from "lucide-react";

export function ProjectList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, stats, setActiveProjectId } = useProjects();
  const { searchText, geographicScope } = useFilterStore();
  const scopeTarget = getScopeTarget(geographicScope, user?.role);
  const filteredProjects = projects.filter((project) =>
    matchesScope(project, geographicScope, user?.role) &&
    matchesSearch(
      [
        project.id,
        project.code,
        project.name,
        project.state,
        project.district,
        project.agency,
        project.status,
        project.description,
        ...project.issues.map((issue) => issue.title),
      ],
      searchText,
    ),
  );
  const filteredStats = getProjectStats(filteredProjects);

  const openProject = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-7">
      <InfoRibbon
        title="Project ribbon"
        description="The current portfolio stats stay in a slim ribbon rather than a separate focus panel."
        items={[
          { label: "Projects", value: String(stats.totalProjects) },
          { label: "Visible", value: String(filteredProjects.length) },
          { label: "Budget", value: formatCurrencyInCrore(stats.totalBudgetCrore) },
          { label: "Avg progress", value: formatPercentage(stats.averageProgress) },
          { label: "Scope", value: scopeTarget.label },
        ]}
      />

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <AppCard title="Projects" description="A quiet portfolio view. Open a card for more detail.">
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Projects" value={String(filteredStats.totalProjects)} detail={`Visible in ${scopeTarget.label}`} icon={BarChart3} />
            <MetricCard label="Budget" value={formatCurrencyInCrore(filteredStats.totalBudgetCrore)} detail="Filtered envelope" icon={MapPinned} />
            <MetricCard label="Avg progress" value={formatPercentage(filteredStats.averageProgress)} detail="Filtered mean" icon={Users} />
          </div>
        </AppCard>

        <AppCard title="Focus" description="Only the sharpest signals stay on the surface.">
          <div className="grid gap-3">
            <MiniLine label="High-risk projects" value={String(filteredStats.highRiskProjects)} />
            <MiniLine label="Active issues" value={String(filteredStats.activeIssues)} />
            <MiniLine label="Header search" value={searchText.trim() || "All projects"} />
          </div>
        </AppCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredProjects.map((project) => (
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
              <Button onClick={() => openProject(project.id)}>Open</Button>
            </div>
          </article>
        ))}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No projects match the header filters"
            description="Try a broader search or switch the geographic scope back to National."
            icon={FolderSearch}
          />
        ) : null}
      </section>
    </div>
  );
}

function getProjectStats(projects: Project[]) {
  const totalBudgetCrore = projects.reduce((sum, project) => sum + project.budgetCrore, 0);
  const averageProgress =
    projects.length === 0 ? 0 : Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length);

  return {
    totalProjects: projects.length,
    totalBudgetCrore,
    averageProgress,
    activeIssues: projects.reduce((sum, project) => sum + project.issues.length, 0),
    highRiskProjects: projects.filter((project) => project.riskScore >= 70).length,
  };
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-blue-950">{value}</p>
    </div>
  );
}
