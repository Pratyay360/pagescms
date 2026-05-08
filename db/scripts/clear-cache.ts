import { db } from "../index.ts";
import { sql } from "drizzle-orm";
import process from "node:process";

console.log("Clearing cache tables...");

db.execute(
  sql`TRUNCATE TABLE cache_file, cache_permission, config, cache_file_meta`,
)
  .then(() => {
    console.log("✅ Cache tables cleared successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error clearing cache:", error);
    process.exit(1);
  });
