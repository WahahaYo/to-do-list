import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, sessions, todos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { orderBy } from "drizzle-orm/expressions";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { action, params } = await request.json();

    switch (action) {
      // === 用户相关 ===
      case "getUserBySession": {
        const { sessionId } = params;
        const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));
        if (!session[0] || session[0].expiresAt < new Date()) {
          return NextResponse.json({ success: false, data: null });
        }
        const user = await db.select().from(users).where(eq(users.id, session[0].userId));
        return NextResponse.json({
          success: true,
          data: user[0] ? { id: user[0].id, email: user[0].email, role: user[0].role } : null
        });
      }

      case "getAllUsers": {
        const allUsers = await db
          .select({ id: users.id, email: users.email, role: users.role, createdAt: users.createdAt })
          .from(users)
          .orderBy(users.createdAt);
        return NextResponse.json({ success: true, data: allUsers });
      }

      case "createUser": {
        const { email, password, role = "user" } = params;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.insert(users).values({ email, password: hashedPassword, role }).returning();
        return NextResponse.json({ success: true, data: { id: result[0].id, email: result[0].email, role: result[0].role } });
      }

      case "deleteUser": {
        const { userId } = params;
        await db.delete(users).where(eq(users.id, userId));
        return NextResponse.json({ success: true });
      }

      // === 会话相关 ===
      case "createSession": {
        const { userId } = params;
        const sessionId = uuidv4();
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await db.insert(sessions).values({ id: sessionId, userId, expiresAt });
        return NextResponse.json({ success: true, data: { sessionId, expiresAt } });
      }

      case "deleteSession": {
        const { sessionId } = params;
        await db.delete(sessions).where(eq(sessions.id, sessionId));
        return NextResponse.json({ success: true });
      }

      // === Todo 相关 ===
      case "getTodosByUser": {
        const { userId } = params;
        const userTodos = await db
          .select({ id: todos.id, title: todos.title, completed: todos.completed, createdAt: todos.createdAt })
          .from(todos)
          .where(eq(todos.userId, userId))
          .orderBy(todos.createdAt);
        return NextResponse.json({ success: true, data: userTodos });
      }

      case "createTodo": {
        const { userId, title } = params;
        const result = await db.insert(todos).values({ userId, title }).returning();
        return NextResponse.json({ success: true, data: { id: result[0].id, title: result[0].title, completed: result[0].completed } });
      }

      case "updateTodo": {
        const { id, title, completed } = params;
        const result = await db.update(todos).set({ title, completed }).where(eq(todos.id, id)).returning();
        return NextResponse.json({ success: true, data: result[0] });
      }

      case "deleteTodo": {
        const { id } = params;
        await db.delete(todos).where(eq(todos.id, id));
        return NextResponse.json({ success: true });
      }

      // === 认证相关 ===
      case "login": {
        const { email, password } = params;
        const user = await db.select().from(users).where(eq(users.email, email));
        if (!user[0]) {
          return NextResponse.json({ success: false, message: "邮箱或密码错误" });
        }
        const isValid = await bcrypt.compare(password, user[0].password);
        if (!isValid) {
          return NextResponse.json({ success: false, message: "邮箱或密码错误" });
        }
        const sessionId = uuidv4();
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await db.insert(sessions).values({ id: sessionId, userId: user[0].id, expiresAt });
        return NextResponse.json({
          success: true,
          data: { user: { id: user[0].id, email: user[0].email, role: user[0].role }, sessionId }
        });
      }

      case "register": {
        const { email, password } = params;
        const existingUser = await db.select().from(users).where(eq(users.email, email));
        if (existingUser[0]) {
          return NextResponse.json({ success: false, message: "邮箱已被注册" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.insert(users).values({ email, password: hashedPassword }).returning();
        const sessionId = uuidv4();
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await db.insert(sessions).values({ id: sessionId, userId: result[0].id, expiresAt });
        return NextResponse.json({
          success: true,
          data: { user: { id: result[0].id, email: result[0].email, role: result[0].role }, sessionId }
        });
      }

      default:
        return NextResponse.json({ success: false, message: "未知操作" }, { status: 400 });
    }
  } catch (error) {
    console.error("Database proxy error:", error);
    return NextResponse.json({ success: false, message: "服务器错误" }, { status: 500 });
  }
}
