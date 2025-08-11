import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

const GET_CONTRACTS = graphql(`
  query GetContracts {
    contracts {
      id
    }
  }
`);

export default function ReportsContractsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => execute(GET_CONTRACTS),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading contracts...</p>
      </div>
    );
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Gym 1</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">
            Gym 1 <Badge variant="secondary">3</Badge>
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Contract</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <DataTable
          data={data?.contracts ?? []}
          columns={[
            {
              accessorKey: "id",
              header: "ID",
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
