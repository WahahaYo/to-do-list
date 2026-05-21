"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const result = await response.json();
        
        if (!response.ok || !result.user) {
          router.push("/login");
          return;
        }
        
        setUser(result.user);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      if (response.ok) {
        const result = await response.json();
        setTodoList(result);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      const newTodo = await response.json();
      setTodoList([newTodo, ...todoList]);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (response.ok) {
      setTodoList(todoList.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setTodoList(todoList.filter(todo => todo.id !== id));
    }
  };

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
    });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Todo Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">欢迎, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              登出
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoList
          todos={todoList}
          onToggleTodo={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
