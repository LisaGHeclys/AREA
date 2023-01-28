/*
  Warnings:

  - You are about to drop the column `userID` on the `Service` table. All the data in the column will be lost.
  - Added the required column `Services` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Service" ("ID", "name") SELECT "ID", "name" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE TABLE "new_User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "googleID" TEXT DEFAULT 'null',
    "Services" TEXT NOT NULL
);
INSERT INTO "new_User" ("ID", "customToken", "email", "googleID", "password") SELECT "ID", "customToken", "email", "googleID", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
