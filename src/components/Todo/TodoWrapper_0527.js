import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { Search } from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskModal } from '../Task/TaskModal';
import { EditTaskModal } from '../Task/EditTaskModal';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(true);

    const addTask = (newTask) => {
        // setTodos([...todos, newTask])
        setTodos((prevTodos) => [...prevTodos, newTask]);
    }

    useEffect(() => {
        if (isTaskModalOpen && isEditTaskModalOpen) {
            setIsEditTaskModalOpen(false);
        }
    }, [isTaskModalOpen]);

    useEffect(() => {
        if (isEditTaskModalOpen && isTaskModalOpen) {
            setIsTaskModalOpen(false);
        }
    }, [isEditTaskModalOpen]);


    const openTaskModal = () => {
        setIsTaskModalOpen(true);
        setIsEditTaskModalOpen(false);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
    };

    const openEditTaskModal = () => {
        setIsEditTaskModalOpen(true);
    };

    const closeEditTaskModal = () => {
        setIsEditTaskModalOpen(false);
    };

    // 할 일을 서버에서 가져오는 함수
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            const tasks = response.data;
            console.log(tasks)
            setTodos(tasks);
            filterTasks(tasks, selectedCategory, searchTerm);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            filterTasks(updatedTodos, selectedCategory, searchTerm);
            console.log('Task deleted:', id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const updatedTodo = todos.find(todo => todo.id === id);
            const updatedData = { isCompleted: !updatedTodo.isCompleted };
            await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );
            setTodos(updatedTodos);
            filterTasks(updatedTodos, selectedCategory, searchTerm);
            console.log("Task complete status updated:", id);
        } catch (error) {
            console.error('Error updating task complete status:', error);
        }
    };

    const editTodo = async (id, updatedTask) => {
        try {
            // const updatedTodo = todos.find(todo => todo.id === id);
            const updatedData = { task: updatedTask, isEditing: false };
            await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);
            // const updatedTodos = todos.map(todo =>
            //     todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            // );
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, task: updatedTask } : todo
            );
            setTodos(updatedTodos);
            filterTasks(updatedTodos, selectedCategory, searchTerm);
            console.log("Task is updated:", id);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const filterTasks = (tasks, category, searchTerm) => {
        let filtered = tasks;

        // 카테고리(완료/미완료) 항목 필터링
        if (category !== 'all') {
            if (category === 'completed') {
                filtered = filtered.filter((todo) => todo.isCompleted);
            } else if (category === 'incompleted') {
                filtered = filtered.filter((todo) => !todo.isCompleted);
            } else {
                filtered = filtered.filter((todo) => todo.category === category);
            } 
        }

        // 검색어 필터링
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((todo)=> todo.task.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // 완료 된 할 일 항목 아래로 정렬
        filtered = filtered.sort((a,b) => a.isCompleted - b.isCompleted);
        setFilteredTasks(filtered);
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActiveFilter(category === 'incompleted');
        filterTasks(todos, category, searchTerm);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterTasks(todos, selectedCategory, term);
    };

    // const handleActiveFilterClick = () => {
    //     setActiveFilter(true);
    //     filterTasks(incompleteTasks, selectedCategory, searchTerm, true)
    // };

    // const handleDoneFilterClick = () => {
    //     setActiveFilter(false);
    //     filterTasks(completeTasks, selectedCategory, searchTerm, false)
    // };

    const countCompletedTasks = (todos) => {
        const completedTasks = todos.filter(task => task.isCompleted === true);
        // console.log(completedTasks);
        return completedTasks.length;
    };
    
    const countIncompleteTasks = (todos) => {
        const incompleteTasks = todos.filter(task => task.isCompleted === false);
        // console.log(incompleteTasks);
        return incompleteTasks.length;
    };
    
    const completedCount = countCompletedTasks(todos);
    const incompleteCount = countIncompleteTasks(todos);
    
    console.log('Completed tasks:', completedCount);
    console.log('Incomplete tasks:', incompleteCount);
    

// addTodo={addTodo} 
    return (
        <>
        {/* <div className="filter-buttons">
            <button type="button" id="active-btn" className={`filter-button ${activeFilter ? 'active' : ''}`} onClick={handleActiveFilterClick}>Active</button>
            <button type="button" id="done-btn" className={`filter-button ${!activeFilter ? 'active' : ''}`} onClick={handleDoneFilterClick}>Done</button>                    
        </div>         */}
        <div className="TodoWrapper">
            <div id="titleContainer">
                <h3 className="title">To Do List</h3>
                <button type="button" className="todo-btn" onClick={openTaskModal}><FontAwesomeIcon icon={faPlus} size="2xl" style={{color: "#524444"}} /></button>

            </div>

            {/* <div id="taskCountBox">
                <p id="completdCount">{completedCount} tasks done</p>
                <p id="incompletedCount">{incompleteCount} tasks left</p>                
            </div>   */}
            <div id="filterContainer">
                <Search handleSearch={handleSearch} />
                {/* <TodoForm selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} setSearchTerm={setSearchTerm} className="category-filter"/>   */}
                <div class="select-wrapper"> 
                    <select id="completedFilter" className="completed-filter" value={selectedCategory} setSearchTerm={setSearchTerm} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="all">All</option> 
                        <option value="incompleted">Incompleted</option>
                        <option value="completed">Completed</option>
                    </select>
                    {/* <select id="categoryFilter" className="category-filter" value={selectedCategory}  setSearchTerm={setSearchTerm} onChange={(e) => handleCategoryChange(e.target.value)} >
                        <option value="all">All</option>
                        <option value="daily">Daily</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="home">Home</option>
                        <option value="health">Health</option>
                        <option value="fitness">Fitness</option>
                        <option value="priority">Priority</option>               
                    </select>         */}
                </div>    
            </div>
        
            <div id="todoContainer">
                {filteredTasks.map((task) => (
                    <Todo
                        task={task}
                        key={task.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        searchTerm={searchTerm}
                    />
                ))}

            <div id="taskCountBox">
                <p id="incompletedCount">{incompleteCount} tasks left</p>                
                <p id="completedCount">{completedCount} tasks completed</p>
            </div>   
            </div>
        </div>
        {isTaskModalOpen && <TaskModal addTask={addTask} closeModal={closeTaskModal} />}
        {isEditTaskModalOpen && <EditTaskModal addTask={addTask} closeModal={closeEditTaskModal} />}
        </>
    );
};
