import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { user, response } = await requireAdmin(request);
  if (response) return response;

  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(users.createdAt);

  return NextResponse.json({
    success: true,
    data: allUsers,
    count: allUsers.length,
    message: `数据由管理员 ${user.email} 访问`,
  });
}