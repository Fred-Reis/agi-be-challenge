/*
  Warnings:

  - You are about to drop the column `validate` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[validation_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_validate_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "validate",
ADD COLUMN     "validation_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_validation_id_key" ON "users"("validation_id");
