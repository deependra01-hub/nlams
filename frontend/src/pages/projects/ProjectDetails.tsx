import { useEffect } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
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
    <div className="space-y-7">
      <AppCard title="Project detail" description="Operational drill-down for the selected project.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.code}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{project.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-control border border-sky-100 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-gov-200 hover:bg-gov-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
            <Link
              to={`/projects/${project.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <Pencil className="h-4 w-4" />
              Edit project
            </Link>
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
