const todosModel = require("../models/todos");

async function getTodos(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const todos = await todosModel.findAll({
      limit: limit,
      offset: offset,
    });
    const totalTodos = await todosModel.count();
    res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
      pagination: {
        totalItems: totalTodos,
        totalPages: Math.ceil(totalTodos / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
}
async function getTodosById(req, res) {
  const todoId = req.params.id;
  try {
    const todo = await todosModel.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "todo not found",
        error: "Todo with the given ID does not exist",
      });
    }
    return res.status(200).json({
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "fetching todo by id failed",
      error: error.message,
    });
  }
}
async function createTodo(req, res) {
  const { title, description, due_date } = req.body;
  try {
    const todo = await todosModel.create({
      title,
      description,
      due_date,
    });
    return res.status(200).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating todo",
      error: error.message,
    });
  }
}
async function updateTodo(req, res) {
  const todoId = req.params.id;
  const { title, description, due_date, is_completed } = req.body;
  try {
    const todo = await todosModel.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        error: "Todo with the given ID does not exist",
      });
    }
    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.due_date = due_date ?? todo.due_date;
    todo.is_completed = is_completed ?? todo.is_completed;
    await todo.save();
    return res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating todo",
      error: error.message,
    });
  }
}
async function deleteTodo(req, res) {
  const todoId = req.params.id;
  try {
    const todo = await todosModel.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        error: "Todo with the given ID does not exist",
      });
    }
    await todo.destroy();
    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
}
async function fillterTodo(req, res) {
  const status = req.query.status;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const completedStatus =
      status === "true" ? 1 : status === "false" ? 0 : null;
    console.log(completedStatus);

    const todos = await todosModel.findAll({
      where: { is_completed: completedStatus },
      limit,
      offset,
    });
    const totalRecords = await todosModel.count({
      where: { is_completed: completedStatus },
    });

    return res.status(200).json({
      message: "Todos filtered successfully",
      data: todos,
      pagination: {
        totalItems: totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error filtering todos",
      error: error.message,
    });
  }
}

module.exports = {
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
  fillterTodo,
};
