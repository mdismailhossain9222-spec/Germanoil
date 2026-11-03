import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * Product catalogue for the GermanOil showcase.
 * NOTE: This is a showcase-only site — there are no prices, stock levels,
 * carts or orders anywhere in the data model by design.
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  grade: varchar("grade", { length: 120 }).notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  imageAlt: varchar("image_alt", { length: 255 }).notNull(),
  specs: jsonb("specs").$type<{ label: string; value: string }[]>().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Non-commercial distribution / information enquiries. */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
