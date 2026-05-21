import { describe, it, expect } from 'vitest'
import { PATCH, DELETE } from '@/app/api/todos/[id]/route'
import { createMockRequest, expectStatus, expectJson } from '@/test/utils'

describe('PATCH /api/todos/[id]', () => {
  it('should update todo completion status with valid data', async () => {
    const request = await createMockRequest('PATCH', { completed: true })
    const params = { id: '1' }
    
    const response = await PATCH(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 200)
    const json = await response.json()
    expect(json.completed).toBe(true)
  })

  it('should return 400 when completed is missing', async () => {
    const request = await createMockRequest('PATCH', {})
    const params = { id: '1' }
    
    const response = await PATCH(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 400)
    await expectJson(response, { error: 'Completed status is required' })
  })

  it('should return 400 when completed is not a boolean', async () => {
    const request = await createMockRequest('PATCH', { completed: 'true' })
    const params = { id: '1' }
    
    const response = await PATCH(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 400)
    await expectJson(response, { error: 'Completed status is required' })
  })

  it('should return 404 when todo does not exist', async () => {
    const request = await createMockRequest('PATCH', { completed: true })
    const params = { id: '99999' }
    
    const response = await PATCH(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 404)
    await expectJson(response, { error: 'Todo not found' })
  })
})

describe('DELETE /api/todos/[id]', () => {
  it('should delete existing todo', async () => {
    const request = await createMockRequest('DELETE')
    const params = { id: '1' }
    
    const response = await DELETE(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 200)
    await expectJson(response, { message: 'Todo deleted successfully' })
  })

  it('should return 404 when todo does not exist', async () => {
    const request = await createMockRequest('DELETE')
    const params = { id: '99999' }
    
    const response = await DELETE(request, { params: Promise.resolve(params) })
    
    expectStatus(response, 404)
    await expectJson(response, { error: 'Todo not found' })
  })
})
