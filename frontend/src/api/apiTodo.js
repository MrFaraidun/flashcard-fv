
const API_URL = 'http://localhost:5000/flashcard';

export const createTask = async (userid, task) => {
    try {
        const requestBody = {
            task: task,
            userid: userid,
        };


        const response = await fetch(`${API_URL}/createTodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Parse the error response
            console.error("Backend error:", errorResponse);
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
};



//get all todo for user using session storage
export const getTodos = async () => {
    try {
        const response = await fetch(`${API_URL}/getAllTodos`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies/session data is sent
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Backend error:", errorResponse);
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting todos:", error);
        return null;
    }
};




//update todo
export const updateTodo = async (id, updates) => {  // Rename "task" to "updates" (more flexible)
    try {
        const response = await fetch(`${API_URL}/updateTodo`, {
            method: 'PUT',
            credentials: 'include', // Ensure session cookie is sent
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                ...updates, // Spread updates (handles both 'task' and 'completed')
            }),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            return updatedTask;
        } else {
            const errorResponse = await response.json();
            throw new Error(`Failed to update task: ${errorResponse.error}`);
        }
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};


export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/deleteTodo`, {
            method: 'DELETE',
            credentials: 'include', // Ensure the session cookie is sent
            headers: {
                'Content-Type': 'application/json', // Make sure the content is JSON
            },
            body: JSON.stringify({ id }), // Send the task id in the request body
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Backend error:", errorResponse);
            throw new Error(`Failed to delete task: ${errorResponse.error}`);
        }

        const deletedTask = await response.json();
        return deletedTask; // Return the deleted task (optional)
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};