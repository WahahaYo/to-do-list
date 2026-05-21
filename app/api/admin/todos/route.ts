import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { todos } from "@/lib/db/schema";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { user, response } = await requireAdmin(request);
  if (response) return response;

  const allTodos = await db.select().from(todos);
  
  return NextResponse.json({ 
    success: true, 
    data: allTodos,
    count: allTodos.length
  });
}