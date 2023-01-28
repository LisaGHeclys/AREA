/*
  Warnings:

  - You are about to alter the column `actionID` on the `Area` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `reactionID` on the `Area` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Area" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "actionID" INTEGER NOT NULL,
    "reactionID" INTEGER NOT NULL,
    CONSTRAINT "Area_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Area" ("ID", "actionID", "name", "reactionID", "userID") SELECT "ID", "actionID", "name", "reactionID", "userID" FROM "Area";
DROP TABLE "Area";
ALTER TABLE "new_Area" RENAME TO "Area";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
