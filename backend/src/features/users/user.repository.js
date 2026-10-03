import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import userTable from "../../db/schema/user.schema.js";

export const findUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  return user ?? null;
};

export const createUser = async ({ fullName, email, password }) => {
  const [newUser] = await db
    .insert(userTable)
    .values({ fullName, email, password })
    .returning();

  return newUser;
};

export const findUserById = async (id) => {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, id));

  return user;
};
