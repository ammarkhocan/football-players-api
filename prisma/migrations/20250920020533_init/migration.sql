-- CreateTable
CREATE TABLE "public"."Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
