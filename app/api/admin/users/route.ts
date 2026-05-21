import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireAuth } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { users, todos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { user, response } = await requireAdmin(request);
  if (response) return response;

  const allUsers = await db.select({ id: users.id, email: users.email, role: users.role }).from(users);
  
  return NextResponse.json({ 
    success: true, 
    data: allUsers,
    message: `欢迎管理员 ${user.email}`
  });
}

export async function DELETE(request: NextRequest) {
  const { user, response } = await requireAdmin(request);
  if (response) return response;

  const { userId } = await request.json();
  
  if (!userId) {
    return NextResponse.json({ error: "缺少 userId" }, { status: 400 });
  }

  if (userId === user.id) {
    return NextResponse.json({ error: "不能删除自己的账户" }, { status: 400 });
  }

  await db.delete(users).where(eq(users.id, userId));
  
  return NextResponse.json({ success: true, message: "用户已删除" });
}