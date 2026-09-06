import { Badge } from "../common/Badge";
import { documentService } from "../../services/document.service";
import type {
  DocumentStatus as DocumentStatusType,
  DocumentVerificationStatus,
} from "../../types/document.types";

const statusTone: Record<DocumentStatusType, "primary" | "success" | "warning" | "danger" | "neutral"> = {
  draft: "neutral",
  under_review: "warning",
  verified: "success",
  rejected: "danger",
  archived: "neutral",
};

const verificationTone: Record<
  DocumentVerificationStatus,
  "primary" | "success" | "warning" | "danger" | "neutral"
> = {
  pending: "warning",
  verified: "success",
  rejected: "danger",
};

export function DocumentStatus({
  status,
  verificationStatus,
}: {
  status: DocumentStatusType;
  verificationStatus: DocumentVerificationStatus;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone={statusTone[status]}>{documentService.getStatusLabel(status)}</Badge>
      <Badge tone={verificationTone[verificationStatus]}>
        Verification {documentService.getVerificationLabel(verificationStatus)}
      </Badge>
    </div>
  );
}
