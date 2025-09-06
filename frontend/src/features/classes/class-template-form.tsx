import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { type UseFormReturn } from "react-hook-form";
import type { ClassTemplateFormData } from "./class-template.schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { graphql } from "@/graphql";
import { useQuery } from "@tanstack/react-query";
import { execute } from "@/graphql/execute";

interface ClassTemplateFormProps {
  form: UseFormReturn<ClassTemplateFormData>; // Pass the useForm hook's return value
  onSubmit: (data: ClassTemplateFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

const CLASS_TEMPLATE_FORM_OPTIONS = graphql(`
  query ClassTemplateOptions {
    staff {
      id
      firstName
      lastName
    }
    gyms {
      id
      name
      legalEntityName
    }
  }
`);

export default function ClassTemplateForm({
  form,
  onSubmit,
}: ClassTemplateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { data: options, isFetching: isFetchingOptions } = useQuery({
    queryKey: ["classTemplate", "options"],
    queryFn: () => execute(CLASS_TEMPLATE_FORM_OPTIONS),
  });

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
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          step={1}
          type="number"
          {...register("capacity", { valueAsNumber: true })}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="recurrence">Recurrence</Label>
        <Input id="recurrence" {...register("recurrence")} />
        {errors.recurrence && (
          <p className="text-red-500 text-sm mt-1">
            {errors.recurrence.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="gym">Gym</Label>
        <Select
          {...register("gymId")}
          value={form.getValues("gymId")}
          disabled={isFetchingOptions}
          onValueChange={(val) => form.setValue("gymId", val)}
        >
          <SelectTrigger
            className="w-full **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
            id="gym"
          >
            <SelectValue placeholder="Assign gym" />
          </SelectTrigger>
          <SelectContent align="end">
            {options?.gyms.map((gym) => (
              <SelectItem value={gym.id}>
                {gym.name} ({gym.legalEntityName})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="capacity">Instructor</Label>
        <Select
          {...register("instructorId")}
          disabled={isFetchingOptions}
          defaultValue={form.getValues("instructorId") ?? ""}
          onValueChange={(val) => form.setValue("instructorId", val)}
        >
          <SelectTrigger
            className="w-full **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
            id="location"
          >
            <SelectValue placeholder="Assign instructor" />
          </SelectTrigger>
          <SelectContent align="end">
            {options?.staff.map((instructor, i) => (
              <SelectItem key={i} value={instructor.id}>
                {instructor.lastName}, {instructor.firstName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
