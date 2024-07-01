import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TaskModal } from '../Task/TaskModal'
import { EditTaskModal } from '../Task/EditTaskModal'
// export const TodoForm = ({addTodo}) => {
//     const [task, setTask] = useState("")
    
    // const addTask = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:3001/tasks',{ task });
    //         console.log('New task added:', response.data);
    //         addTodo(task);   
    //         setTask("")      

    //     } catch (error) {
    //         console.log('Error adding task:', error);
    //     }
    //     // console.log(value)
    // }
    
export const TodoForm = ({addTodo, selectedCategory, handleCategoryChange}) => {
    const [task, setTask] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(task) {
            addTodo(task);
        }
        setTask('');
    }

    // const openModal = () => {
    //     setIsModalOpen(true);
    //     // const modal = document.querySelector('.TaskModalContainer');
    //     // modal.classList.add('opened'); // 모달이 닫힐 때 '.closed' 클래스 추가
    //     // console.log("Modal is opened"); 
    // }

    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     // const modal = document.querySelector('.TaskModalContainer');
    //     // modal.classList.add('closed'); // 모달이 닫힐 때 '.closed' 클래스 추가
    //     // console.log("Modal is closed");
    // }

    // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // const openEditModal = () => {
    //     setIsEditModalOpen(true);
    // };

    // const closeEditModal = () => {
    //     setIsEditModalOpen(false);
    // };

    // const handleCategoryChange = (e) => {
    //     setSelectedCategory(e.target.value);
    //     filterTasks(e.target.value);
    // }

    return (
        <>
            
            {/* <form className="TodoForm" onSubmit={handleSubmit}> */}
                {/* <input type="text" className="task-input" value={task} placeholder="What is your task today?" required autoFocus maxLength="25" onChange={
                    (e) => setTask(e.target.value)
                    // console.log(e.target.value)
                } 
                /> */}
                
            {/* <button type="button" className="todo-btn"><FontAwesomeIcon icon={faPlus} size="2xl" style={{color: "#ffffff"}} onClick={openModal}/></button>           */}
            {/* <TaskModal isOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />  */}
            {/* </form> */}
            {/* <select id="categoryFilter" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incompleted">Incompleted</option>
                <option value="daily">Daily</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="home">Home</option>
                <option value="health">Health</option>
                <option value="fitness">Fitness</option>
                <option value="priority">Priority</option>
                <option value="important">Important</option>
            </select>     */}
        </>
    )
}