/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "transactions_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
