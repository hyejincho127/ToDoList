import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(value)
        editTodo(value, task.id);
        
        setValue("")
    }
    return (
        <form className="EditTodoForm" onSubmit={handleSubmit}><input type="text" className="task-update-input" value={value} placeholder="Update Task" required autoFocus maxLength="25" style={{ background: 'none', border: 'none'}} onChange={
                (e) => setValue(e.target.value)
                // console.log(e.target.value)
            } 
            // 
            />
        <button type="submit" className="todo-btn"><FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff"}} /></button>           
        </form>
    )
}

