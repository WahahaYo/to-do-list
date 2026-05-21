import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { email, password, role = "admin" } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "缺少邮箱或密码" }, { status: 400 });
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email));
  
  if (existingUser[0]) {
    return NextResponse.json({ error: "用户已存在" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await db.insert(users).values({
    email,
    password: hashedPassword,
    role,
  }).returning();

  return NextResponse.json({
    success: true,
    user: {
      id: result[0].id,
      email: result[0].email,
      role: result[0].role,
    },
    message: "Admin 用户创建成功",
  }, { status: 201 });
}