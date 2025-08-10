import { hash } from "jsr:@denorg/scrypt@4.4.4";
import { $Enums, PrismaClient } from "./generated/client.ts";

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

const prisma = new PrismaClient({
  datasourceUrl: Deno.env.get("DATABASE_URL"),
});

async function main() {
  // --- Define SUPER_ADMIN Credentials ---
  // IMPORTANT: For production, these values MUST come from environment variables
  // for security. DO NOT hardcode sensitive information in production code.
  const superAdminEmail =
    Deno.env.get("SUPER_ADMIN_EMAIL") || "superadmin@example.com";
  const superAdminPassword =
    Deno.env.get("SUPER_ADMIN_PASSWORD") ||
    "yourVeryStrongDefaultAdminPassword!"; // CHANGE THIS DEFAUULT!

  // --- Check if SUPER_ADMIN user already exists (for idempotency) ---
  let superAdminUser = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!superAdminUser) {
    console.log(`Creating SUPER_ADMIN user: ${superAdminEmail}`);
    const hashedPassword = hash(superAdminPassword); // Hash the password

    superAdminUser = await prisma.user.create({
      data: {
        email: superAdminEmail,
        passwordHash: hashedPassword,
        firstName: "System",
        lastName: "Admin",
        category: $Enums.UserCategory.STAFF, // SUPER_ADMIN is a type of staff
        isSuperUser: true, // This flag grants super admin privileges
        isActive: true,
        // SUPER_ADMINs do not belong to a specific tenancy or own one
        // as their role is global across the platform.
      },
    });
    console.log(`SUPER_ADMIN user created with ID: ${superAdminUser.id}`);
  } else {
    console.log(
      `SUPER_ADMIN user '${superAdminEmail}' already exists. Skipping creation.`
    );
    // In a development environment, you might optionally update the password
    // for convenience if it changes often (but NOT in production):
    if (!isDenoDeploy) {
      const hashedPassword = hash(superAdminPassword);
      await prisma.user.update({
        where: { id: superAdminUser.id },
        data: { passwordHash: hashedPassword },
      });
      console.log("SUPER_ADMIN password updated (DEV only).");
    }
  }

  // --- No need to create a Tenancy or TENANCY_OWNER here ---
  // The SUPER_ADMIN will log into the application and create the first Tenancy
  // and assign its TENANCY_OWNER user through the admin UI.
  // This approach simulates the actual onboarding flow for new tenants.
}

// Execute the main seeding function
main()
  .catch((e) => {
    console.error("Prisma seeding failed:", e);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect(); // Ensure the Prisma client connection is closed
  });
