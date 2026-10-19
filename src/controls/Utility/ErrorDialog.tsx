import { mergeStyles } from "@fluentui/react/lib/Styling";
import { DefaultButton } from "@fluentui/react/lib/components/Button/DefaultButton/DefaultButton";
import { Dialog } from "@fluentui/react/lib/components/Dialog/Dialog";
import { DialogFooter } from "@fluentui/react/lib/components/Dialog/DialogFooter";
import { FontIcon } from "@fluentui/react/lib/components/Icon/FontIcon";

interface IErrorDialogProps {
  title: string;
  message: string;
  onDismiss: () => void;
  children: React.ReactNode;
}

const iconClass = mergeStyles({
  fontSize: 27,
  marginRight: 8,
  color: "#ff2261",
});

export default function ErrorDialog({
  title,
  message,
  onDismiss,
  children,
}: IErrorDialogProps) {
  return (
    <Dialog
      hidden={false}
      onDismiss={onDismiss}
      dialogContentProps={{
        title: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontIcon iconName="StatusErrorFull" className={iconClass} />
            {title}
          </div>
        ),
        subText: message,
      }}
    >
      {children}
      <DialogFooter>
        <DefaultButton text="Close" onClick={onDismiss} />
      </DialogFooter>
    </Dialog>
  );
}

