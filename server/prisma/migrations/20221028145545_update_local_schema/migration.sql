/*
  Warnings:

  - You are about to drop the column `Services` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "googleID" TEXT DEFAULT 'null',
    "services" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("ID", "customToken", "email", "googleID", "password") SELECT "ID", "customToken", "email", "googleID", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
