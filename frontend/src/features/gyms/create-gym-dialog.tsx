import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GymForm from "./gym-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gymSchema } from "./gym.schema";
import { useQueryClient } from "@tanstack/react-query";
import { $api, type CreateGym } from "@/api/client";
import { toast } from "sonner";

export default function CreateGymDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      name: "",
      address: {
        city: "",
        country: "",
        street1: "",
        state: "",
        zip: "",
      },
      legalEntityName: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("post", "/gyms");

  const handleSubmit = (body: CreateGym) =>
    mutate(
      { body },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "gyms"] });
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
          <DialogTitle>Add Gym</DialogTitle>
        </DialogHeader>
        <GymForm form={form} onSubmit={handleSubmit} isSubmitting={isPending} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleSubmit(form.getValues())}>
            Save gym
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
