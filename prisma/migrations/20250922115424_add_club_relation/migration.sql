/*
  Warnings:

  - You are about to drop the column `club` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "club",
ADD COLUMN     "clubId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
