import { NextRequest, NextResponse } from "next/server";
import { db, initDb } from "@/lib/db";
import { sessions, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    await initDb();
    const cookies = request.cookies.get("auth_session");
    if (!cookies) {
      return null;
    }

    const sessionId = cookies.value;
    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));

    if (!session[0] || session[0].expiresAt < new Date()) {
      return null;
    }

    const user = await db.select().from(users).where(eq(users.id, session[0].userId));
    if (!user[0]) {
      return null;
    }

    return { id: user[0].id, email: user[0].email, role: user[0].role };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "未授权，请先登录" }, { status: 401 });
}