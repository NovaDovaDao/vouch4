import { UserCategory, UserAtGymRole } from "./generated/client.js";
import { auth } from "../auth.js";
import { db } from "../db.js";
import "dotenv/config";
import { faker } from "@faker-js/faker";

async function main() {
  // Clear existing data
  await db.entitlementUse.deleteMany({});
  await db.entitlement.deleteMany({});
  await db.product.deleteMany({});
  await db.invitationToken.deleteMany({});
  await db.booking.deleteMany({});
  await db.scheduledClass.deleteMany({});
  await db.classTemplate.deleteMany({});
  await db.userGymAssociation.deleteMany({});
  await db.gym.deleteMany({});
  await db.tenancy.deleteMany({});
  await db.account.deleteMany({});
  await db.user.deleteMany({});

  // --- Define SUPER_ADMIN Credentials ---
  const superAdminEmail =
    process.env.SUPER_ADMIN_EMAIL || "superadmin@example.com";
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "password";

  let superAdminUser = await db.user.create({
    data: {
      email: superAdminEmail,
      firstName: "SYSTEM",
      lastName: "ADMIN",
      isActive: true,
      isSuperUser: true,
      category: UserCategory.STAFF,
      emailVerified: true,
    },
  });
  const authContext = await auth.$context;
  const hashedPassword = await authContext.password.hash(superAdminPassword);
  await authContext.internalAdapter.createAccount({
    accountId: superAdminUser.email,
    password: hashedPassword,
    userId: superAdminUser.id,
    providerId: "credential",
  });

  console.log(`SUPER_ADMIN user created with ID: ${superAdminUser.id}`);

  // Create a tenancy
  const tenancy = await db.tenancy.create({
    data: {
      name: "MegaGym Holdings",
      contactEmail: "contact@megagym.com",
      tenancyOwnerUserId: superAdminUser.id,
    },
  });
  superAdminUser = await db.user.update({
    data: {
      tenancyId: tenancy.id,
    },
    where: {
      id: superAdminUser.id,
    },
  });

  console.log(`Tenancy created with ID: ${tenancy.id}`);

  // Create gyms
  const gyms = [];
  for (let i = 0; i < 3; i++) {
    const gym = await db.gym.create({
      data: {
        name: faker.company.name() + " Gym",
        address: {
          street1: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          country: "USA",
        },
        tenancyId: tenancy.id,
      },
    });
    gyms.push(gym);
    console.log(`Gym created with ID: ${gym.id}`);
  }

  // Create staff
  const staff = [];
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const isActive = Math.random() > 0.5;
    const user = await db.user.create({
      data: {
        email,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        category: UserCategory.STAFF,
        isActive: isActive,
        tenancyId: tenancy.id,
        emailVerified: isActive,
        phoneNumber:
          Math.random() > 0.5
            ? faker.phone.number({ style: "national" })
            : null,
      },
    });
    staff.push(user);
    console.log(`Staff created with ID: ${user.id}`);

    // Assign staff to a random gym
    await db.userGymAssociation.create({
      data: {
        userId: user.id,
        gymId: gyms[Math.floor(Math.random() * gyms.length)]!.id,
        roleAtGym: faker.helpers.arrayElement(Object.values(UserAtGymRole)),
      },
    });
  }

  // Create members
  const members = [];
  for (let i = 0; i < 50; i++) {
    const email = faker.internet.email();
    const isActive = Math.random() > 0.5;
    const user = await db.user.create({
      data: {
        email,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        category: UserCategory.MEMBER,
        isActive: isActive,
        tenancyId: tenancy.id,
        emailVerified: isActive,
        phoneNumber:
          Math.random() > 0.5
            ? faker.phone.number({ style: "national" })
            : null,
      },
    });
    members.push(user);
    console.log(`Member created with ID: ${user.id}`);
  }

  // Create class templates
  const classTemplates = [];
  for (let i = 0; i < 10; i++) {
    const instructor = staff[Math.floor(Math.random() * staff.length)]!;
    const gym = gyms[Math.floor(Math.random() * gyms.length)]!;
    const classTemplate = await db.classTemplate.create({
      data: {
        name: faker.lorem.words(3),
        metadata: {
          description: faker.lorem.sentence(),
          capacity: faker.number.int({ min: 5, max: 20 }),
        },
        gymId: gym.id,
        instructorId: instructor.id,
        recurrence: faker.system.cron({ includeYear: false }),
      },
    });
    classTemplates.push(classTemplate);
    console.log(`Class template created with ID: ${classTemplate.id}`);
  }

  // Create scheduled classes and bookings
  for (const classTemplate of classTemplates) {
    for (let i = 0; i < 5; i++) {
      const startTime = faker.date.future();
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
      const scheduledClass = await db.scheduledClass.create({
        data: {
          classTemplateId: classTemplate.id,
          startTime,
          endTime,
        },
      });
      console.log(`Scheduled class created with ID: ${scheduledClass.id}`);

      const numBookings = faker.number.int({ min: 0, max: 5 });
      for (let j = 0; j < numBookings; j++) {
        const member = members[Math.floor(Math.random() * members.length)]!;
        const existingBooking = await db.booking.findFirst({
          where: {
            scheduledClassId: scheduledClass.id,
            userId: member.id,
          },
        });
        if (!existingBooking) {
          await db.booking.create({
            data: {
              userId: member.id,
              scheduledClassId: scheduledClass.id,
            },
          });
          console.log(
            `Booking created for member ${member.id} in scheduled class ${scheduledClass.id}`,
          );
        }
      }
    }
  }

  // --- Create Products ---
  console.log("--- Creating Products ---");
  const monthlySubProduct = await db.product.create({
    data: {
      tenancyId: tenancy.id,
      name: "Gold Monthly Subscription",
      meta: {
        description: "Unlimited access for one month.",
      },
      rules: { type: "subscription", duration: "1_month" },
    },
  });

  const punchPassProduct = await db.product.create({
    data: {
      tenancyId: tenancy.id,
      name: "10-Visit Punch Pass",
      meta: {
        description: "10 visits with no expiration.",
      },
      rules: { type: "punch_card", uses: 10 },
    },
  });

  const dayPassProduct = await db.product.create({
    data: {
      tenancyId: tenancy.id,
      name: "Single Day Pass",
      meta: {
        description: "A single visit for one day.",
      },
      rules: { type: "single_use" },
    },
  });
  console.log(`Created 3 products.`);

  // --- Create Entitlements for members ---
  console.log("--- Creating Entitlements ---");
  const allProducts = [monthlySubProduct, punchPassProduct, dayPassProduct];
  for (const member of members) {
    // Give each member one random product entitlement
    const randomProduct =
      allProducts[Math.floor(Math.random() * allProducts.length)]!;

    const entitlementData: {
      productId: string;
      ownerId: string;
      validFrom: Date;
      expiresAt?: Date;
      usesLeft?: number;
    } = {
      productId: randomProduct.id,
      ownerId: member.id,
      validFrom: new Date(),
    };

    const rules = randomProduct.rules as {
      type: string;
      uses?: number;
      duration?: string;
    };

    if (rules.type === "subscription") {
      entitlementData.expiresAt = faker.date.future();
    } else if (rules.type === "punch_card") {
      entitlementData.usesLeft = rules.uses ?? 0;
    } else {
      // single_use
      entitlementData.usesLeft = 1;
    }

    await db.entitlement.create({ data: entitlementData });
    console.log(
      `Created entitlement '${randomProduct.name}' for member ${member.id}`,
    );
  }

  // --- Create a Rental Scenario ---
  const ownerMember = members[0]!;
  const renterMember = members[1]!;
  if (ownerMember && renterMember) {
    console.log(
      `--- Creating Rental Scenario: ${ownerMember.firstName} rents to ${renterMember.firstName} ---`,
    );
    await db.entitlement.create({
      data: {
        productId: dayPassProduct.id,
        ownerId: ownerMember.id,
        validFrom: new Date(),
        usesLeft: 1,
        renterId: renterMember.id,
      },
    });
    console.log("Rental created.");
  }
}

// Execute the main seeding function
main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.info("DONE SEEDING!");
    await db.$disconnect();
  });
