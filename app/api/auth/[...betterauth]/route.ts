import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const path = new URL(request.url).pathname;
    const segments = path.split("/");
    const action = segments[segments.length - 1];

    if (action === "session") {
      const cookies = request.cookies.get("auth_session");
      if (!cookies) {
        return NextResponse.json({ user: null });
      }

      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          user: { id: 'dev-user-id', email: 'admin@qq.com', role: 'admin' }
        });
      }

      const sessionId = cookies.value;
      const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));

      if (!session[0] || session[0].expiresAt < new Date()) {
        return NextResponse.json({ user: null });
      }

      const user = await db.select().from(users).where(eq(users.id, session[0].userId));
      if (!user[0]) {
        return NextResponse.json({ user: null });
      }

      return NextResponse.json({
        user: { id: user[0].id, email: user[0].email, role: user[0].role }
      });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const path = new URL(request.url).pathname;
    const segments = path.split("/");
    const action = segments[segments.length - 1];

    switch (action) {
      case "signup": {
        const { email, password } = await request.json();

        const existingUser = await db.select().from(users).where(eq(users.email, email));
        if (existingUser[0]) {
          return NextResponse.json({ message: "邮箱已被注册" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.insert(users).values({
          email,
          password: hashedPassword,
        }).returning();

        const sessionId = uuidv4();
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await db.insert(sessions).values({
          id: sessionId,
          userId: result[0].id,
          expiresAt,
        });

        const response = NextResponse.json({
          user: { id: result[0].id, email: result[0].email, role: result[0].role }
        }, { status: 201 });
        response.cookies.set("auth_session", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600,
        });
        return response;
      }

      case "signin": {
        const { email, password } = await request.json();

        const user = await db.select().from(users).where(eq(users.email, email));
        if (!user[0]) {
          return NextResponse.json({ message: "邮箱或密码错误" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user[0].password);
        if (!isValid) {
          return NextResponse.json({ message: "邮箱或密码错误" }, { status: 401 });
        }

        const sessionId = uuidv4();
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await db.insert(sessions).values({
          id: sessionId,
          userId: user[0].id,
          expiresAt,
        });

        const response = NextResponse.json({
          user: { id: user[0].id, email: user[0].email, role: user[0].role }
        });
        response.cookies.set("auth_session", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600,
        });
        return response;
      }

      case "signout": {
        const cookies = request.cookies.get("auth_session");
        if (cookies) {
          await db.delete(sessions).where(eq(sessions.id, cookies.value));
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete("auth_session");
        return response;
      }

      default:
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
