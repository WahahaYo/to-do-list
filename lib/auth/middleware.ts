import { NextRequest, NextResponse } from "next/server";

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

  try {
    const httpUrl = new URL("/api/db", request.url);
    httpUrl.protocol = "http:";
    const response = await fetch(httpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getUserBySession", params: { sessionId } }),
    });

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('getAuthenticatedUser error:', error);
    return null;
  }
}

export async function requireAdmin(request: NextRequest): Promise<{ user: AuthenticatedUser; response: NextResponse | null }> {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return { user: null as any, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (user.role !== "admin") {
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
