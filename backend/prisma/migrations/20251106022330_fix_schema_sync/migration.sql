/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "dueDate",
ADD COLUMN     "clientCif" TEXT,
ADD COLUMN     "clientPhone" TEXT,
ADD COLUMN     "emitterAddress" TEXT,
ADD COLUMN     "emitterCif" TEXT,
ADD COLUMN     "emitterEmail" TEXT,
ADD COLUMN     "emitterLogo" TEXT,
ADD COLUMN     "emitterName" TEXT,
ADD COLUMN     "emitterPhone" TEXT;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;
