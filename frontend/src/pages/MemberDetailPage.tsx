import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMemberById,
  updateMember,
  deleteMember,
  checkInMember,
  type Member,
} from "../services/members.ts";
import { UpdateMemberDto } from "../../../backend/src/members/member.model.ts"; // DTO for type safety

// Shadcn UI Components
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog.tsx"; // For delete confirmation
import { toast } from "sonner";

const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const memberId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<UpdateMemberDto>({
    firstName: "",
    lastName: "",
  }); // Use UpdateMemberDto for form

  // Fetch member data
  const {
    data: member,
    isLoading,
    isError,
    error,
  } = useQuery<Member, Error>({
    queryKey: ["member", memberId],
    queryFn: () => getMemberById(memberId),
    enabled: !!id, // Only run query if ID is available
  });

  // Populate form when member data is loaded
  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.name,
        lastName: member.name,
        email: member.email,
        phoneNumber: member.phoneNumber,
        walletAddress: member.walletAddress,
        membershipStatus: member.membershipStatus,
        membershipType: member.membershipType,
        membershipNftId: member.membershipNftId,
        waiverStatus: member.waiverStatus,
        waiverHash: member.waiverHash,
        profilePicUrl: member.profilePicUrl,
      });
    }
  }, [member]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof UpdateMemberDto, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Mutation for updating a member
  const updateMemberMutation = useMutation({
    mutationFn: (data: UpdateMemberDto) => updateMember(memberId, data),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: ["member", memberId] }); // Invalidate single member query
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Invalidate all members query
      toast("Success!", {
        description: `Member "${updatedMember.name}" updated successfully.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "Failed to update member.",
      });
    },
  });

  // Mutation for checking in a member
  const checkInMutation = useMutation({
    mutationFn: () => checkInMember(memberId),
    onSuccess: (checkInRecord) => {
      toast("Check-in Successful!", {
        description: `Member ${member?.name} checked in at ${new Date(
          checkInRecord.updatedAt
        ).toLocaleTimeString()}.`,
      });
      // Optionally invalidate a 'checkins' query if you had one
    },
    onError: (error: Error) => {
      toast.error("Check-in Error", {
        description: error.message || "Failed to check in member.",
      });
    },
  });

  // Mutation for deleting a member
  const deleteMemberMutation = useMutation({
    mutationFn: () => deleteMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Invalidate all members query
      toast("Member Deleted", {
        description: `Member "${member?.name}" has been removed.`,
      });
      navigate("/members"); // Redirect to members list after deletion
    },
    onError: (error: Error) => {
      toast.error("Deletion Error", {
        description: error.message || "Failed to delete member.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberMutation.mutate(formData);
  };

  if (!id || isNaN(memberId)) {
    return <div className="text-center text-red-600">Invalid Member ID.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading member details...</p>
      </div>
    );
  }

  if (isError) {
    toast.error("Error", {
      description: error?.message || "Failed to load member details.",
    });
    return (
      <div className="flex justify-center items-center h-full text-red-600">
        <p>Error: {error?.message || "Failed to load member details."}</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center text-muted-foreground">Member not found.</div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Edit Member: {member.name}
        </CardTitle>
        <CardDescription>
          Update member details or perform actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Member Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.firstName}
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
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
                value={formData.walletAddress || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Membership Status */}
          <div className="grid gap-2">
            <Label htmlFor="membershipStatus">Membership Status</Label>
            <Select
              value={formData.membershipStatus || "Pending"}
              onValueChange={(value) =>
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
            <Label htmlFor="membershipType">Membership Type</Label>
            <Input
              id="membershipType"
              type="text"
              value={formData.membershipType || ""}
              onChange={handleChange}
            />
          </div>

          {/* Membership NFT ID */}
          <div className="grid gap-2">
            <Label htmlFor="membershipNftId">Membership NFT ID</Label>
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
              onValueChange={(value) =>
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
            <Label htmlFor="waiverHash">Waiver Hash</Label>
            <Input
              id="waiverHash"
              type="text"
              value={formData.waiverHash || ""}
              onChange={handleChange}
            />
          </div>

          {/* Profile Picture URL */}
          <div className="grid gap-2">
            <Label htmlFor="profilePicUrl">Profile Picture URL</Label>
            <Input
              id="profilePicUrl"
              type="url"
              value={formData.profilePicUrl || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={updateMemberMutation.isPending}
            >
              {updateMemberMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => checkInMutation.mutate()}
              disabled={checkInMutation.isPending}
            >
              {checkInMutation.isPending ? "Checking In..." : "Check In Member"}
            </Button>
          </div>
        </form>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full mt-4"
              disabled={deleteMemberMutation.isPending}
            >
              {deleteMemberMutation.isPending ? "Deleting..." : "Delete Member"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                member
                <span className="font-bold"> {member.name}</span> from your
                records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMemberMutation.mutate()}>
                Continue Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant="link"
          className="mt-4"
          onClick={() => navigate("/members")}
        >
          Back to Members List
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemberDetailPage;
