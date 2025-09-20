import { GraphQLScalarType, Kind } from "graphql";

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Function to format a date as YYYY-MM-DD
const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const DateOnly = new GraphQLScalarType({
  name: "DateOnly",
  description:
    "A DateOnly scalar that accepts a Date object or a string in YYYY-MM-DD format.",

  serialize(value: unknown): string {
    if (value instanceof Date) {
      return formatDate(value);
    }
    if (typeof value === "string") {
      if (DATE_ONLY_REGEX.test(value)) {
        return value;
      }
      // try to parse it
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return formatDate(d);
      }
    }
    throw new Error(
      "DateOnly scalar serializer expected a `Date` object or a string in YYYY-MM-DD format",
    );
  },

  parseValue(value: unknown): string {
    if (typeof value === "string" && DATE_ONLY_REGEX.test(value)) {
      return value;
    }
    throw new Error(
      "DateOnly scalar parser expected a string in YYYY-MM-DD format",
    );
  },

  parseLiteral(ast): string {
    if (ast.kind === Kind.STRING && DATE_ONLY_REGEX.test(ast.value)) {
      return ast.value;
    }
    throw new Error(
      "DateOnly scalar parser expected a string in YYYY-MM-DD format",
    );
  },
});
