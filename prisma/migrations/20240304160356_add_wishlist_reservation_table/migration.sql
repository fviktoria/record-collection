-- CreateTable
CREATE TABLE "Reservation" (
    "recordId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_recordId_key" ON "Reservation"("recordId");
