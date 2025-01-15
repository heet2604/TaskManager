import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from "@mui/material";

const TaskForm = ({onSubmit,existingTask})=>{
    
    const [title,setTitle] = useState('');
    const [description , setDescription] = useState('');

    //if there is an existing task we use the title and description of it
    useEffect(()=>{
        if(existingTask){
            setTitle(existingTask.title)
            setDescription(existingTask.description);
        }
    },[existingTask])

    const handleSubmit=(e)=>{
        e.preventDefault();

        const newTask = {title,description};
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];   //retrives the existing tasks
        if(existingTask){
            const updatedTasks = tasks.map((tsk)=>
                tsk.id === existingTask.id ? {...tsk , ...newTask} : tsk
            );
            localStorage.setItem('tasks',JSON.stringify(updatedTasks))
        }
        else{
            const newTaskid = {...newTask,id: Date.now()}
            tasks.push(newTaskid);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        onSubmit(newTask);   //sends the new or updated task data to the parent component
        setTitle('')
        setDescription('')
    };

    return (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {existingTask ? "Update Task" : "Create Task"}
              </Button>
            </Grid>
          </Grid>
        </form>
      );
}

export default TaskForm;