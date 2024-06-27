import { eq, relations, gt, sql } from "drizzle-orm";
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  groups: many(usersToGroups),
}));

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    authorId: uuid("author_id").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx")
        .using("btree", table.title)
        .where(gt(table.title, "a"))
        .with({}),
    };
  }
);

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const usersToGroups = pgTable("users_to_groups", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  groupId: uuid("group_id")
    .notNull()
    .references(() => groups.id),
});

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}));
