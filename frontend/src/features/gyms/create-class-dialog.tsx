import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClassForm from "./class-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema } from "./gym.schema";
import { useQueryClient } from "@tanstack/react-query";
import { $api, type CreateClass } from "@/api/client";
import { toast } from "sonner";

export default function CreateClassDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 0,
      gymId: "",
      instructorId: "",
      scheduleDateTime: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("post", "/classes");

  const handleSubmit = (body: CreateClass) =>
    mutate(
      { body },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/members"] });
          toast.success("Success!", {
            description: `Added ${data.name}!`,
          });
          handleOpen(false);
        },
      }
    );

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ClassForm
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleSubmit(form.getValues())}>
            Save class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
