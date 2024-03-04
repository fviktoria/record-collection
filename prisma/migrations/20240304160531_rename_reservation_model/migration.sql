/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Reservation";

-- CreateTable
CREATE TABLE "WishlistReservation" (
    "recordId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "WishlistReservation_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "WishlistReservation_recordId_key" ON "WishlistReservation"("recordId");
