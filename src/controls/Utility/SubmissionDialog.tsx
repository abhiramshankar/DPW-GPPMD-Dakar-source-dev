import { Spinner, SpinnerSize } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Dialog } from "@fluentui/react/lib/components/Dialog/Dialog";
import { DialogFooter } from "@fluentui/react/lib/components/Dialog/DialogFooter";
import { FontIcon } from "@fluentui/react/lib/components/Icon/FontIcon";
import { SubmissionStatus } from "@src/models/SubmissionStatus";

interface ISubmissionDialogProps {
  title: string;
  message: string;
  status: SubmissionStatus;
  children: React.ReactNode;
}

const iconClass = mergeStyles({
  fontSize: 27,
  marginRight: 8,
});

export default function SubmissionDialog({
  title,
  message,
  status,
  children,
}: ISubmissionDialogProps) {
  const icon = status === "success" ? "CompletedSolid" : (status === "error" ? "StatusErrorFull" : "SyncStatusSolid");
  const color = status === "success" ? "green" : (status === "error" ? "red" : "grey");

  if (status === "loading") {
    return (
      <Dialog hidden={false} modalProps={{ isBlocking: true }}>
        <Spinner
          label="Submitting..."
          ariaLive="assertive"
          labelPosition="bottom"
          styles={{ root: { marginBottom: 20 } }}
          size={SpinnerSize.large}
        />
      </Dialog>
    );
  }

  return (
    <Dialog
      hidden={false}
      modalProps={{ isBlocking: true }}
      dialogContentProps={{
        title: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontIcon
              iconName={icon}
              className={iconClass}
              style={{ color: color }}
            />
            {title}
          </div>
        ),
        subText: message,
        showCloseButton: false,
      }}
    >
      <DialogFooter
        styles={{ actionsRight: { width: "100%" }, action: { width: "100%" } }}
      >
        {children}
      </DialogFooter>
    </Dialog>
  );
}
