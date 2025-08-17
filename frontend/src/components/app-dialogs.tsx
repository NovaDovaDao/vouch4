import CreateClassDialog from "@/features/classes/create-class-dialog";
import CreateGymDialog from "@/features/gyms/create-gym-dialog";
import CreateStaffDialog from "@/features/staff/create-staff-dialog";
import { useDialogStore } from "@/stores/dialog-store";

export default function AppDialogs() {
  const { closeDialog, currentDialog } = useDialogStore();

  switch (currentDialog.type) {
    case "createClass":
      return <CreateClassDialog handleOpen={closeDialog} />;
    case "createStaff":
      return <CreateStaffDialog handleOpen={closeDialog} />;
    case "createGym":
      return <CreateGymDialog handleOpen={closeDialog} />;
    case null:
      return null; // No modal currently open
    default:
      return null;
  }
}
