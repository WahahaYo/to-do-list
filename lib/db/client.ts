export async function dbRequest(action: string, params: Record<string, any> = {}) {
  const response = await fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, params }),
  });
  return response.json();
}

export async function getUserBySession(sessionId: string | undefined) {
  if (!sessionId) return null;
  const result = await dbRequest("getUserBySession", { sessionId });
  return result.success ? result.data : null;
}

export async function getAllUsers() {
  const result = await dbRequest("getAllUsers");
  return result.success ? result.data : [];
}

export async function createUser(email: string, password: string, role: string = "user") {
  const result = await dbRequest("createUser", { email, password, role });
  return result;
}

export async function deleteUser(userId: string) {
  const result = await dbRequest("deleteUser", { userId });
  return result.success;
}

export async function createSession(userId: string) {
  const result = await dbRequest("createSession", { userId });
  return result.success ? result.data : null;
}

export async function deleteSession(sessionId: string) {
  const result = await dbRequest("deleteSession", { sessionId });
  return result.success;
}

export async function getTodosByUser(userId: string) {
  const result = await dbRequest("getTodosByUser", { userId });
  return result.success ? result.data : [];
}

export async function createTodo(userId: string, title: string) {
  const result = await dbRequest("createTodo", { userId, title });
  return result.success ? result.data : null;
}

export async function updateTodo(id: number, title: string, completed: boolean) {
  const result = await dbRequest("updateTodo", { id, title, completed });
  return result.success ? result.data : null;
}

export async function deleteTodo(id: number) {
  const result = await dbRequest("deleteTodo", { id });
  return result.success;
}

export async function login(email: string, password: string) {
  const result = await dbRequest("login", { email, password });
  return result;
}

export async function register(email: string, password: string) {
  const result = await dbRequest("register", { email, password });
  return result;
}
