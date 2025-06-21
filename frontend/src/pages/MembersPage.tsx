// frontend/src/pages/MembersPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMembers, type Member } from "../services/members.ts"; // Corrected import path
import { Button } from "../components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { toast } from "sonner";

const MembersPage: React.FC = () => {
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useQuery<Member[], Error>({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading members...</p>
      </div>
    );
  }

  if (isError) {
    toast.error("Error", {
      description: error?.message || "Failed to load members.",
    });
    return (
      <div className="flex justify-center items-center h-full text-red-600">
        <p>Error: {error?.message || "Failed to load members."}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Link to="/members/new">
          <Button>Add New Member</Button>
        </Link>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>All Gym Members</CardTitle>
          <CardDescription>
            Manage your gym members, view their status, and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Waiver Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {member.walletAddress.substring(0, 8)}...
                      {member.walletAddress.slice(-6)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.membershipStatus === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {member.membershipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.waiverStatus === "Signed"
                            ? "default"
                            : "outline"
                        }
                      >
                        {member.waiverStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/members/${member.id}`}>
                        <Button variant="ghost" size="sm">
                          View/Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No members found. Add one to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MembersPage;
