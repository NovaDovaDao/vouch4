import { ComponentPropsWithRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function PasswordInput({
  ref,
  ...props
}: ComponentPropsWithRef<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} ref={ref} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <IconEyeOff className="h-4 w-4" />
        ) : (
          <IconEye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
