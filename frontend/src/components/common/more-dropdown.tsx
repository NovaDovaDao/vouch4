import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Fragment, type ComponentProps } from "react";

type Item = ComponentProps<typeof DropdownMenuItem>;

export default function MoreDropDown({ items }: { items: Item[][] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground inline-flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {items.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.map((item, j) => (
                <DropdownMenuItem key={`item-${i}-${j}`} {...item} />
              ))}
              {i < items.length - 1 && (
                <DropdownMenuSeparator key={`separator-${i}`} />
              )}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
