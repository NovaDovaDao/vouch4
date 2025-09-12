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
import { useMemo, useState } from "react";
import SearchForm from "./search-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { SearchQuery } from "@/graphql/graphql";
import { IconBuilding, IconListDetails, IconUsers } from "@tabler/icons-react";

const SEARCH = graphql(`
  query Search($input: SearchInput!) {
    search(input: $input) {
      ... on Person {
        __typename
        id
        personName: name
      }
      ... on Gym {
        __typename
        id
        gymName: name
      }
      ... on ClassTemplate {
        __typename
        id
        className: name
      }
    }
  }
`);

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
  const { data: results, isLoading } = useQuery({
    queryKey: ["search", searchInput],
    queryFn: () => execute(SEARCH, { input: { query: searchInput } }),
    select: (data) => data.search,
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
        <div className="space-y-2">
          {results?.map((item, i) => (
            <SearchResultItem key={i} item={item} />
          ))}
        </div>
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

const SearchResultItem = ({ item }: { item: SearchQuery["search"][0] }) => {
  const [name, Icon] = useMemo(() => {
    switch (item.__typename) {
      case "ClassTemplate":
        return [item.className, IconListDetails];
      case "Gym":
        return [item.gymName, IconBuilding];
      case "Member":
      case "Staff":
        return [item.personName, IconUsers];
      case "ScheduledClass":
      default:
        return ["Unknown"];
    }
  }, [item]);

  return (
    <Button
      variant="secondary"
      className="w-full justify-start h-12"
      size="default"
    >
      <div className="flex items-center gap-4">
        <span
          data-slot="avatar"
          className="relative flex items-center justify-center size-8 shrink-0 overflow-hidden rounded-full bg-background"
        >
          {Icon && <Icon className="size-4" />}
        </span>
        <div className="text-left text-xs">
          <p className="leading-none font-medium">{name}</p>
          <p className="text-muted-foreground text-sm">{item.__typename}</p>
        </div>
      </div>
    </Button>
  );
};
