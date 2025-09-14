import { create } from "zustand";

export type DialogPayload =
  | { type: "createStaff" }
  | { type: "createMember" }
  | { type: "createClassTemplate" }
  | { type: "createGym" }
  | { type: "createProduct" }
  | { type: "grantEntitlement"; memberId: string }
  | { type: "search" }
  | { type: "help" }
  | { type: null }; // Represents no Dialog being open

interface DialogStore {
  currentDialog: DialogPayload; // This holds the current Dialog state, including its type and props
  openDialog: (payload: Exclude<DialogPayload, { type: null }>) => void; // Only allow non-null types to be opened
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  currentDialog: { type: null }, // Initial state: no Dialog open
  openDialog: (payload) => set({ currentDialog: payload }),
  closeDialog: () => set({ currentDialog: { type: null } }),
}));
