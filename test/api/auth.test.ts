import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { GET, POST } from '@/app/api/auth/[...betterauth]/route'
import { createMockRequest, expectStatus, expectJson } from '@/test/utils'
import { NextRequest } from 'next/server'

function createAuthRequest(method: string, action: string, body: object = {}, cookies: Record<string, string> = {}): NextRequest {
  const url = new URL(`http://localhost/api/auth/${action}`)
  const request = new NextRequest(url, {
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  for (const [key, value] of Object.entries(cookies)) {
    request.cookies.set(key, value)
  }
  
  return request
}

describe('GET /api/auth/session', () => {
  it('should return null user when no session cookie', async () => {
    const request = createAuthRequest('GET', 'session')
    const response = await GET(request)
    
    expectStatus(response, 200)
    await expectJson(response, { user: null })
  })

  it('should return null user for invalid session', async () => {
    const request = createAuthRequest('GET', 'session', {}, { auth_session: 'invalid-session-id' })
    const response = await GET(request)
    
    expectStatus(response, 200)
    await expectJson(response, { user: null })
  })
})

describe('POST /api/auth/signup', () => {
  it('should register new user with valid credentials', async () => {
    const email = `test_${Date.now()}@example.com`
    const request = createAuthRequest('POST', 'signup', { email, password: 'password123' })
    const response = await POST(request)
    
    expectStatus(response, 201)
    const json = await response.json()
    expect(json.user.email).toBe(email)
    expect(json.user.id).toBeDefined()
  })

  it('should return 400 when email already registered', async () => {
    const request = createAuthRequest('POST', 'signup', { email: 'test@example.com', password: 'password123' })
    await POST(request)
    
    const request2 = createAuthRequest('POST', 'signup', { email: 'test@example.com', password: 'password456' })
    const response = await POST(request2)
    
    expectStatus(response, 400)
    await expectJson(response, { message: '邮箱已被注册' })
  })

  it('should return 500 when password is missing (implicit test)', async () => {
    const email = `test_missing_pwd_${Date.now()}@example.com`
    const request = createAuthRequest('POST', 'signup', { email })
    const response = await POST(request)
    
    expect(response.status).toBe(500)
  })
})

describe('POST /api/auth/signin', () => {
  it('should login with valid credentials', async () => {
    const email = `login_test_${Date.now()}@example.com`
    
    await POST(createAuthRequest('POST', 'signup', { email, password: 'password123' }))
    
    const request = createAuthRequest('POST', 'signin', { email, password: 'password123' })
    const response = await POST(request)
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(json.user.email).toBe(email)
  })

  it('should return 401 when email does not exist', async () => {
    const request = createAuthRequest('POST', 'signin', { email: 'nonexistent@example.com', password: 'password123' })
    const response = await POST(request)
    
    expectStatus(response, 401)
    await expectJson(response, { message: '邮箱或密码错误' })
  })

  it('should return 401 when password is incorrect', async () => {
    const email = `wrong_pwd_test_${Date.now()}@example.com`
    
    await POST(createAuthRequest('POST', 'signup', { email, password: 'password123' }))
    
    const request = createAuthRequest('POST', 'signin', { email, password: 'wrongpassword' })
    const response = await POST(request)
    
    expectStatus(response, 401)
    await expectJson(response, { message: '邮箱或密码错误' })
  })
})

describe('POST /api/auth/signout', () => {
  it('should clear session cookie', async () => {
    const request = createAuthRequest('POST', 'signout', {}, { auth_session: 'some-session' })
    const response = await POST(request)
    
    expectStatus(response, 200)
    await expectJson(response, { success: true })
  })

  it('should handle signout without session cookie', async () => {
    const request = createAuthRequest('POST', 'signout')
    const response = await POST(request)
    
    expectStatus(response, 200)
    await expectJson(response, { success: true })
  })
})
