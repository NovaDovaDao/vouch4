import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";

export const search: NonNullable<QueryResolvers['search']> = async (
  _parent,
  { input },
  ctx: CustomContext,
) => {
  let { query, limit } = input;
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  if (!limit) {
    limit = 20;
  }

  // Perform all searches in parallel for efficiency
  const [members, staff, classTemplates, scheduledClasses, gyms] =
    await Promise.all([
      // 1. Search Members
      ctx.db.user.findMany({
        where: {
          category: "MEMBER",
          OR: [
            { firstName: { contains: trimmedQuery, mode: "insensitive" } },
            { lastName: { contains: trimmedQuery, mode: "insensitive" } },
            { email: { contains: trimmedQuery, mode: "insensitive" } },
          ],
        },
        take: limit,
      }),
      // 2. Search Staff
      ctx.db.user.findMany({
        where: {
          category: "STAFF",
          OR: [
            { firstName: { contains: trimmedQuery, mode: "insensitive" } },
            { lastName: { contains: trimmedQuery, mode: "insensitive" } },
            { email: { contains: trimmedQuery, mode: "insensitive" } },
          ],
        },
        take: limit,
      }),
      // 3. Search ClassTemplates
      ctx.db.classTemplate.findMany({
        where: {
          name: { contains: trimmedQuery, mode: "insensitive" },
        },
        take: limit,
      }),
      // 4. Search ScheduledClasses (by their template's name)
      ctx.db.scheduledClass.findMany({
        where: {
          classTemplate: {
            name: { contains: trimmedQuery, mode: "insensitive" },
          },
        },
        take: limit,
      }),
      // 5. Search Gyms
      ctx.db.gym.findMany({
        where: {
          name: { contains: trimmedQuery, mode: "insensitive" },
        },
        take: limit,
      }),
    ]);

  // Add __typename to each result so GraphQL knows which union type it is
  const memberResults = members.map((m) => ({
    ...m,
    __typename: "Member" as const,
  }));
  const staffResults = staff.map((s) => ({
    ...s,
    __typename: "Staff" as const,
  }));
  const classTemplateResults = classTemplates.map((ct) => ({
    ...ct,
    __typename: "ClassTemplate" as const,
  }));
  const scheduledClassResults = scheduledClasses.map((sc) => ({
    ...sc,
    __typename: "ScheduledClass" as const,
  }));
  const gymResults = gyms.map((g) => ({ ...g, __typename: "Gym" as const }));

  // Combine results respecting the weight order
  const allResults = [
    ...memberResults,
    ...staffResults,
    ...classTemplateResults,
    ...scheduledClassResults,
    ...gymResults,
  ];

  // Apply the limit to the final combined array
  return allResults.slice(0, limit);
};
