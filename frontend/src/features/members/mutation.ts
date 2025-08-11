import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export const UPDATE_MEMBER = graphql(`
    mutation UpdateMember(input: UpdateMemberInput!) {
        updateMember(input) {
            id
        }
    }
    `);

execute(UPDATE_MEMBER, { input: {} }).then((data) => data);
