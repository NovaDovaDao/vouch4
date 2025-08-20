import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { type UseFormReturn } from "react-hook-form";
import type { SearchFormData } from "./search.schema";

interface SearchFormProps {
  form: UseFormReturn<SearchFormData>; // Pass the useForm hook's return value
  onSubmit: (data: SearchFormData) => void;
  isLoading?: boolean;
  isSubmitting: boolean;
}

export default function SearchForm({ form, onSubmit }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="input" className="sr-only">
          Search
        </Label>
        <Input id="input" autoFocus {...register("input")} />
        {errors.input && (
          <p className="text-red-500 text-sm mt-1">{errors.input.message}</p>
        )}
      </div>
    </form>
  );
}
