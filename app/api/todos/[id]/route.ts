import { NextRequest, NextResponse } from 'next/server'
import { db, initDb } from '@/lib/db'
import { todos } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser, unauthorizedResponse } from '@/lib/auth'

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return unauthorizedResponse()
    }

    await initDb()
    const { id: idParam } = await params;
    const id = parseInt(idParam)
    const { completed } = await request.json()

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Completed status is required' }, { status: 400 })
    }

    const existingTodo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))

    if (!existingTodo[0]) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    if (existingTodo[0].userId !== user.id) {
      return NextResponse.json({ error: '无权限操作此 Todo' }, { status: 403 })
    }

    const [updatedTodo] = await db
      .update(todos)
      .set({
        completed,
        updatedAt: new Date()
      })
      .where(eq(todos.id, id))
      .returning()

    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return unauthorizedResponse()
    }

    await initDb()
    const { id: idParam } = await params;
    const id = parseInt(idParam)

    const existingTodo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))

    if (!existingTodo[0]) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    if (existingTodo[0].userId !== user.id) {
      return NextResponse.json({ error: '无权限操作此 Todo' }, { status: 403 })
    }

    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()

    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}