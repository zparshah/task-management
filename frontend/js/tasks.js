document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('User not logged in.');
        window.location.href = 'index.html'; // Redirect to login if no user_id
        return;
    }

     // Fetch projects for the dropdown
     const fetchProjects = async () => {
        try {
            const response = await fetch(`http://localhost:3300/api/users/${userId}/tasks/projects/names`);
            const data = await response.json();

            if (data.success) {
                const filterProject = document.getElementById('filterProject');
                data.projects.forEach(project => {
                    const option = document.createElement('option');
                    option.value = project;
                    option.textContent = project;
                    filterProject.appendChild(option);
                });
            } else {
                console.error('Failed to load projects:', data.message);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Fetch and display tasks with optional filter
    const fetchTasks = async (search = '', filterProject = '', filterPriority = '', filterDeadline = '') => {
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (filterProject) queryParams.append('project', filterProject);
            if (filterPriority) queryParams.append('priority', filterPriority);
            if (filterDeadline) queryParams.append('deadline', filterDeadline);

            const response = await fetch(`http://localhost:3300/api/users/${userId}/tasks?${queryParams.toString()}`);
            const data = await response.json();

            if (response.ok) {
                displayTasks(data.tasks); // Call function to display tasks
                fetchProjects();
            } else {
                alert(data.message || 'Failed to load tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Display tasks in a table
    const displayTasks = (tasks) => {
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = ''; // Clear existing tasks

        if (tasks.length === 0) {
            tasksList.innerHTML = '<tr><td colspan="6">No tasks found.</td></tr>';
            return;
        }

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('tr');

            // Convert Unix timestamp to human-readable date
            const unixTimestamp = task.deadline; // Assuming `task.timestamp` is the Unix timestamp in seconds
            const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
            const formattedDate = date.toISOString().slice(0, 10); // Format as YYYY-MM-DD

            taskElement.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.project}</td>
                <td>${task.priority}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="editBtn" data-id="${task.id}">Edit</button>
                    <button class="deleteBtn" data-id="${task.id}">Delete</button>
                </td>
            `;
            tasksList.appendChild(taskElement);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.editBtn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    };

    // Handle form submission for adding a new task
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const project = document.getElementById('taskProject').value;
            const priority = document.getElementById('taskPriority').value;
            const deadline = document.getElementById('taskDeadline').value;
    
            // Convert date to UNIX timestamp (in seconds)
            const deadlineTimestamp = new Date(deadline).getTime() / 1000; // Convert milliseconds to seconds
    
            try {
                const response = await fetch(`http://localhost:3300/api/users/${userId}/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description, project, priority, deadline: deadlineTimestamp }),
                });
    
                const result = await response.json();
                if (response.ok) {
                    // alert(result.message || 'Task added successfully!');
                    fetchTasks(); // Refresh task list
                    addTaskForm.reset(); // Clear form fields
                } else {
                    alert(result.message || 'Failed to add task');
                }
            } catch (error) {
                console.error('Error adding task:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
    

    // Handle Edit Task
    const handleEdit = async (event) => {
        const taskId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3300/api/users/${userId}/tasks/${taskId}`);
            const data = await response.json();
            
            if (response.ok) {
                // Populate the form with task data
                document.getElementById('editTaskTitle').value = data.task.title;
                document.getElementById('editTaskDescription').value = data.task.description;
                document.getElementById('editTaskProject').value = data.task.project;
                document.getElementById('editTaskPriority').value = data.task.priority;
                document.getElementById('editTaskDeadline').value = new Date(data.task.deadline * 1000).toISOString().slice(0, 10);

                // Show the modal
                document.getElementById('editTaskModal').style.display = 'block';
                
                // Handle form submission
                document.getElementById('editTaskForm').addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const updatedTask = {
                        title: document.getElementById('editTaskTitle').value,
                        description: document.getElementById('editTaskDescription').value,
                        project: document.getElementById('editTaskProject').value,
                        priority: document.getElementById('editTaskPriority').value,
                        deadline: new Date(document.getElementById('editTaskDeadline').value).getTime() / 1000
                    };

                    try {
                        const updateResponse = await fetch(`http://localhost:3300/api/users/${userId}/tasks/${taskId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedTask)
                        });

                        const updateData = await updateResponse.json();
                        if (updateResponse.ok) {
                            // alert(updateData.message || 'Task updated successfully');
                            fetchTasks(); // Refresh tasks list
                            document.getElementById('editTaskModal').style.display = 'none'; // Hide the modal
                        } else {
                            alert(updateData.message || 'Failed to update task');
                        }
                    } catch (error) {
                        console.error('Error updating task:', error);
                        alert('An error occurred. Please try again.');
                    }
                });
            } else {
                alert(data.message || 'Failed to fetch task');
            }
        } catch (error) {
            console.error('Error fetching task details:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleDelete = async (event) => {
        const taskId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3300/api/users/${userId}/tasks/${taskId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                // alert('Task deleted successfully');
                fetchTasks(); // Refresh tasks list
            } else {
                alert(data.message || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle closing the modal
    const closeModal = () => {
        document.getElementById('editTaskModal').style.display = 'none';
    };

    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Handle logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('user_id');
        window.location.href = 'index.html'; // Redirect to login page
    });

    // Search functionality
     document.getElementById('searchInput').addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        fetchTasks(searchTerm);
    });

    // Event listeners for filter options
    document.getElementById('filterProject').addEventListener('change', (event) => {
        const filterProject = event.target.value;
        const filterPriority = document.getElementById('filterPriority').value;
        const filterDeadline = document.getElementById('filterDeadline').value;
        fetchTasks('', filterProject, filterPriority, filterDeadline);
    });

    document.getElementById('filterPriority').addEventListener('change', (event) => {
        const filterPriority = event.target.value;
        const filterProject = document.getElementById('filterProject').value;
        const filterDeadline = document.getElementById('filterDeadline').value;
        fetchTasks('', filterProject, filterPriority, filterDeadline);
    });

    document.getElementById('filterDeadline').addEventListener('change', (event) => {
        const dateRange = event.target.value; // Expect format YYYY-MM-DD to YYYY-MM-DD
        const filterProject = document.getElementById('filterProject').value;
        const filterPriority = document.getElementById('filterPriority').value;
        fetchTasks('', filterProject, filterPriority, dateRange);
    });

    // Call fetchTasks to load tasks when the page loads
    fetchTasks();
});
