import { useDialogStore } from "@/stores/dialog-store";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { execute } from "@/graphql/execute";
import { Skeleton } from "@/components/ui/skeleton";
import { graphql } from "@/graphql";

const GET_MEMBER_BY_ID_FOR_DETAILS_QUERY = graphql(`
  query GetMemberByIdForDetails($id: ID!) {
    memberById(id: $id) {
      id
      firstName
      lastName
      email
      isActive
      phoneNumber

      entitlements {
        id
        product {
          id
          name
        }
        validFrom
        expiresAt
        usesLeft
      }
    }
  }
`);

export default function MemberDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dialogStore = useDialogStore();
  const { data: member, isLoading: isLoadingMember } = useQuery({
    queryKey: ["members", id],
    queryFn: () => execute(GET_MEMBER_BY_ID_FOR_DETAILS_QUERY, { id: id! }),
    select: (data) => data.memberById,
    enabled: !!id,
  });

  if (isLoadingMember) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {member.firstName} {member.lastName}
        </h1>
        <p>{member.email}</p>
        <p>{member.phoneNumber}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Entitlements</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              dialogStore.openDialog({
                type: "grantEntitlement",
                memberId: member.id,
              })
            }
          >
            <IconPlus />
            <span className="hidden lg:inline">Grant Entitlement</span>
          </Button>
        </div>
        {isLoadingMember ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <div className="border rounded-md p-4">
            {member.entitlements?.map((entitlement) => (
              <div key={entitlement.id} className="flex justify-between">
                <span>{entitlement.product.name}</span>
                <span>{entitlement.usesLeft} uses left</span>
                <span>
                  Expires:{" "}
                  {new Date(entitlement.expiresAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {member.entitlements?.length === 0 && <p>No entitlements found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
