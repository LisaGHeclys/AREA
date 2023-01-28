/*
  Warnings:

  - Added the required column `actionID` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactionID` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Area" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,
    "reactionID" TEXT NOT NULL,
    CONSTRAINT "Area_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Area" ("ID", "userID") SELECT "ID", "userID" FROM "Area";
DROP TABLE "Area";
ALTER TABLE "new_Area" RENAME TO "Area";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
