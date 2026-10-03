import { eq } from "drizzle-orm";
import { db } from "../../db";
import { sessionTable } from "../../db/schema/session.schema.js";

export const createSession = async ({
  userId,
  refreshTokenHash,
  userAgent,
  ipAddress,
  expiresAt,
}) => {
  const [session] = await db
    .insert(sessionTable)
    .values({ userId, refreshTokenHash, userAgent, ipAddress, expiresAt })
    .returning();

  return session;
};

export const updateSession = async (id, data) => {
  const [session] = await db
    .update(sessionTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(sessionTable.id, id))
    .returning();

  return session;
};

export const findSessionById = async (id) => {
  const [session] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.id, id));

  return session;
};

export const revokeAllSession = async (userId) => {
  await db
    .update(sessionTable)
    .set({ isRevoked: true })
    .where(eq(sessionTable.userId, userId));
};
