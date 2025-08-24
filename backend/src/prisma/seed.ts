import { $Enums } from "./generated/client.js";
import { auth } from "../auth.js";
import { db } from "../db.js";
import "dotenv/config";

async function main() {
  // --- Define SUPER_ADMIN Credentials ---
  // IMPORTANT: For production, these values MUST come from environment variables
  // for security. DO NOT hardcode sensitive information in production code.
  const superAdminEmail =
    process.env.SUPER_ADMIN_EMAIL || "superadmin@example.com";
  const superAdminPassword =
    process.env.SUPER_ADMIN_PASSWORD || "yourVeryStrongDefaultAdminPassword!"; // CHANGE THIS DEFAUULT!

  const superAdminUser = await db.user
    .findUnique({
      where: { email: superAdminEmail },
    })
    .catch(console.error);

  if (!superAdminUser) {
    console.log(`Creating SUPER_ADMIN user: ${superAdminEmail}`);

    const newAdmin = await auth.api.signUpEmail({
      body: {
        email: superAdminEmail,
        password: superAdminPassword,
        name: undefined as unknown as string,
        category: $Enums.UserCategory.STAFF,
        firstName: "SYSTEM",
        lastName: "ADMIN",
        isActive: true,
        isSuperUser: true,
      },
    });
    console.log(`SUPER_ADMIN user created with ID: ${newAdmin.user.id}`);
  }
}

// Execute the main seeding function
main()
  .catch((e) => {
    console.error("Auth seeding failed:", e);
  })
  .finally(async () => {
    await db.$disconnect(); // Ensure the Prisma client connection is closed
  });
