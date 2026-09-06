import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import type { Project } from "../../types/project.types";
import { formatPercentage } from "../../utils/formatters";
import { projectService } from "../../services/project.service";

const statusTone: Record<Project["status"], "primary" | "success" | "warning" | "neutral"> = {
  planning: "neutral",
  survey: "warning",
  acquisition: "primary",
  award: "success",
  possession: "success",
};

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (projectId: string) => void;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[project.status]}>
              {projectService.getStatusLabel(project.status)}
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {project.code}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">{project.name}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{project.description}</p>
        </div>
        <div className="rounded-2xl bg-gov-50 px-3 py-2 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gov-700">Progress</p>
          <p className="mt-1 text-2xl font-semibold text-gov-900">
            {formatPercentage(project.progress)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <MetaItem icon={MapPin} label="Location" value={`${project.district}, ${project.state}`} />
        <MetaItem icon={CalendarDays} label="Target" value={project.targetDate} />
        <MetaItem icon={CalendarDays} label="Families" value={String(project.affectedFamilies)} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500">
          Risk score{" "}
          <span className="font-semibold text-slate-900">{project.riskScore}/100</span>
        </div>
        <Button variant="secondary" leadingIcon={ArrowRight} onClick={() => onOpen(project.id)}>
          Open project
        </Button>
      </div>
    </article>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4 text-gov-700" />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
