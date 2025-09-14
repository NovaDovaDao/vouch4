import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useAppStore } from "@/stores/app-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

const GET_GYM_OPTIONS = graphql(`
  query GetGymOptions1 {
    gyms {
      id
      name
    }
  }
`);

export default function SelectGym() {
  const { data: gyms, isFetching } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => execute(GET_GYM_OPTIONS),
    select: (data) => data.gyms ?? [],
  });
  const appStore = useAppStore();

  useEffect(() => {
    if (appStore.selectedGymId || !gyms?.length) return;
    appStore.setSelectedGymId(gyms[0].id);
  }, [gyms, appStore.selectedGymId, appStore]);

  return (
    <Fragment>
      <Select
        defaultValue={appStore.selectedGymId}
        disabled={isFetching}
        onValueChange={(val) => appStore.setSelectedGymId(val)}
      >
        <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm">
          <SelectValue placeholder="Select a gym" />
        </SelectTrigger>
        <SelectContent>
          {gyms?.map((gym) => (
            <SelectItem value={gym.id}>{gym.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
        {gyms?.map((gym) => (
          <TabsTrigger
            value={gym.id}
            disabled={isFetching}
            onClick={() => appStore.setSelectedGymId(gym.id)}
          >
            {gym.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Fragment>
  );
}
