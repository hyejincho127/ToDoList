import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddImage from '../AddImage';
import { Todo } from '../Todo/Todo'

export const EditTaskModal = ({isOpen, close, task}) => {
    const [editedTask, setEditedTask] = useState({
        id: task.id,
        task: task.task,
        category: task.category,
        note: task.note,
        image: task.image,
        dueDate: new Date(task.dueDate),
        url: task.url,      
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value});
    }

    const handleDateChange = (date) => {
        setEditedTask({ ...editedTask, dueDate: date});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:3001/tasks/${editedTask.id}`, editedTask);

            console.log('Task updated:', response.data);
            close();
        } catch (error) {
            console.error('Error updating task:', error);
            close(); 
        }
    }

    return (
            <div className={`EditTaskModalContainer ${isOpen ? 'opened' : 'closed'}`}>
            <button type="button" className="closeBtn" onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
            <h3>Edit Task</h3>
                <div className="EditTaskModalInnerContainer">
                    <p>Task Name</p>
                    <input className="taskInput" type="text" name="task" value={editedTask.task} placeholder="what is your task?" onChange={handleInputChange} required maxLength="25"></input>
                    <p>Category</p>
                    <select id="category-select" name="category" value={editedTask.category} onChange={handleInputChange} required>
                        <option value="">Select a Category</option>
                        <option value="daily">Daily</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="home">Home</option>
                        <option value="health">Health</option>
                        <option value="fitness">Fitness</option>
                        <option value="priority">Priority</option>
                        <option value="important">Important</option>
                    </select>
                    <p>Note</p>
                    <textarea className="task-note" name="note" placeholder="Add some extra notes here..." autoFocus value={editedTask.note} onChange={handleInputChange}></textarea>
                    {/* <AddImage handleImageChange={setImage} /> */}
                    {/* <div className="due-date">   */}
                        <p>Due Date</p>
                        <DatePicker selected={editedTask.dueDate} onChange={handleDateChange} showTimeSelect dateFormat="yyyy-MM-dd h:mm aa" timeFormat="HH:mm" timeIntervals={60}className="datePicker" /> 
                    {/* </div> */}
                    {/* <div className="url"> */}
                        <p>URL</p>                        
                        <input type="text" name="url" value={editedTask.url} className="task-url" onChange={handleInputChange} placeholder="URL" />
                        <a href={editedTask.url} target="_blank" rel="noopener noreferrer"></a>                        
                    {/* </div> */}
                    
                    <button type="button" className="edit-btn" onClick={handleSubmit}>Edit Task</button>
                    {/* {()=>console.log("Submit!")} */}
                </div>
            </div>
    )
}