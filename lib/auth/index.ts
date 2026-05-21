import { createAuth, type User, type Session } from "better-auth";
import { db } from "../db";
import { users, sessions } from "../db/schema";
import { eq, lt } from "drizzle-orm";
import bcrypt from "bcryptjs";

const drizzleAdapter = {
  async createUser(user: Omit<User, "id"> & { id?: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password || "", 10);
    const result = await db.insert(users).values({
      email: user.email,
      password: hashedPassword,
    }).returning();
    return { ...result[0], password: "" } as User;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (!result[0]) return null;
    return result[0] as User;
  },

  async getUserById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (!result[0]) return null;
    return result[0] as User;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const updateData: Record<string, unknown> = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    const result = await db.update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    if (!result[0]) return null;
    return { ...result[0], password: "" } as User;
  },

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  },

  async createSession(session: Omit<Session, "id"> & { id?: string }): Promise<Session> {
    const result = await db.insert(sessions).values({
      id: session.id!,
      userId: session.userId,
      expiresAt: new Date(session.expiresAt),
    }).returning();
    return result[0] as Session;
  },

  async getSessionById(id: string): Promise<Session | null> {
    const result = await db.select().from(sessions).where(eq(sessions.id, id));
    if (!result[0]) return null;
    return result[0] as Session;
  },

  async updateSession(id: string, data: Partial<Session>): Promise<Session | null> {
    const result = await db.update(sessions)
      .set(data as Record<string, unknown>)
      .where(eq(sessions.id, id))
      .returning();
    if (!result[0]) return null;
    return result[0] as Session;
  },

  async deleteSession(id: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, id));
  },

  async deleteExpiredSessions(): Promise<void> {
    await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
  },
};

export const auth = createAuth({
  database: drizzleAdapter,
  emailAndPassword: {
    enabled: true,
    verifyPassword: async (password: string, hash: string) => {
      return bcrypt.compare(password, hash);
    },
  },
  session: {
    maxAge: 3600,
  },
});

export type Auth = typeof auth;
