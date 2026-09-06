import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { ProjectFilters } from "../../components/projects/ProjectFilters";
import { useProjects } from "../../hooks/useProjects";
import { projectService } from "../../services/project.service";
import type { ProjectStatus } from "../../types/project.types";
import { formatCurrencyInCrore, formatPercentage } from "../../utils/formatters";
import { BarChart3, MapPinned, ShieldAlert, Users } from "lucide-react";

export function ProjectList() {
  const navigate = useNavigate();
  const { projects, stats, setActiveProjectId } = useProjects();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [project.code, project.name, project.district, project.state, project.agency]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = status === "all" || project.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, status]);

  const openProject = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-4">
      <AppCard
        title="Projects"
        description="A portfolio view for land acquisition progress, risk posture, and operational ownership."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Active projects"
            value={String(stats.totalProjects)}
            detail="Projects currently in the demo portfolio."
            icon={BarChart3}
          />
          <MetricCard
            label="Budget envelope"
            value={formatCurrencyInCrore(stats.totalBudgetCrore)}
            detail="Combined project budget estimate."
            icon={MapPinned}
          />
          <MetricCard
            label="Average progress"
            value={formatPercentage(stats.averageProgress)}
            detail="Mean completion across the portfolio."
            icon={Users}
          />
          <MetricCard
            label="High-risk projects"
            value={String(stats.highRiskProjects)}
            detail="Projects needing closer review."
            icon={ShieldAlert}
          />
        </div>
      </AppCard>

      <ProjectFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onReset={() => {
          setQuery("");
          setStatus("all");
        }}
      />

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects match the current filters"
          description="Try widening the search or resetting the selected status."
          icon={BarChart3}
          actionLabel="Reset filters"
          onAction={() => {
            setQuery("");
            setStatus("all");
          }}
        />
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <StatusSummary label="Planning" count={projectService.listProjects("planning").length} />
        <StatusSummary label="Survey" count={projectService.listProjects("survey").length} />
        <StatusSummary label="Acquisition" count={projectService.listProjects("acquisition").length} />
      </div>
    </div>
  );
}

function StatusSummary({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{count}</p>
      <p className="mt-1 text-sm text-slate-600">Projects currently in this stage.</p>
      <Badge tone="neutral" className="mt-3">
        Demo status
      </Badge>
    </div>
  );
}
