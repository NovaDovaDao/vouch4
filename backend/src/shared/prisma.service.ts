import { Injectable } from "jsr:@danet/core";
import { OnAppBootstrap, OnAppClose } from "@danet/core/hook";
import { prisma, PrismaClient } from "../../prisma/client.ts";

@Injectable()
export class PrismaService implements OnAppBootstrap, OnAppClose {
  public client!: PrismaClient;

  async onAppBootstrap() {
    try {
      this.client = prisma; // Initialize Prisma Client
      // You can add a connection test here if needed, but Prisma connects on first query
      console.log("Prisma client initialized.");
    } catch (error) {
      console.error("Failed to initialize Prisma client:", error);
      throw error;
    }
  }

  async onAppClose() {
    if (this.client) {
      await this.client.$disconnect(); // Disconnect Prisma Client
      console.log("Prisma client disconnected.");
    }
  }
}
