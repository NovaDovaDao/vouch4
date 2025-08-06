import { IconLoader3 } from "@tabler/icons-react";

export default function AppLoading() {
  return (
    <div className="inset-0 h-full w-full flex items-center justify-center p-4">
      <IconLoader3 className="size-6 aspect-square animate-spin" />
    </div>
  );
}
