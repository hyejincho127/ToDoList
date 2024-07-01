import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Todo } from './Todo'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import { TaskModal } from '../TaskModal'

export const TodoWrapper = () => {
                const [todos, setTodos] = useState([]);
                
                const addTodo = async todo => {
                try {
                        const response = await axios.post('http://localhost:3001/tasks', {
                                task: todo,
                                completed: false,
                                isEditing: false
                        });

                        setTodos([...todos, response.data]);
                        // console.log(todos)
                        // {id: todos.length+1, task: todo, completed: false, isEditing: false}]
                        if(todos.length > 7) {
                                return;
                                // setTodos([...todos])
                        }
                        console.log('New task added:', response.data);
                } catch (error) {
                        console.error('Error adding task:', error);
                }
        }   

                const deleteTodo = async id => {
                        try {
                        // 서버에 DELETE 요청 보내어 해당 id의 Todo 삭제
                        await axios.delete(`http://localhost:3001/tasks/${id}`);
                
                        // 현재 Todo 목록에서 삭제된 항목을 제외하고 새로운 목록 생성
                        const updatedTodos = todos.filter(todo => todo.id !== id);
                        setTodos(updatedTodos);
                        
                        console.log('Task deleted:', id);
                        } catch (error) {
                        console.error('Error deleting task:', error);
                        }
                }

                const toggleComplete = async id => {
                        try {
                                const updatedTodo = todos.find(todo => todo.id === id);
                                const updatedData = { completed: !updatedTodo.completed };

                            // 서버에 PATCH 요청 보내어 해당 id의 Todo의 complete 상태 업데이트
                                await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);
                
                            // 현재 Todo 목록에서 해당 id의 Todo를 찾아서 complete 상태를 업데이트하고 새로운 목록 생성
                                const updatedTodos = todos.map(todo =>
                                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                                );
                                setTodos(updatedTodos);
                        
                                console.log("Task complete status updated:", id);
                        } catch (error) {
                                console.error('Error updating task complete status:', error);
                        }
                }

                useEffect(() => {
                        console.log(todos); // 상태 업데이트 이후에 todos 상태를 로깅
                }, [todos]); 
                
                // const toggleComplete = id => {
                //         setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
                //         console.log("Completed!")
                // }

                const editTodo = async (id, updatedTask) => {
                        try {
                                const updatedTodo = todos.find(todo => todo.id === id);

                                const updatedData = { task: updatedTask, isEditing: false };

                                await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);

                                const updatedTodos = todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo);
                                setTodos(updatedTodos);

                                console.log("Task is updated:", id);
                        } catch (error) {
                                console.error('Error updating task', error);
                        }
                }                

                const editTask = async (task, id) => {
                        try {
                                const updatedTodo = todos.find(todo => todo.id === id);

                                const updatedData = { task };

                                await axios.patch(`http://localhost:3001/tasks/${id}`, updatedData);

                                const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
                                );
                                setTodos(updatedTodos);

                                console.log("Task updated:", id);
                        } catch (error) {
                                console.error('Errod updating task:', error);
                        }
                }

                // 수정중인지 isEditing 상태 업데이트
                // const editTodo = id => {
                //         setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo)) 
                // }
                // const deleteTodo = id => {
                //         setTodos(todos.filter(todo => todo.id !== id))
                // }

                // Task 항목 수정 
                // const editTask = (task, id) => {
                //         setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
                // }
        return (
                <div className= "TodoWrapper">                 
                <h3 className="title">To Do List</h3>     
                        <TodoForm addTodo={addTodo} /> 
                        {todos.map((todo, index) => (
                                todo.isEditing ? (
                                        <EditTodoForm editTodo={editTask} task={todo} key={index}/>
                                ) : (
                                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>                          
                                )
                        ))}  
                </div>
        )
} 