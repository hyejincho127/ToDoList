import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { Search } from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaCaretDown } from 'react-icons/fa'; 
import { TaskModal } from '../Task/TaskModal';
import { EditTaskModal } from '../Task/EditTaskModal';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCompletion, setSelectedCompletion] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

    // 중요한 할 일 별표 표시
    const toggleImportance = (id, isImportant) => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
        );
        setTodos(updatedTodos);
        filterTasks(updatedTodos, selectedCategory, selectedCompletion, searchTerm,  selectedCategory === isImportant);
    };

    // 중요한 할 일 isImportant로 서버에 업데이트
    const handleToggleImportance = async (id) => {
        try {
            const task = todos.find(todo => todo.id === id);
            if (!task) return;

            const updatedImportantStatus = !task.isImportant;
            await axios.patch(`http://localhost:3001/tasks/${id}`, { isImportant: updatedImportantStatus });
            toggleImportance(id, updatedImportantStatus);
        } catch (error) {
            console.error('Error toggling importance:', error);
        }
    };

    // 완료, 미완료 카테고리 드롭다운 옵션
    const completionOptions = [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed'},
        { value: 'incompleted', label: 'Incompleted'},
    ];

    const DropdownIndicator = (props) => {
        return ( 
            <components.DropdownIndicator {...props}>
                <FaCaretDown />
            </components.DropdownIndicator>
        );
    };

    // 할 일 추가 서버에 업데이트
    const addTask = async (newTask) => {
        try {
            const response = await axios.post('http://localhost:3001/tasks', newTask);
            const addedTask = response.data;
            setTodos((prevTodos) => [...prevTodos, addedTask]);
            filterTasks([...todos, addedTask], selectedCategory, selectedCompletion, searchTerm);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

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

    // 할 일 추가 모달 열기
    const openTaskModal = () => {
        setIsTaskModalOpen(true);
        setIsEditTaskModalOpen(false);
    };

    // 할 일 추가 모달 닫기
    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
    };

    // 할 일 수정 모달 열기
    const openEditTaskModal = () => {
        setIsEditTaskModalOpen(true);
    };

    // 할 일 수정 모달 닫기
    const closeEditTaskModal = () => {
        setIsEditTaskModalOpen(false);
    };

    // 할 일을 서버에서 가져오는 함수
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            const tasks = response.data;
            // console.log(tasks)
            setTodos(tasks);
            filterTasks(tasks, selectedCategory, selectedCompletion, searchTerm);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 할 일 삭제
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            filterTasks(updatedTodos, selectedCategory, selectedCompletion, searchTerm);
            console.log('Task deleted:', id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // 할 일 완료 토글 및 서버에 업데이트
    const toggleComplete = async (id) => {
        try {
            const updatedTodo = todos.find(todo => todo.id === id);
            const updatedData = { isCompleted: !updatedTodo.isCompleted };
            await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );
            setTodos(updatedTodos);
            filterTasks(updatedTodos, selectedCategory, selectedCompletion, searchTerm);
            console.log("Task complete status updated:", id);
        } catch (error) {
            console.error('Error updating task complete status:', error);
        }
    };

    // 할 일 수정
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
            filterTasks(updatedTodos, selectedCategory, selectedCompletion, searchTerm);
            console.log("Task is updated:", id);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    // 할 일 필터링 기능
    const filterTasks = (tasks, category, completion, searchTerm, isImportant = false) => {
        let filtered = tasks;

        // 카테고리 필터링
        if (category !== 'all' && category !== 'isImportant') {
            filtered = filtered.filter((todo) => todo.category === category);          
        }

        // 할 일 완료 상태 필터링
        if(completion !== 'all') {
                filtered = filtered.filter((todo) => completion === 'completed' ? todo.isCompleted : !todo.isCompleted);
        };

        // 중요한 할 일 필터링
        if (category === 'isImportant') {
            filtered = filtered.filter((todo) => todo.isImportant);
        }

        // 검색어 필터링
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((todo)=> todo.task.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // 완료 된 할 일 항목 아래로 정렬
        filtered = filtered.sort((a,b) => a.isCompleted - b.isCompleted);

        setFilteredTasks(filtered);
    }

    // 할 일 완료/미완료 셀렉트 박스 스타일 커스텀
    const selectCustomStyles = {
        // 셀렉트 박스 컨트롤 
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#FFF', // 셀렉트 박스 배경색
            border: '1px solid #191919',
            width: '12vw',
            fontSize: '0.9rem',
            textAlign: 'center',
            boxShadow: 'none',

            '&:focus': {
                border: '#191919' // 옵션 호버 배경색
            }
        }),
        // 드롭다운 메뉴 컨트롤
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#FFF', // 드롭다운 메뉴 배경색,
        }),
        // 드롭다운 옵션 항목 컨트롤
        option: (provided, state) => ({
            ...provided,
            color: '#757575', // 옵션 텍스트 색상
            padding: '0.7rem',
            height: '1rem',
            backgroundColor: state.isSelected ? '#f0f0f0' : '#FFF', // 선택된 옵션과 호버된 옵션의 배경색,
            '&:hover': {
                backgroundColor: '#f0f0f0' // 옵션 호버 배경색
            }
        }),
        // 드롭다운 화살표 아이콘 컨트롤
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'rgb(168, 168, 168)' // 드롭다운 아이콘 색상,
        })
    };

    const handleCategoryChange = (category) => {
        const taskCountBox = document.getElementById('taskCountBox')
        if(category === 'all') {
            taskCountBox.style.display = 'block';
        } else {
            taskCountBox.style.display = 'none'; 
        }
        setSelectedCategory(category);
        filterTasks(todos, category, selectedCompletion, searchTerm, category === 'isImportant');
    };

    const handleCompletionChange = (completion) => {
        setSelectedCompletion(completion);
        filterTasks(todos, selectedCategory, completion, searchTerm);
    };
    
    // 완료된 항목들 한 번에 삭제 (clear completed)
    const handleDeleteCompletedTasks = async () => {
        try {
            const completedTasks = todos.filter(todo => todo.isCompleted);

            // 만약 완료된 작업이 없다면 삭제 요청을 보내지 않습니다.
            if (completedTasks.length === 0) {
                console.log('No completed tasks to delete');
                return;
            }
    
            // 완료된 작업의 ID 목록을 추출합니다.
            const completedTaskIds = completedTasks.map(task => task.id);
            // 완료된 작업의 ID 목록을 서버에 보내 삭제 요청을 합니다.
            await Promise.all(completedTaskIds.map(async taskId => {
                await axios.delete(`http://localhost:3001/tasks/${taskId}`);
            }));
    
            // 삭제된 작업을 상태에서 제거합니다.
            const updatedTodos = todos.filter(todo => !completedTaskIds.includes(todo.id));
            setTodos(updatedTodos);
    
            // 상태를 업데이트한 후에 filterTasks()를 호출합니다.
            filterTasks(updatedTodos, selectedCategory, selectedCompletion, searchTerm);
    
            console.log('Completed tasks deleted');
        } catch (error) {
            console.error('Error deleting completed tasks:', error);
        }
    };
    

    // 검색 기능 
    const handleSearch = (term) => {
        setSearchTerm(term);
        filterTasks(todos, selectedCategory, selectedCompletion, term);
    };

    // 완료된 할 일 항목 숫자 카운트
    const countCompletedTasks = (todos) => {
        const completedTasks = todos.filter(task => task.isCompleted === true);
        // console.log(completedTasks);
        return completedTasks.length;
    };
    
    // 미완료 할 일 항목 숫자 카운드
    const countIncompleteTasks = (todos) => {
        const incompleteTasks = todos.filter(task => task.isCompleted === false);
        // console.log(incompleteTasks);
        return incompleteTasks.length;
    };
    
    const completedCount = countCompletedTasks(todos);
    const incompleteCount = countIncompleteTasks(todos);
    
    // console.log('Completed tasks:', completedCount);
    // console.log('Incomplete tasks:', incompleteCount);
    
    return (
        <div id="todoContainer">
            <div id="categoryContainer">
                <button type="button" className="category-filter" value="isImportant" onClick={()=>handleCategoryChange('isImportant')}>★</button>
                <button type="button" className="category-filter" value="all" onClick={()=>handleCategoryChange('all')}>All</button>
                <button type="button" className="category-filter" value="daily" onClick={(e)=>handleCategoryChange(e.target.value)}>Daily</button>
                <button type="button" className="category-filter" value="work" onClick={(e)=>handleCategoryChange(e.target.value)}>Work</button>
                <button type="button" className="category-filter" value="study" onClick={(e)=>handleCategoryChange(e.target.value)}>Study</button>
                <button type="button" className="category-filter" value="home" onClick={(e)=>handleCategoryChange(e.target.value)}>Home</button>
                <button type="button" className="category-filter" value="health" onClick={(e)=>handleCategoryChange(e.target.value)}>Health</button>
                <button type="button" className="category-filter" value="fitness" onClick={(e)=>handleCategoryChange(e.target.value)}>Fitness</button>
            </div>       
            
            <div className="TodoWrapper">
                <div id="titleContainer">
                    <h3 className="title">To Do List</h3>
                    <button type="button" className="todo-btn" onClick={openTaskModal}><FontAwesomeIcon icon={faPlus} size="2xl" style={{color: "#EDEDED"}} /></button>
                </div>
                <div id="filterContainer">
                    <Search handleSearch={handleSearch} />
                    <div className="select-wrapper"> 
                            <Select
                                id="completedFilter"
                                className="completed-filter"
                                options={completionOptions}
                                value={completionOptions.find(option => option.value === selectedCompletion)}
                                onChange={(selectedOption) => handleCompletionChange(selectedOption.value)}
                                placeholder={selectedCompletion}
                                components={{
                                    DropdownIndicator}} styles={selectCustomStyles}
                                    isSearchable={false}  
                            />
                            <div className="selected-value">{selectedCompletion}</div>
                    </div>    
                </div>
            
                <div id="todoContainer">
                    {filteredTasks.map((task) => (
                        <Todo
                            task={task}
                            key={task.id}
                            toggleComplete={toggleComplete}
                            toggleImportance={toggleImportance} 
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            searchTerm={searchTerm}
                            // handleToggleImportance={handleToggleImportance}
                        />
                    ))}

                <div id="taskCountBox">
                    <div id="incompletedCount"><span className="countNum">{incompleteCount}</span> tasks left</div>               
                    <div id="completedCount" onClick={handleDeleteCompletedTasks}>Clear completed</div>
                </div>   
                </div>
            </div>
            {isTaskModalOpen && <TaskModal addTask={addTask} closeModal={closeTaskModal} />}
            {isEditTaskModalOpen && <EditTaskModal addTask={addTask} closeModal={closeEditTaskModal} />}
        </div>
    );
};
