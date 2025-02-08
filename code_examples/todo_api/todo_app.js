const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Temporary in-memory data storage
let todos = [];
let idCounter = 1;






app.post("/todos", (req, res) => {
    const { title, description, completed } = req.body;
    const { pavadinimas, aprašymas, ivykdyta } = req.body;

    const todoTitle = title || pavadinimas;
    const todoDescription = description || aprašymas;
    const todoCompleted = completed || ivykdyta || false;

    if (!todoTitle) {
        return res.status(400).json({ error: "The title (or pavadinimas) is required" });
    }
    
    const newTodo = { id: idCounter++, title: todoTitle, description: todoDescription, completed: todoCompleted };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});







// Create a new ToDo (POST)
app.post("/todos", (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ error: "ToDo title is required" });
    }
    
    const newToDo = { id: idCounter++, title, completed };
    todos.push(newToDo);
    res.status(201).json(newToDo);
});

// Get all ToDos (GET)
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Get a specific ToDo by ID (GET)
app.get("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "ToDo not found" });
    }
    res.json(todo);
});

// Update a ToDo (PUT)
app.put("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "ToDo not found" });
    }

    const { title, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

// Delete a ToDo (DELETE)
app.delete("/todos/:id", (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "ToDo not found" });
    }

    const deletedToDo = todos.splice(index, 1);
    res.json({ message: "ToDo deleted", deletedToDo });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 