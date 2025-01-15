import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');
        return;
    }

    const fetchTasks = async()=>{
        try{
            const response = await axios.get('http://localhost:3000/tasks',{
                headers : {Authorization : `Bearer ${token}`},
            });
            setTasks(response.data);
        }
        catch(err){
            console.log(err);
        }
    }
     fetchTasks();
  }, [navigate]);

  return (
    <Grid container spacing={2}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2" color={task.status === "completed" ? "green" : "red"}>
                  Status: {task.status}
                </Typography>
                <Button
                  onClick={() => onUpdateStatus(task.id)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                >
                  Delete Task
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">No tasks available</Typography>
      )}
    </Grid>
  );
};

export default TaskList;

