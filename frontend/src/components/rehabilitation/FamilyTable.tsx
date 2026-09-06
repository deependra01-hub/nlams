import { ArrowRight } from "lucide-react";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import type { RRFamily } from "../../types/rr.types";
import { formatCurrencyInCrore, formatDate } from "../../utils/formatters";

const statusTone: Record<RRFamily["status"], "neutral" | "warning" | "primary" | "success"> = {
  not_started: "neutral",
  in_progress: "warning",
  partially_completed: "primary",
  completed: "success",
};

export function FamilyTable({
  families,
  onOpen,
}: {
  families: RRFamily[];
  onOpen: (familyId: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Family</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Location</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Benefit</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Last visit</th>
            <th className="border-b border-slate-200 px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {families.map((family) => (
            <tr key={family.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-900">{family.headName}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {family.members} members · {family.displacementType}
                </div>
              </td>
              <td className="px-4 py-4 text-slate-700">
                {family.village}, {family.district}
              </td>
              <td className="px-4 py-4">
                <Badge tone={statusTone[family.status]}>{family.status.replaceAll("_", " ")}</Badge>
              </td>
              <td className="px-4 py-4 text-slate-700">{formatCurrencyInCrore(family.rehabilitationBenefitLakh / 100)}</td>
              <td className="px-4 py-4 text-slate-700">{formatDate(family.lastVisit)}</td>
              <td className="px-4 py-4">
                <Button variant="secondary" leadingIcon={ArrowRight} onClick={() => onOpen(family.id)}>
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
