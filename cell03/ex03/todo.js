// Todo List Management with Cookie Persistence

// Get DOM elements
const ftList = document.getElementById('ft_list');
const todoCount = document.getElementById('todoCount');

// Load todos from cookie when page loads
window.addEventListener('load', function() {
    loadTodosFromCookie();
    updateTodoCount();
});

// Function to save todos to cookie
function saveTodosToCookie() {
    const todos = [];
    const todoItems = ftList.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
        todos.push(item.textContent.trim());
    });
    
    // Save as JSON string in cookie
    document.cookie = `todos=${JSON.stringify(todos)}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
}

// Function to load todos from cookie
function loadTodosFromCookie() {
    const cookies = document.cookie.split(';');
    let todos = [];
    
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'todos') {
            try {
                todos = JSON.parse(decodeURIComponent(value));
            } catch (e) {
                console.error('Error parsing todos from cookie:', e);
                todos = [];
            }
            break;
        }
    }
    
    // Clear existing todos
    ftList.innerHTML = '';
    
    // Add todos from cookie
    if (todos.length > 0) {
        todos.forEach(todoText => {
            addTodoItem(todoText);
        });
    } else {
        showEmptyMessage();
    }
}

// Function to show empty message
function showEmptyMessage() {
    ftList.innerHTML = '<div class="empty-message">No tasks yet. Click "New" to add your first task!</div>';
}

// Function to add a new todo
function addTodo() {
    const todoText = prompt('Enter your new task:');
    
    // Check if user entered something and it's not empty
    if (todoText !== null && todoText.trim() !== '') {
        addTodoItem(todoText.trim());
        saveTodosToCookie();
        updateTodoCount();
    }
}

// Function to add todo item to DOM
function addTodoItem(text) {
    // Remove empty message if it exists
    const emptyMessage = ftList.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Create new todo div
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = text;
    
    // Add click event to remove todo
    todoDiv.addEventListener('click', function() {
        removeTodo(todoDiv);
    });
    
    // Add to the top of the list
    ftList.insertBefore(todoDiv, ftList.firstChild);
}

// Function to remove a todo
function removeTodo(todoElement) {
    const todoText = todoElement.textContent.trim();
    const confirmed = confirm(`Are you sure you want to remove this task?\n\n"${todoText}"`);
    
    if (confirmed) {
        // Remove from DOM
        todoElement.remove();
        
        // Save to cookie
        saveTodosToCookie();
        updateTodoCount();
        
        // Show empty message if no todos left
        if (ftList.children.length === 0) {
            showEmptyMessage();
        }
    }
}

// Function to update todo counter
function updateTodoCount() {
    const todoItems = ftList.querySelectorAll('.todo-item');
    const count = todoItems.length;
    todoCount.textContent = count;
}

// Function to clear all todos (for testing purposes)
function clearAllTodos() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        ftList.innerHTML = '';
        showEmptyMessage();
        saveTodosToCookie();
        updateTodoCount();
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl + N to add new todo
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        addTodo();
    }
    
    // Escape to cancel any prompt
    if (event.key === 'Escape') {
        // This will close any open prompt
    }
});

// Console log for debugging
console.log('Todo List loaded successfully!');
console.log('Use Ctrl+N to quickly add a new task');
