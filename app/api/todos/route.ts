import { NextRequest, NextResponse } from 'next/server'
import { db, initDb } from '@/lib/db'
import { todos } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const runtime = "nodejs";

export async function GET() {
  try {
    await initDb()
    const allTodos = await db.select().from(todos).orderBy(desc(todos.createdAt))
    return NextResponse.json(allTodos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const [newTodo] = await db.insert(todos).values({
      title,
      completed: false,
    }).returning()

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}