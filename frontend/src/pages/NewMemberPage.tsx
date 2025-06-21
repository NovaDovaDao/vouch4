// frontend/src/pages/NewMemberPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember } from "../services/members.ts";
import { CreateMemberDto } from "../../../backend/src/members/member.model.ts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Label } from "../components/ui/label.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.tsx";
import { toast } from "sonner";

const NewMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State to hold form data
  const [formData, setFormData] = useState<CreateMemberDto>({
    name: "",
    email: "",
    phoneNumber: "",
    walletAddress: "",
    membershipStatus: "Pending", // Default status
    membershipType: "",
    membershipNftId: "",
    waiverStatus: "Pending Signature", // Default status
    waiverHash: "",
    profilePicUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof CreateMemberDto, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // TanStack Query mutation for creating a member
  const createMemberMutation = useMutation({
    mutationFn: createMember,
    onSuccess: (newMember) => {
      // Invalidate members query to refetch list after creation
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast("Success!", {
        description: `Member "${newMember.name}" created successfully.`,
      });
      navigate("/members"); // Navigate back to members list
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "Failed to create member.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMemberMutation.mutate(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Member</CardTitle>
        <CardDescription>
          Enter the details for the new gym member.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              type="text"
              required
              value={formData.walletAddress}
              onChange={handleChange}
            />
          </div>

          {/* Membership Status */}
          <div className="grid gap-2">
            <Label htmlFor="membershipStatus">Membership Status</Label>
            <Select
              value={formData.membershipStatus || "Pending"}
              onValueChange={(value: string) =>
                handleSelectChange("membershipStatus", value)
              }
            >
              <SelectTrigger id="membershipStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Frozen">Frozen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Membership Type */}
          <div className="grid gap-2">
            <Label htmlFor="membershipType">Membership Type (Optional)</Label>
            <Input
              id="membershipType"
              type="text"
              value={formData.membershipType || ""}
              onChange={handleChange}
            />
          </div>

          {/* Membership NFT ID */}
          <div className="grid gap-2">
            <Label htmlFor="membershipNftId">
              Membership NFT ID (Optional)
            </Label>
            <Input
              id="membershipNftId"
              type="text"
              value={formData.membershipNftId || ""}
              onChange={handleChange}
            />
          </div>

          {/* Waiver Status */}
          <div className="grid gap-2">
            <Label htmlFor="waiverStatus">Waiver Status</Label>
            <Select
              value={formData.waiverStatus || "Pending Signature"}
              onValueChange={(value: string) =>
                handleSelectChange("waiverStatus", value)
              }
            >
              <SelectTrigger id="waiverStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Signed">Signed</SelectItem>
                <SelectItem value="Pending Signature">
                  Pending Signature
                </SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Waiver Hash */}
          <div className="grid gap-2">
            <Label htmlFor="waiverHash">Waiver Hash (Optional)</Label>
            <Input
              id="waiverHash"
              type="text"
              value={formData.waiverHash || ""}
              onChange={handleChange}
            />
          </div>

          {/* Profile Picture URL */}
          <div className="grid gap-2">
            <Label htmlFor="profilePicUrl">
              Profile Picture URL (Optional)
            </Label>
            <Input
              id="profilePicUrl"
              type="url"
              value={formData.profilePicUrl || ""}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createMemberMutation.isPending}
          >
            {createMemberMutation.isPending ? "Adding Member..." : "Add Member"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewMemberPage;
