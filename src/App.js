// import logo from './logo.svg';
import React, { useState } from 'react';
import './styles/App.css';
import './styles/Responsive.css';
import { Today } from './components/Today';
import { Search } from './components/Todo/Search';
import User from './components/User/User';
import UserModal from './components/User/UserModal';
import { CategoryWrapper } from './components/Category/CategoryWrapper';
import { TodoWrapper } from './components/Todo/TodoWrapper';
import { TaskModal } from './components/Task/TaskModal';
import { Category } from './components/Category/Category';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const TaskContext = React.createContext();

function App() {
  // const [tasks, setTasks] = useState([]);

  // const addTask = (newTask) => {
  //   setTasks([...tasks, newTask]);
  // }

  return (
    <BrowserRouter>
      <div className="Container">
        <div className="Header">
          {/* <p className="back_phrase">Let's get things done!</p>           */}
          <Today />
          {/* <Search /> */}
          {/* <User />
          <UserModal /> */}
        </div>  
        <main>
        {/* <section className="Category">
  <Routes>
    <Route path="/" element={
      <CategoryWrapper setSelectedCategoryId={setSelectedCategoryId} />
    } />
    <Route path="/category/:categoryId" element={
      <CategoryWrapper setSelectedCategoryId={setSelectedCategoryId} />
    } />
  </Routes>
</section> */}
<section className="Todo">
  {/* <TaskContext.Provider value={{ tasks, addTask }}> */}
    <TodoWrapper />
    {/* tasks={tasks}  */}
    {/* <TaskModal onAddTask={addTask} /> */}
  {/* </TaskContext.Provider>   */}
  {/* <Routes>
    <Route path="/" element={
      <TodoWrapper />
    } />
    <Route path="/category/:categoryId" element={
      <TodoWrapper selectedCategoryId={selectedCategoryId} />
    } />
  </Routes> */}
</section>
        </main>
        <footer className="Footer">
          {/* <Footer /> */}
        </footer>
      </div>   
    </BrowserRouter>   
  );
}

export default App;
