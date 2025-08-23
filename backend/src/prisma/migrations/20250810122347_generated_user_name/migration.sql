-- CreateEnum
CREATE TYPE "public"."user_categories" AS ENUM ('MEMBER', 'STAFF');

-- CreateEnum
CREATE TYPE "public"."user_at_gym_role_enums" AS ENUM ('MANAGER', 'TRAINER', 'ROUTE_SETTER', 'FRONT_DESK_STAFF', 'CLEANING_STAFF');

-- CreateEnum
CREATE TYPE "public"."AgreementType" AS ENUM ('WAIVER', 'TERMS_OF_SERVICE', 'PRIVACY_POLICY');

-- CreateEnum
CREATE TYPE "public"."AgreementStatus" AS ENUM ('PENDING_SIGNATURE', 'SIGNED', 'EXPIRED', 'REVOKED');

-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalName" TEXT,
    "contactEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenancyOwnerUserId" TEXT,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gyms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "tenancyId" TEXT NOT NULL,
    "legalEntityName" TEXT,
    "legalDocsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "category" "public"."user_categories" NOT NULL,
    "isSuperUser" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "walletAddress" TEXT,
    "phoneNumber" TEXT,
    "tenancyId" TEXT,
    "name" TEXT GENERATED ALWAYS AS (users."firstName" || ' ' || users."lastName") STORED,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_gym_associations" (
    "userId" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "roleAtGym" "public"."user_at_gym_role_enums" NOT NULL,
    "permissions" JSONB,
    "isActiveAtGym" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_gym_associations_pkey" PRIMARY KEY ("userId","gymId")
);

-- CreateTable
CREATE TABLE "public"."check_ins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenancyId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "tokenType" TEXT,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isCurrentlyRented" BOOLEAN NOT NULL DEFAULT false,
    "renterUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scheduleDateTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "gymId" TEXT NOT NULL,
    "instructorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "bookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_tenancy_agreements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenancyId" TEXT NOT NULL,
    "type" "public"."AgreementType" NOT NULL,
    "status" "public"."AgreementStatus" NOT NULL DEFAULT 'PENDING_SIGNATURE',
    "document_hash" TEXT,
    "document_version" TEXT,
    "signedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tenancy_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_contactEmail_key" ON "public"."tenants"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_tenancyOwnerUserId_key" ON "public"."tenants"("tenancyOwnerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "public"."users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_tokenId_key" ON "public"."memberships"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_transactionHash_key" ON "public"."memberships"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_userId_classId_key" ON "public"."bookings"("userId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_tokens_token_key" ON "public"."invitation_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_tokens_userId_key" ON "public"."invitation_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tenancy_agreements_userId_tenancyId_type_document_vers_key" ON "public"."user_tenancy_agreements"("userId", "tenancyId", "type", "document_version");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "public"."sessions"("token");

-- AddForeignKey
ALTER TABLE "public"."tenants" ADD CONSTRAINT "tenants_tenancyOwnerUserId_fkey" FOREIGN KEY ("tenancyOwnerUserId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gyms" ADD CONSTRAINT "gyms_tenancyId_fkey" FOREIGN KEY ("tenancyId") REFERENCES "public"."tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tenancyId_fkey" FOREIGN KEY ("tenancyId") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_gym_associations" ADD CONSTRAINT "user_gym_associations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_gym_associations" ADD CONSTRAINT "user_gym_associations_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "public"."gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "public"."gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_tenancyId_fkey" FOREIGN KEY ("tenancyId") REFERENCES "public"."tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_renterUserId_fkey" FOREIGN KEY ("renterUserId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "public"."gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_tokens" ADD CONSTRAINT "invitation_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_tenancy_agreements" ADD CONSTRAINT "user_tenancy_agreements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_tenancy_agreements" ADD CONSTRAINT "user_tenancy_agreements_tenancyId_fkey" FOREIGN KEY ("tenancyId") REFERENCES "public"."tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
