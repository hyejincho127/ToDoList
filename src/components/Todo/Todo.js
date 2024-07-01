import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faLink, faStar } from '@fortawesome/free-solid-svg-icons';
import { EditTaskModal } from '../Task/EditTaskModal'
import { TaskModal } from '../Task/TaskModal'
import { TodoWrapper } from './TodoWrapper';

export const Todo = ({task, toggleComplete, deleteTodo, searchTerm, toggleImportance}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isTodoOpen, setIsTodoOpen] = useState(false);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };
    
    const handleEditIconClick = () => {
        openEditModal(); 
    };

    const handleToggleImportance = async (id) => {
        try {
            const updatedImportantStatus = !task.isImportant;
            await axios.patch(`http://localhost:3001/tasks/${task.id}`, { isImportant: updatedImportantStatus });
            toggleImportance(task.id, updatedImportantStatus); 
        } catch (error) {
            console.error('Error toggling importance:', error);
        }
    };    

    const highlightSearchTerm = (text, searchTerm) => {
        if (!searchTerm.trim()) {
            return text;
        }
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    }

    const toggleTodoOpen = () => {
        setIsTodoOpen(!isTodoOpen);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    
        const formattedDate = date.toLocaleDateString('ko-KR', optionsDate);
        const formattedTime = date.toLocaleTimeString('ko-KR', optionsTime);
    
        return `${formattedDate} ${formattedTime}`;
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="Todo">
                    <div className="inner-todo" onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} onClick={(e) => { e.stopPropagation(); toggleTodoOpen(); }}>
                        <div className="checkContainer" onClick={(e)=>{e.stopPropagation();}}>
                            <label className="checkbox-label">
                                <input id="checkbox" type="checkbox" onClick={(e) => { e.stopPropagation(); toggleComplete(task.id)}} className={`${task.isCompleted ? 'isCompleted' : ''}`} checked={task.isCompleted} />
                                <span class="checkmark"></span>                        
                            </label> 
                            <p id="taskName" className={`${task.isCompleted ? 'isCompleted' : ""}`} dangerouslySetInnerHTML={{ __html: highlightSearchTerm(task.task, searchTerm) }}  onClick={(e) => { e.stopPropagation(); toggleTodoOpen(); }} />                                           
                        </div>

                        {/* className={`${task.completed ? 'complete' : ''}`}  */}
                        {/* <p className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>  */}

                        <div className="button-container" >    
                            <button type="button" className={task.isImportant ? 'important' : ''} onClick={(e) => { e.stopPropagation(); handleToggleImportance(task.id); }}  style={{ display: isHovered || task.isImportant ? 'block' : 'none' }}>
                                <FontAwesomeIcon icon={faStar} />
                            </button>
                            <p className="todo-category"  style={{ display: isHovered ? 'none' : 'block' }}>{task.category}</p>                            
                            <button type="button" style={{ display: isHovered ? 'block' : 'none' }}>
                                <FontAwesomeIcon icon={faPen} onClick={(e) => {e.stopPropagation(); handleEditIconClick(); }} />
                            </button>
                            <button type="button" style={{ display: isHovered ? 'block' : 'none' }}>
                                <FontAwesomeIcon icon={faTrashCan} onClick={(e) => {e.stopPropagation(); deleteTodo(task.id)}} />
                            </button>   
                        </div>
                    </div>        
                    <div className={`detailContainer ${isTodoOpen ? 'open' : ''}`} style={{ maxHeight: isTodoOpen ? 'none' : '0' }}>
                        <p className="todo-img"></p>
                        <p className="todo-note">Note: {task.note}</p> 
                        <p className="todo-due">Due: {formatDate(task.dueDate)}</p>        
                        {task.url && (<Link to={task.url}><FontAwesomeIcon icon={faLink} className="link-icon" />{task.url}</Link>)}               
                    </div>
            </div>
            <EditTaskModal isOpen={isEditModalOpen} openModal={openEditModal} close={closeEditModal} task={task}/>            
        </>
    )
}