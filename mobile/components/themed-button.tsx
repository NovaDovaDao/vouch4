import { Button } from "@react-navigation/elements";
import { ComponentProps } from "react";

export function ThemedButton(props: ComponentProps<typeof Button>) {
  return <Button {...props} />;
}
