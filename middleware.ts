import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

  // 在middleware中只做简单的cookie检查
  // 详细的权限验证（检查role是否为admin）留给具体的路由处理
  // 这样可以避免Edge Runtime中调用数据库的问题
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
