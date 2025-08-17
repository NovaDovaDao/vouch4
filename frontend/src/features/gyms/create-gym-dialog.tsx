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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type {
  CreateGymMutationVariables,
  GymCreateInput,
} from "@/graphql/graphql";

const CREATE_GYM = graphql(`
  mutation CreateGym($data: GymCreateInput!) {
    createGym(data: $data) {
      id
      name
    }
  }
`);

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
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-gym"],
    mutationFn: (variables: CreateGymMutationVariables) =>
      execute(CREATE_GYM, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["gyms"] });
      toast.success("Success!", {
        description: `Added! ${data.createGym.name}`,
      });
      handleOpen(false);
    },
  });

  const handleSubmit = (body: GymCreateInput) => {
    mutate({
      data: body,
    });
  };

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
