import { eq } from "drizzle-orm";
import { db, queryClient } from "./db/db";
import { groups, users, usersToGroups } from "./db/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "./env";

(async () => {
  const migrationClient = postgres(DATABASE_URL, { max: 1 });
  migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle",
  });
  const userInsert = await db
    .insert(users)
    .values({
      id: randomUUID(),
      name: "Test User",
      email: `test-${randomUUID()}@user.com`,
    })
    .returning({ userId: users.id });

  const groupInsert = await db
    .insert(groups)
    .values({
      id: randomUUID(),
      name: "Test",
    })
    .returning({ groupId: groups.id });

  if (userInsert.length && groupInsert.length) {
    await db.insert(usersToGroups).values({
      groupId: groupInsert[0].groupId,
      userId: userInsert[0].userId,
    });
  }

  console.log(
    await db.query.users.findFirst({
      where: eq(users.id, userInsert[0].userId),
      with: {
        posts: true,
        groups: {
          with: {
            group: true,
          },
        },
      },
    })
  );

  process.exit(0);
})();
