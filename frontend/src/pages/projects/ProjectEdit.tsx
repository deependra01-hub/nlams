import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, CheckCircle2, Save } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppCard } from "../../components/common/AppCard";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { useProjects } from "../../hooks/useProjects";
import type { ProjectStatus } from "../../types/project.types";

type ProjectDraft = {
  name: string;
  agency: string;
  status: ProjectStatus;
  progress: number;
  riskScore: number;
  targetDate: string;
  description: string;
};

const STATUS_OPTIONS: ProjectStatus[] = ["planning", "survey", "acquisition", "award", "possession"];

export function ProjectEdit() {
  const { projectId } = useParams();
  const { getProjectById, setActiveProjectId } = useProjects();
  const project = projectId ? getProjectById(projectId) : null;
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<ProjectDraft | null>(() =>
    project
      ? {
          name: project.name,
          agency: project.agency,
          status: project.status,
          progress: project.progress,
          riskScore: project.riskScore,
          targetDate: project.targetDate,
          description: project.description,
        }
      : null,
  );

  useEffect(() => {
    if (projectId) {
      setActiveProjectId(projectId);
    }
  }, [projectId, setActiveProjectId]);

  if (!project || !draft) {
    return <Navigate to="/projects" replace />;
  }

  const updateDraft = <Key extends keyof ProjectDraft>(key: Key, value: ProjectDraft[Key]) => {
    setSaved(false);
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  };

  return (
    <div className="space-y-7">
      <AppCard title="Edit project" description="Update the frontend project draft before backend persistence is connected.">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.code}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{draft.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="neutral">
                {project.district}, {project.state}
              </Badge>
              <Badge tone="primary">Frontend draft</Badge>
              {saved ? <Badge tone="success">Saved locally</Badge> : null}
            </div>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-control border border-sky-100 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-gov-200 hover:bg-gov-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to detail
          </Link>
        </div>
      </AppCard>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <AppCard title="Project fields" description="A minimal edit surface for the values shown in the project detail page.">
          <div className="grid gap-4">
            <Field label="Project name">
              <input
                value={draft.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
              />
            </Field>

            <Field label="Agency">
              <input
                value={draft.agency}
                onChange={(event) => updateDraft("agency", event.target.value)}
                className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Status">
                <select
                  value={draft.status}
                  onChange={(event) => updateDraft("status", event.target.value as ProjectStatus)}
                  className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Progress">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={draft.progress}
                  onChange={(event) => updateDraft("progress", Number(event.target.value))}
                  className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
                />
              </Field>
              <Field label="Risk score">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={draft.riskScore}
                  onChange={(event) => updateDraft("riskScore", Number(event.target.value))}
                  className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
                />
              </Field>
            </div>

            <Field label="Target date">
              <input
                type="date"
                value={draft.targetDate}
                onChange={(event) => updateDraft("targetDate", event.target.value)}
                className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm outline-none transition focus:border-gov-300 focus:bg-white"
              />
            </Field>

            <Field label="Description">
              <textarea
                value={draft.description}
                onChange={(event) => updateDraft("description", event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm leading-6 outline-none transition focus:border-gov-300 focus:bg-white"
              />
            </Field>
          </div>
        </AppCard>

        <AppCard title="Draft preview" description="Preview the values before backend persistence is added.">
          <div className="grid gap-3">
            <PreviewLine label="Project" value={draft.name} />
            <PreviewLine label="Agency" value={draft.agency} />
            <PreviewLine label="Status" value={draft.status.replaceAll("_", " ")} />
            <PreviewLine label="Progress" value={`${draft.progress}%`} />
            <PreviewLine label="Risk" value={`${draft.riskScore}/100`} />
            <PreviewLine label="Target" value={draft.targetDate} />
          </div>

          {saved ? (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4" />
              Project edit saved locally for frontend review.
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <Button leadingIcon={Save} onClick={() => setSaved(true)}>
              Save changes
            </Button>
            <Link to={`/projects/${project.id}`} className="inline-flex">
              <Button variant="secondary">Cancel</Button>
            </Link>
          </div>
        </AppCard>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-950">{label}</span>
      {children}
    </label>
  );
}

function PreviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold capitalize text-blue-950">{value}</p>
    </div>
  );
}
