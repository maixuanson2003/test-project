import request from "./api";

export const fetchAllTodos = async (page = 1) => {
  const res = await request.get("/todos", {
    params: {
      page,
      limit: 5,
    },
  });
  return res.data;
};

export const fetchFilteredTodos = async (page = 1, status) => {
  const res = await request.get("/todos/filter", {
    params: {
      page,
      limit: 5,
      status,
    },
  });
  return res.data;
};

export const fetchTodoById = async (id) => {
  const res = await request.get(`/todos/${id}`);
  return res.data;
};

export const createTodo = async (data) => {
  const res = await request.post("/todos", data);
  return res.data;
};

export const updateTodo = async (id, data) => {
  const res = await request.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await request.delete(`/todos/${id}`);
  return res.data;
};
