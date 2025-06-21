// backend/scripts/dbinit.ts
import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts"; // For parsing command-line args
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { PrismaService } from "../src/shared/prisma.service.ts"; // Adjust path
import { CreateUserDto } from "../src/users/user.model.ts"; // Import User model

async function run() {
  const flags = parse(Deno.args, {
    string: ["email", "password", "role"],
    alias: { u: "email", p: "password", r: "role" },
    default: {
      role: "admin",
    },
  });

  const email = flags.email;
  const password = flags.password;
  const role = flags.role;

  if (!email || !password) {
    console.error(
      "Usage: deno task db:init -u <email> -p <password> [-r <role>]"
    );
    Deno.exit(1);
  }

  const prismaService = new PrismaService();
  await prismaService.onAppBootstrap(); // Manually initialize Prisma

  try {
    const passwordHash = bcrypt.hashSync(password); // Hash the provided password

    const newUser: CreateUserDto = {
      username: email, // Using email as username for consistency
      password: passwordHash,
      role: role as "admin" | "staff",
    };

    const createdUser = await prismaService.client.user.create({
      data: {
        username: newUser.username,
        passwordHash: newUser.password,
        role: newUser.role,
      },
    });

    console.log(
      `Successfully created user: ${createdUser.username} with role ${createdUser.role}`
    );
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      console.error(`Error: User with email '${email}' already exists.`);
    } else {
      console.error("Error creating user:", error);
    }
    Deno.exit(1);
  } finally {
    await prismaService.onAppClose(); // Manually close Prisma client
  }
}

// Ensure the script runs when executed directly
if (import.meta.main) {
  run();
}
