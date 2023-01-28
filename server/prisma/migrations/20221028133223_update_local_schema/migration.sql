/*
  Warnings:

  - You are about to alter the column `Services` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "googleID" TEXT DEFAULT 'null',
    "Services" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("ID", "Services", "customToken", "email", "googleID", "password") SELECT "ID", "Services", "customToken", "email", "googleID", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
