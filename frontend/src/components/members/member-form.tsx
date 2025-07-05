import z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { CreateMember } from "@/api/client";
import { useState } from "react";

const schema: z.ZodType<CreateMember> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export default function MemberForm() {
  const [data, setData] = useState<z.infer<typeof schema>>({
    email: "",
    firstName: "",
    isActive: true,
    lastName: "",
    passwordHash: "",
    phoneNumber: "",
    walletAddress: "",
  });

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" defaultValue={data.firstName} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" defaultValue={data.lastName} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            defaultValue={data.email}
            type="email"
            onChange={(ev) =>
              setData((d) => ({ ...d, email: ev.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="reviewer">Reviewer</Label>
        <Select defaultValue={data.phoneNumber ?? ""}>
          <SelectTrigger id="reviewer" className="w-full">
            <SelectValue placeholder="Select a reviewer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
            <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
