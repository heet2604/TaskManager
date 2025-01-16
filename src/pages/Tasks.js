import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/tasks/TaskForm';
import { Container, Grid, Typography, Card, CardContent, Button, Box, Avatar, Menu, MenuItem, TextField } from '@mui/material';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [menu, setmenu] = useState(null);  // Menu  (top right corner)
    const [user, setUser] = useState({});  // user details
    const navigate = useNavigate();

    // Check for token when the component loads and redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');  // Redirect to login if token doesn't exist
        }

        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);

        // Mock user data
        const mockUser = { name: "Random User" };  // Replace with real user data
        setUser(mockUser);
    }, [navigate]);

    // Adding a new task
    const addTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    // Edit task
    const editTask = (task) => {
        setEditingTask(task.id);
        setTaskTitle(task.title);
        setTaskDescription(task.description);
    };

    // Update task
    const updateTask = () => {
        const updatedTasks = tasks.map((tsk) =>
            tsk.id === editingTask ? { ...tsk, title: taskTitle, description: taskDescription } : tsk
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setTaskTitle('');
        setEditingTask(null);
        setTaskDescription('');
    };

    // Delete task
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((tsk) => tsk.id !== taskId);    //removes the task whose id matches with the tsk.id(currently iterated)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token from localStorage
        navigate('/login');  // Redirect to login page
        handleCloseMenu(); // Close the menu
    };

    // Handle menu open/close
    const handleMenuClick = (event) => {
        setmenu(event.currentTarget);  // Open the menu
    };

    const handleCloseMenu = () => {
        setmenu(null);  // Close the menu
    };

    return (
        <>
          <Box display="flex" justifyContent="flex-end" position="absolute" top={20} right={20}>
            <Avatar
              onClick={handleMenuClick}
              sx={{
                width: 50,
                height: 50,
                bgcolor: "primary.main",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              {user.name && user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={menu}
              open={Boolean(menu)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
    
          <Container maxWidth="lg" sx={{ mt: 1 }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                mb: 3,
              }}
            >
              Your Tasks
            </Typography>
    
            <Grid container spacing={2} justifyContent="center">
              {tasks.length === 0 ? (
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  sx={{ width: "100%" }}
                >
                  No tasks available. Add a new task.
                </Typography>
              ) : (
                tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Card
                      sx={{
                        background: "#1976D2",
                        color: "#fff",
                        borderRadius: 3,
                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          {task.title}
                        </Typography>
                        <Typography variant="body2">{task.description}</Typography>
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            color="inherit"
                            size="small"
                            sx={{
                              color: "#fff",
                              borderColor: "#fff",
                              "&:hover": {
                                backgroundColor: "rgba(0, 204, 0, 1)",
                              },
                            }}
                            onClick={() => editTask(task)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{
                              ml: 2,
                              color: "#fff",
                              borderColor: "#fff",
                              "&:hover": {
                                backgroundColor: "rgba(255, 0, 0, 1)",
                              },
                            }}
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
    
            <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
              <TaskForm onSubmit={addTask} />
            </Box>
    
            {editingTask && (
              <Box mt={2}>
                <Typography variant="h6" gutterBottom color="primary">
                  Edit Task
                </Typography>
                <TextField
                  label="Task Title"
                  variant="outlined"
                  fullWidth
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Task Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <Box>
                  <Button variant="contained" color="primary" onClick={updateTask}>
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={() => setEditingTask(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
        </>
      );
};

export default Tasks;
