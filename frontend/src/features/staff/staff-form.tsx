import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type UseFormReturn } from "react-hook-form";
import type { StaffFormData } from "./staff.schema";

interface MemberFormProps {
  form: UseFormReturn<StaffFormData>; // Pass the useForm hook's return value
  onSubmit: (data: StaffFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

export default function MemberForm({ form, onSubmit }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" autoFocus {...register("firstName")} />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" {...register("lastName")} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
        </div>
      </div>
    </form>
  );
}
