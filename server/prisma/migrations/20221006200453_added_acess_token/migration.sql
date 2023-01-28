/*
  Warnings:

  - You are about to drop the column `AuthToken` on the `Provider` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Provider" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    CONSTRAINT "Provider_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Provider" ("ID", "Name", "userID") SELECT "ID", "Name", "userID" FROM "Provider";
DROP TABLE "Provider";
ALTER TABLE "new_Provider" RENAME TO "Provider";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
