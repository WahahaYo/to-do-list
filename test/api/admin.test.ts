import { describe, it, expect } from 'vitest'
import { GET, DELETE } from '@/app/api/admin/users/route'
import { GET as GetAdminTodos } from '@/app/api/admin/todos/route'
import { GET as ShowUsers } from '@/app/api/admin/showUsers/route'
import { POST as CreateUser } from '@/app/api/admin/createUser/route'
import { POST as Signup, POST as Signin } from '@/app/api/auth/[...betterauth]/route'
import { createMockRequest, expectStatus, expectJson } from '@/test/utils'
import { NextRequest } from 'next/server'

async function createAdminAndGetSession(): Promise<string> {
  const adminEmail = `admin_test_${Date.now()}@example.com`
  
  const signupUrl = new URL('http://localhost/api/auth/signup')
  const signupRequest = new NextRequest(signupUrl, {
    method: 'POST',
    body: JSON.stringify({ email: adminEmail, password: 'password123' }),
    headers: { 'Content-Type': 'application/json' },
  })
  await Signup(signupRequest)

  const createAdminUrl = new URL('http://localhost/api/admin/createUser')
  const createAdminRequest = new NextRequest(createAdminUrl, {
    method: 'POST',
    body: JSON.stringify({ email: adminEmail, password: 'password123', role: 'admin' }),
    headers: { 'Content-Type': 'application/json' },
  })
  await CreateUser(createAdminRequest)

  const signinUrl = new URL('http://localhost/api/auth/signin')
  const signinRequest = new NextRequest(signinUrl, {
    method: 'POST',
    body: JSON.stringify({ email: adminEmail, password: 'password123' }),
    headers: { 'Content-Type': 'application/json' },
  })
  const signinResponse = await Signin(signinRequest)
  
  const cookieHeader = signinResponse.headers.get('set-cookie')
  if (!cookieHeader) throw new Error('No session cookie')
  
  const sessionId = cookieHeader.split('auth_session=')[1].split(';')[0]
  return sessionId
}

describe('GET /api/admin/users', () => {
  it('should return 401 when not logged in', async () => {
    const request = await createMockRequest('GET')
    const response = await GET(request)
    
    expectStatus(response, 401)
    await expectJson(response, { error: 'Unauthorized' })
  })

  it('should return 403 when user is not admin', async () => {
    const userEmail = `user_not_admin_${Date.now()}@example.com`
    
    const signupUrl = new URL('http://localhost/api/auth/signup')
    const signupRequest = new NextRequest(signupUrl, {
      method: 'POST',
      body: JSON.stringify({ email: userEmail, password: 'password123' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const signupResponse = await Signup(signupRequest)
    
    const cookieHeader = signupResponse.headers.get('set-cookie')
    const sessionId = cookieHeader?.split('auth_session=')[1].split(';')[0] || ''
    
    const request = await createMockRequest('GET', {}, { auth_session: sessionId })
    const response = await GET(request)
    
    expectStatus(response, 403)
    await expectJson(response, { error: 'Forbidden' })
  })

  it('should return users when admin is logged in', async () => {
    const sessionId = await createAdminAndGetSession()
    const request = await createMockRequest('GET', {}, { auth_session: sessionId })
    const response = await GET(request)
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(Array.isArray(json.data)).toBe(true)
  })
})

describe('DELETE /api/admin/users', () => {
  it('should return 401 when not logged in', async () => {
    const request = await createMockRequest('DELETE', { userId: 'some-id' })
    const response = await DELETE(request)
    
    expectStatus(response, 401)
    await expectJson(response, { error: 'Unauthorized' })
  })

  it('should return 400 when userId is missing', async () => {
    const sessionId = await createAdminAndGetSession()
    const request = await createMockRequest('DELETE', {}, { auth_session: sessionId })
    const response = await DELETE(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: '缺少 userId' })
  })

  it('should return 400 when trying to delete own account', async () => {
    const sessionId = await createAdminAndGetSession()
    
    const sessionRequest = new NextRequest('http://localhost/api/auth/session', {
      method: 'GET',
    })
    sessionRequest.cookies.set('auth_session', sessionId)
    const sessionResponse = await Signin(sessionRequest)
    const userData = await sessionResponse.json()
    
    const request = await createMockRequest('DELETE', { userId: userData.user.id }, { auth_session: sessionId })
    const response = await DELETE(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: '不能删除自己的账户' })
  })
})

describe('GET /api/admin/todos', () => {
  it('should return 401 when not logged in', async () => {
    const request = await createMockRequest('GET')
    const response = await GetAdminTodos(request)
    
    expectStatus(response, 401)
    await expectJson(response, { error: 'Unauthorized' })
  })

  it('should return 403 when user is not admin', async () => {
    const userEmail = `user_not_admin_todos_${Date.now()}@example.com`
    
    const signupUrl = new URL('http://localhost/api/auth/signup')
    const signupRequest = new NextRequest(signupUrl, {
      method: 'POST',
      body: JSON.stringify({ email: userEmail, password: 'password123' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const signupResponse = await Signup(signupRequest)
    
    const cookieHeader = signupResponse.headers.get('set-cookie')
    const sessionId = cookieHeader?.split('auth_session=')[1].split(';')[0] || ''
    
    const request = await createMockRequest('GET', {}, { auth_session: sessionId })
    const response = await GetAdminTodos(request)
    
    expectStatus(response, 403)
    await expectJson(response, { error: 'Forbidden' })
  })

  it('should return all todos when admin is logged in', async () => {
    const sessionId = await createAdminAndGetSession()
    const request = await createMockRequest('GET', {}, { auth_session: sessionId })
    const response = await GetAdminTodos(request)
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(Array.isArray(json.data)).toBe(true)
  })
})

describe('GET /api/admin/showUsers', () => {
  it('should return 401 when not logged in', async () => {
    const request = await createMockRequest('GET')
    const response = await ShowUsers(request)
    
    expectStatus(response, 401)
    await expectJson(response, { error: 'Unauthorized' })
  })

  it('should return users when admin is logged in', async () => {
    const sessionId = await createAdminAndGetSession()
    const request = await createMockRequest('GET', {}, { auth_session: sessionId })
    const response = await ShowUsers(request)
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(Array.isArray(json.data)).toBe(true)
  })
})

describe('POST /api/admin/createUser', () => {
  it('should return 400 when email is missing', async () => {
    const request = await createMockRequest('POST', { password: 'password123' })
    const response = await CreateUser(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: '缺少邮箱或密码' })
  })

  it('should return 400 when password is missing', async () => {
    const request = await createMockRequest('POST', { email: 'test@example.com' })
    const response = await CreateUser(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: '缺少邮箱或密码' })
  })

  it('should return 400 when user already exists', async () => {
    const email = `exists_${Date.now()}@example.com`
    
    await CreateUser(await createMockRequest('POST', { email, password: 'password123' }))
    
    const request = await createMockRequest('POST', { email, password: 'password456' })
    const response = await CreateUser(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: '用户已存在' })
  })

  it('should create admin user with valid data', async () => {
    const email = `new_admin_${Date.now()}@example.com`
    const request = await createMockRequest('POST', { email, password: 'password123', role: 'admin' })
    const response = await CreateUser(request)
    
    expectStatus(response, 201)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.user.email).toBe(email)
    expect(json.user.role).toBe('admin')
  })
})
