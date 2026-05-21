import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { GET, POST } from '@/app/api/todos/route'
import { createMockRequest, expectStatus, expectJson } from '@/test/utils'

describe('GET /api/todos', () => {
  it('should return all todos with 200 status', async () => {
    const request = await createMockRequest('GET')
    const response = await GET(request)
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(Array.isArray(json)).toBe(true)
  })
})

describe('POST /api/todos', () => {
  it('should create a new todo with valid title', async () => {
    const request = await createMockRequest('POST', { title: 'Test Todo' })
    const response = await POST(request)
    
    expectStatus(response, 201)
    const json = await response.json()
    expect(json.title).toBe('Test Todo')
    expect(json.completed).toBe(false)
  })

  it('should return 400 when title is missing', async () => {
    const request = await createMockRequest('POST', {})
    const response = await POST(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: 'Title is required' })
  })

  it('should return 400 when title is not a string', async () => {
    const request = await createMockRequest('POST', { title: 123 })
    const response = await POST(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: 'Title is required' })
  })

  it('should return 400 when title is empty string', async () => {
    const request = await createMockRequest('POST', { title: '' })
    const response = await POST(request)
    
    expectStatus(response, 400)
    await expectJson(response, { error: 'Title is required' })
  })
})
