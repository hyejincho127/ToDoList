import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const TodoForm = ({addTodo}) => {
    const [task, setTask] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/tasks',{ task });
            console.log('New task added:', response.data);
            addTodo(task);   
            setTask("")                 
        } catch (error) {
            console.log('Error adding task:', error);
        }
        // console.log(value)
    }

    // const handleAddTask = async () => {
    //     try {
    //         const response = await axios.post('/todo/1',{ task });
    //         console.log('New task added:', response.data);
    //     } catch (error) {
    //         console.log('Error adding task:', error);
    //     }
    //     // setTask("")
    // };
    
    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="task-input" value={task} placeholder="What is your task today?" required autoFocus maxLength="25" onChange={
                (e) => setTask(e.target.value)
                // console.log(e.target.value)
            } 
            />
        <button type="submit" className="todo-btn"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff"}} /></button>           
        </form>
    )
}