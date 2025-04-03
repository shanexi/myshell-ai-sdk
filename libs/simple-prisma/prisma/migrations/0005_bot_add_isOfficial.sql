-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "description" TEXT NOT NULL,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Bot" ("avatar", "createdAt", "description", "id", "name", "updatedAt") SELECT "avatar", "createdAt", "description", "id", "name", "updatedAt" FROM "Bot";
DROP TABLE "Bot";
ALTER TABLE "new_Bot" RENAME TO "Bot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
