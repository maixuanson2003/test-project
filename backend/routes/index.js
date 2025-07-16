const express = require("express");
const router = express.Router();

const todosController = require("../controllers/todos");

router.get("/todos", todosController.getTodos);
router.get("/todos/filter", todosController.fillterTodo);
router.post("/todos", todosController.createTodo);
router.get("/todos/:id", todosController.getTodosById);
router.put("/todos/:id", todosController.updateTodo);
router.delete("/todos/:id", todosController.deleteTodo);
// router.post('/todos')
// router.put('/todos/:id')
// router.delete('/todos/:id')

module.exports = router;
