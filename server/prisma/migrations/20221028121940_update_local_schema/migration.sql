/*
  Warnings:

  - Added the required column `userID` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    CONSTRAINT "Service_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("ID", "name") SELECT "ID", "name" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
