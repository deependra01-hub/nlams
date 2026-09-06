import { ArrowLeft, Pencil } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppCard } from "../../components/common/AppCard";
import { Button } from "../../components/common/Button";
import { ProjectOverview } from "../../components/projects/ProjectOverview";
import { ProjectRiskPanel } from "../../components/projects/ProjectRiskPanel";
import { ProjectTimeline } from "../../components/projects/ProjectTimeline";
import { useProjects } from "../../hooks/useProjects";

export function ProjectDetails() {
  const { projectId } = useParams();
  const { getProjectById, setActiveProjectId, activeProject } = useProjects();

  const project = projectId ? getProjectById(projectId) : activeProject;

  useEffect(() => {
    if (projectId) {
      setActiveProjectId(projectId);
    }
  }, [projectId, setActiveProjectId]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="space-y-4">
      <AppCard title="Project detail" description="Operational drill-down for the selected project.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {project.code}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              {project.name}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
            <Button variant="ghost" leadingIcon={Pencil} disabled>
              Edit coming next phase
            </Button>
          </div>
        </div>
      </AppCard>

      <ProjectOverview project={project} />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <ProjectTimeline project={project} />
        <ProjectRiskPanel project={project} />
      </div>
    </div>
  );
}
