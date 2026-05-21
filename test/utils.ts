import { NextRequest, NextResponse } from 'next/server'

export async function createMockRequest(
  method: string = 'GET',
  body: object = {},
  cookies: Record<string, string> = {}
): Promise<NextRequest> {
  const url = new URL('http://localhost/api/test')
  const request = new NextRequest(url, {
    method,
    body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  for (const [key, value] of Object.entries(cookies)) {
    request.cookies.set(key, value)
  }
  
  return request
}

export async function createMockParams<T extends Record<string, string>>(params: T): Promise<{ params: T }> {
  return { params }
}

export function expectStatus(response: NextResponse, status: number) {
  expect(response.status).toBe(status)
}

export async function expectJson(response: NextResponse, expected: object) {
  const json = await response.json()
  expect(json).toMatchObject(expected)
}
