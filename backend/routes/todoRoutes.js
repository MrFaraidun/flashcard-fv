const express = require("express");
const router = express.Router();
const createTodo = require("../todo/createTodo");
const getAllTodos = require("../todo/getAllTodos");
const updateTodo = require("../todo/updateTodo");
const deleteTodo = require("../todo/deleteTodo");

router.post("/createTodo", createTodo); // Create a new todo
router.get("/getAllTodos", getAllTodos); // Get all todos for the logged-in user
router.put("/updateTodo", updateTodo); // Update a todo
router.delete("/deleteTodo", deleteTodo); // Delete a todo

module.exports = router;