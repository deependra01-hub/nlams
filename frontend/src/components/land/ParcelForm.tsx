import { Button } from "../common/Button";
import { Input, Textarea } from "../common/Input";

export function ParcelForm({
  onApprove,
  onReject,
}: {
  onApprove?: () => void;
  onReject?: () => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="verify-reporter" label="Verifier name" placeholder="Field officer / review lead" />
        <Input id="verify-date" label="Verification date" type="date" />
      </div>
      <Textarea
        id="verify-notes"
        label="Verification notes"
        placeholder="Record field observations, measurement differences, or ownership clarifications..."
        rows={5}
      />
      <div className="flex flex-wrap gap-3">
        <Button onClick={onApprove}>Approve parcel</Button>
        <Button variant="secondary" onClick={onReject}>
          Send for correction
        </Button>
      </div>
    </div>
  );
}
