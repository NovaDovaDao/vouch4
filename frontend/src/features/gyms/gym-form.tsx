import { type UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { GymFormData } from "./gym.schema";

interface GymFormProps {
  form: UseFormReturn<GymFormData>; // Pass the useForm hook's return value
  onSubmit: (data: GymFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

export default function GymForm({ form, onSubmit }: GymFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" autoFocus {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label>Legal Name</Label>
        <Input {...register("legalEntityName")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Street</Label>
        <Input {...register("address.street1")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label>City</Label>
        <Input {...register("address.city")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label>State</Label>
        <Select {...register("address.state")}>
          <SelectTrigger
            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
          >
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="Florida">Florida</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Country</Label>
        <Select {...register("address.country")}>
          <SelectTrigger
            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
          >
            <SelectValue placeholder="Assign Gym" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="United States">United States</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Zip</Label>
        <Input {...register("address.zip")} />
      </div>
    </form>
  );
}
