import { Search } from "lucide-react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import type { ProjectStatus } from "../../types/project.types";
import { projectService } from "../../services/project.service";

const STATUS_OPTIONS: Array<{ label: string; value: ProjectStatus | "all" }> = [
  { label: "All projects", value: "all" },
  { label: "Planning", value: "planning" },
  { label: "Survey", value: "survey" },
  { label: "Acquisition", value: "acquisition" },
  { label: "Award", value: "award" },
  { label: "Possession", value: "possession" },
];

export function ProjectFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onReset,
}: {
  query: string;
  status: ProjectStatus | "all";
  onQueryChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "all") => void;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:grid-cols-[1.4fr_0.8fr_auto] lg:items-end">
      <Input
        id="project-search"
        label="Search projects"
        placeholder="Search by code, project name, district, or agency"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        leadingIcon={Search}
      />
      <Select
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as ProjectStatus | "all")}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <div className="flex lg:justify-end">
        <Button variant="ghost" onClick={onReset}>
          Reset filters
        </Button>
      </div>
      <p className="text-xs text-slate-500 lg:col-span-3">
        Showing demo project data for the phase. Filters update instantly on the local dataset.
      </p>
      <div className="lg:col-span-3">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {projectService
            .getProjects()
            .slice(0, 3)
            .map((project) => (
              <span
                key={project.id}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium"
              >
                {project.code}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
