import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'

function createRequest(method: string, url: string, body: object = {}, cookies: Record<string, string> = {}): NextRequest {
  const req = new NextRequest(url, {
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  })
  for (const [key, value] of Object.entries(cookies)) {
    req.cookies.set(key, value)
  }
  return req
}

describe('API Test Suite', () => {
  describe('Auth API', () => {
    it('POST /api/auth/signup - should reject missing email', async () => {
      const request = createRequest('POST', 'http://localhost/api/auth/signup', { password: 'password123' })
      const { POST } = await import('@/app/api/auth/[...betterauth]/route')
      const response = await POST(request)
      expect([400, 500]).toContain(response.status)
    })

    it('POST /api/auth/signup - should reject missing password', async () => {
      const request = createRequest('POST', 'http://localhost/api/auth/signup', { email: 'test@example.com' })
      const { POST } = await import('@/app/api/auth/[...betterauth]/route')
      const response = await POST(request)
      expect([400, 500]).toContain(response.status)
    })

    it('POST /api/auth/signin - should reject missing credentials', async () => {
      const request = createRequest('POST', 'http://localhost/api/auth/signin', {})
      const { POST } = await import('@/app/api/auth/[...betterauth]/route')
      const response = await POST(request)
      expect([400, 401, 500]).toContain(response.status)
    })
  })

  describe('Todo API', () => {
    it('GET /api/todos - should return 401 when not authenticated', async () => {
      const request = createRequest('GET', 'http://localhost/api/todos')
      const { GET } = await import('@/app/api/todos/route')
      const response = await GET(request)
      expect(response.status).toBe(401)
    })

    it('POST /api/todos - should return 401 when not authenticated', async () => {
      const request = createRequest('POST', 'http://localhost/api/todos', { title: 'Test' })
      const { POST } = await import('@/app/api/todos/route')
      const response = await POST(request)
      expect(response.status).toBe(401)
    })

    it('POST /api/todos - should return 401 when session is invalid', async () => {
      const request = createRequest('POST', 'http://localhost/api/todos', {}, { auth_session: 'invalid-session' })
      const { POST } = await import('@/app/api/todos/route')
      const response = await POST(request)
      expect(response.status).toBe(401)
    })

    it('PATCH /api/todos/[id] - should return 401 when not authenticated', async () => {
      const request = createRequest('PATCH', 'http://localhost/api/todos/1', { completed: true })
      const { PATCH } = await import('@/app/api/todos/[id]/route')
      const response = await PATCH(request, { params: Promise.resolve({ id: '1' }) })
      expect(response.status).toBe(401)
    })

    it('PATCH /api/todos/[id] - should return 401 when session is invalid', async () => {
      const request = createRequest('PATCH', 'http://localhost/api/todos/1', {}, { auth_session: 'invalid-session' })
      const { PATCH } = await import('@/app/api/todos/[id]/route')
      const response = await PATCH(request, { params: Promise.resolve({ id: '1' }) })
      expect(response.status).toBe(401)
    })

    it('DELETE /api/todos/[id] - should return 401 when not authenticated', async () => {
      const request = createRequest('DELETE', 'http://localhost/api/todos/1')
      const { DELETE } = await import('@/app/api/todos/[id]/route')
      const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) })
      expect(response.status).toBe(401)
    })
  })

  describe('Admin API', () => {
    it('GET /api/admin/showUsers - should return 401 when not authenticated', async () => {
      const request = createRequest('GET', 'http://localhost/api/admin/showUsers')
      const { GET } = await import('@/app/api/admin/showUsers/route')
      const response = await GET(request)
      expect(response.status).toBe(401)
    })

    it('GET /api/admin/users - should return 401 when not authenticated', async () => {
      const request = createRequest('GET', 'http://localhost/api/admin/users')
      const { GET } = await import('@/app/api/admin/users/route')
      const response = await GET(request)
      expect(response.status).toBe(401)
    })

    it('POST /api/admin/createUser - should return 400 when email is missing', async () => {
      const request = createRequest('POST', 'http://localhost/api/admin/createUser', { password: 'password123' })
      const { POST } = await import('@/app/api/admin/createUser/route')
      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('POST /api/admin/createUser - should return 400 when password is missing', async () => {
      const request = createRequest('POST', 'http://localhost/api/admin/createUser', { email: 'test@example.com' })
      const { POST } = await import('@/app/api/admin/createUser/route')
      const response = await POST(request)
      expect(response.status).toBe(400)
    })
  })
})