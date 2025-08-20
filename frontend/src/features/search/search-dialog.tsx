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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchFormData } from "./search.schema";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import SearchForm from "./search-form";

export default function SearchDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      input: "",
    },
    shouldFocusError: true,
  });

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["search", searchInput],
    queryFn: () => {},
    select: () => [],
  });

  const handleSubmit = (data: SearchFormData) => setSearchInput(data.input);

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for staff, classes, gyms, etc.
          </DialogDescription>
        </DialogHeader>
        <SearchForm
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
        {data?.length && (
          <Fragment>
            <h4>Search results:</h4>
            {data?.length}
          </Fragment>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleSubmit(form.getValues())}>Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
