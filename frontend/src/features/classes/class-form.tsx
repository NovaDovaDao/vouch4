import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { ClassFormData } from "./class.schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { $api } from "@/api/client";

interface ClassFormProps {
  form: UseFormReturn<ClassFormData>; // Pass the useForm hook's return value
  onSubmit: (data: ClassFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

export default function ClassForm({ form, onSubmit }: ClassFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [openCal, setOpenCal] = useState(false);
  const { data: staff, isFetching: isFetchingStaff } = $api.useQuery(
    "get",
    "/staff"
  );
  const { data: gyms, isFetching: isFetchingGyms } = $api.useQuery(
    "get",
    "/gyms"
  );

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
        <Input id="capacity" step={1} type="number" {...register("capacity")} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="scheduled-date">Scheduled Date</Label>
        <Controller
          name="scheduleDateTime"
          defaultValue=""
          control={form.control}
          render={({ field }) => {
            return (
              <Popover open={openCal} onOpenChange={setOpenCal}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {field.value
                      ? new Date(field.value).toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpenCal(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        ></Controller>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="gym">Gym</Label>
        <Select {...register("gymId")} disabled={isFetchingGyms}>
          <SelectTrigger
            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
            id="gym"
          >
            <SelectValue placeholder="Assign Gym" />
          </SelectTrigger>
          <SelectContent align="end">
            {gyms?.map((gym) => (
              <SelectItem value={gym.id}>
                {gym.name} ({gym.legalEntityName})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="capacity">Instructor</Label>
        <Select {...register("instructorId")} disabled={isFetchingStaff}>
          <SelectTrigger
            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
            id="location"
          >
            <SelectValue placeholder="Assign instructor" />
          </SelectTrigger>
          <SelectContent align="end">
            {staff?.map((instructor) => (
              <SelectItem value={instructor.id}>
                {instructor.lastName}, {instructor.firstName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
