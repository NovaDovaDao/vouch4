import { $api } from "@/api/client.ts";
import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";

export default function ClassesPage() {
  const { data, isLoading } = $api.useQuery("get", "/classes");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6">
      <DataTable
        data={data ?? []}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "scheduleDateTime",
            header: "Scheduled",
          },
          {
            accessorKey: "capacity",
            header: "Capacity",
          },
          {
            accessorKey: "updatedAt",
            header: "Updated",
          },
          {
            id: "actions",
            cell: () => <MoreDropDown items={[]} />,
          },
        ]}
      />
    </div>
  );
}
