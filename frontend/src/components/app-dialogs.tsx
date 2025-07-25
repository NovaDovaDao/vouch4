import { CreateClasDialog } from "@/features/classes/create-class-dialog";
import { useDialogStore } from "@/stores/dialog-store";

export default function AppDialogs() {
  const { closeDialog, currentDialog } = useDialogStore();

  switch (currentDialog.type) {
    case "createClass":
      // TypeScript knows currentModal.props is ViewReportModalProps here
      return <CreateClasDialog isOpen={true} onClose={closeDialog} />;
    case null:
      return null; // No modal currently open
    default:
      return null;
  }
}
