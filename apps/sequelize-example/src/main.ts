import { execSync } from "child_process";
import { sequelize } from "./db/db";
import { randomUUID } from "crypto";

(async () => {
  await sequelize.authenticate();

  execSync(`npx prisma migrate deploy`, {
    env: process.env,
    stdio: "inherit",
  });

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: `test-${randomUUID()}@user.com`,
      groups: {
        create: {
          name: "Test",
        },
      },
    },
    include: {
      groups: true,
    },
  });

  console.log(user);
})();
