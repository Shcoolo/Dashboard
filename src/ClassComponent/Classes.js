import React from 'react'
import {  IconButton } from "@mui/material";

import ClassIcon from '@mui/icons-material/Class';
import DeleteIcon from '@mui/icons-material/Delete';

export const Classes = ({task, deleteClass, editTodo, toggleComplete}) => {
  return (
    <div className="Classes">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <IconButton onClick={() => editTodo(task.id)}><ClassIcon/></IconButton>  
        <IconButton onClick={() => deleteClass(task.id)}><DeleteIcon/></IconButton> 
        </div>
    </div>
  )
}
