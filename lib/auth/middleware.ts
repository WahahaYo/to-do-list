import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  const sessionId = request.cookies.get("auth_session")?.value;

  if (!sessionId) {
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      id: 'dev-user-id',
      email: 'dev@example.com',
      role: 'admin',
    };
  }

  try {
    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));

    if (!session[0] || session[0].expiresAt < new Date()) {
      return null;
    }

    const user = await db.select().from(users).where(eq(users.id, session[0].userId));

    if (!user[0]) {
      return null;
    }

    return {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    };
  } catch (error) {
    console.error('getAuthenticatedUser database error:', error);
    return null;
  }
}

export async function requireAdmin(request: NextRequest): Promise<{ user: AuthenticatedUser; response: NextResponse | null }> {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return { user: null as any, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (process.env.NODE_ENV !== 'development' && user.role !== "admin") {
    return { user: null as any, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { user, response: null };
}

export async function requireAuth(request: NextRequest): Promise<{ user: AuthenticatedUser; response: NextResponse | null }> {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return { user: null as any, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { user, response: null };
}