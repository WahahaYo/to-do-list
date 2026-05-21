import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { todos } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam)
    const { completed } = await request.json()

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Completed status is required' }, { status: 400 })
    }

    const [updatedTodo] = await db
      .update(todos)
      .set({
        completed,
        updatedAt: new Date()
      })
      .where(eq(todos.id, id))
      .returning()

    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam)

    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()

    if (!deletedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}