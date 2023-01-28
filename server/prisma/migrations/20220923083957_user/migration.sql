/*
  Warnings:

  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customToken" TEXT NOT NULL,
    "Email" TEXT NOT NULL
);
INSERT INTO "new_User" ("ID", "customToken") SELECT "ID", "customToken" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
