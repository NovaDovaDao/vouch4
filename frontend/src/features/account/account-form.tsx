import { type UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AccountFormData } from "./account.schema";
import { Button } from "@/components/ui/button";

interface ClassFormProps {
  form: UseFormReturn<AccountFormData>; // Pass the useForm hook's return value
  onSubmit: (data: AccountFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

export default function AccountForm({ form, onSubmit }: ClassFormProps) {
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
        <Label htmlFor="legal-name">Legal Name</Label>
        <Input id="legal-name" {...register("legalName")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="contact-email">Contact Email</Label>
        <Input id="contact-email" type="email" {...register("contactEmail")} />
        {errors.contactEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contactEmail.message}
          </p>
        )}
      </div>
      <div className="text-right">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
