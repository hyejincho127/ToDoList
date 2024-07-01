// import logo from './logo.svg';
import React from 'react';
import './styles/App.css';
import { Today } from './components/Today';
import Search from './components/Search';
import User from './components/User/User';
import UserModal from './components/User/UserModal';
import { CategoryWrapper } from './components/Category/CategoryWrapper';
import { TodoWrapper } from './components/Todo/TodoWrapper';
import { TaskModal } from './components/TaskModal';
import { Category } from './components/Category/Category';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  return (
    <BrowserRouter>
      <div className="Container">
        <div className="Header">
          <Today />
          <Search />
          <User />
          <UserModal />
        </div>  
        <main>
          <section className="Category">
            <CategoryWrapper />
          </section>
          <section className="Todo">          
          <Routes>
            <Route path="/category/:categoryId" element={<TodoWrapper />} />
              {/* <TaskModal /> */}
          </Routes>
          </section>
        </main>
        <footer className="Footer">
          <Footer />
        </footer>
      </div>   
    </BrowserRouter>   
  );
}

export default App;
