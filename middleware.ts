import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { users, sessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = pathname.startsWith('/admin')
  const isAdminApiPath = pathname.startsWith('/api/admin')

  if (!isAdminPath && !isAdminApiPath) {
    return NextResponse.next()
  }

  const sessionId = request.cookies.get('auth_session')?.value

  if (!sessionId) {
    if (isAdminApiPath) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  try {
    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId))

    if (!session[0] || session[0].expiresAt < new Date()) {
      if (isAdminApiPath) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const user = await db.select().from(users).where(eq(users.id, session[0].userId))

    if (!user[0] || user[0].role !== 'admin') {
      if (isAdminApiPath) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (error) {
    console.error('Middleware database error:', error)
    if (isAdminApiPath) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}