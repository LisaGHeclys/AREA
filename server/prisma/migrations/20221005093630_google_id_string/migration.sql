-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleID" TEXT
);
INSERT INTO "new_User" ("ID", "customToken", "email", "googleID") SELECT "ID", "customToken", "email", "googleID" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
