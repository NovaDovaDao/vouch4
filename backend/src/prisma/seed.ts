import { UserCategory, UserAtGymRole } from "./generated/client.js";
import { auth } from "../auth.js";
import { db } from "../db.js";
import "dotenv/config";
import { faker } from "@faker-js/faker";

async function main() {
  // Clear existing data
  await db.invitationToken.deleteMany({});
  await db.booking.deleteMany({});
  await db.class.deleteMany({});
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

  // Create classes
  for (let i = 0; i < 20; i++) {
    const instructor = staff[Math.floor(Math.random() * staff.length)]!;
    const gym = gyms[Math.floor(Math.random() * gyms.length)]!;
    const course = await db.class.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        scheduleDateTime: faker.date.future(),
        capacity: faker.number.int({ min: 5, max: 20 }),
        gymId: gym.id,
        instructorId: instructor.id,
      },
    });
    console.log(`Class created with ID: ${course.id}`);

    // Create bookings
    const numBookings = faker.number.int({ min: 0, max: 5 });
    for (let j = 0; j < numBookings; j++) {
      const member = members[Math.floor(Math.random() * members.length)]!;
      // check if member is already booked
      const existingBooking = await db.booking.findFirst({
        where: {
          classId: course.id,
          userId: member.id,
        },
      });
      if (!existingBooking) {
        await db.booking.create({
          data: {
            userId: member.id,
            classId: course.id,
          },
        });
        console.log(
          `Booking created for member ${member.id} in class ${course.id}`,
        );
      }
    }
  }

  // Create memberships
  const contractAddress = faker.finance.ethereumAddress();
  for (const member of members) {
    await db.membershipNFT.create({
      data: {
        userId: member.id,
        tenancyId: tenancy.id,
        tokenId: faker.string.uuid(),
        contractAddress,
        transactionHash: faker.string.uuid(),
        tokenType: faker.commerce.productName(),
        expiresAt: faker.date.future(),
      },
    });
    console.log(`Membership created for member ${member.id}`);
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
