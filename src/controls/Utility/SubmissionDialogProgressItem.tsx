import { mergeStyles } from "@fluentui/react/lib/Styling";
import { FontIcon } from "@fluentui/react/lib/components/Icon/FontIcon";
import { SubmissionStatus } from "@src/models/SubmissionStatus";

interface SubmissionDialogProgressItemProps {
  title: string;
  status: SubmissionStatus;
}

const iconClass = mergeStyles({
  marginRight: 8,
  fontSize: "1rem"
});

export default function SubmissionDialogProgressItem({title, status}: SubmissionDialogProgressItemProps) {
  const icon = status === "success" ? "CompletedSolid" : (status === "error" ? "StatusErrorFull" : "SyncStatusSolid");
  const color = status === "success" ? "green" : (status === "error" ? "red" : "grey");

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      <FontIcon
        iconName={icon}
        className={iconClass}
        style={{ color: color }}
      />
      <span style={{fontSize: "0.75rem"}}>{title}</span>
    </div>
  )
}
