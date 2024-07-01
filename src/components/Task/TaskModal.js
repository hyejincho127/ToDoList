import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddImage from '../AddImage'

export const TaskModal = ({closeModal, addTask}) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());
    const [note, setNote] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    
    // const openModal = () => {
    //     setIsOpen(true);
    //     const modal = document.querySelector('.TaskModalContainer');
    //     modal.classList.add('opened'); // 모달이 닫힐 때 '.closed' 클래스 추가
    //     console.log("Modal is opened"); 
    // }

    // const closeModal = () => {
    //     setIsOpen(false);
    //     const modal = document.querySelector('.TaskModalContainer');
    //     modal.classList.add('closed'); // 모달이 닫힐 때 '.closed' 클래스 추가
    //     console.log("Modal is closed");
    // }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    // const [todos, setTodos] = useState([])
    // const addNote = note => {
    //     setNote([...note])
    //     console.log(note);
    // }
    // const [image, setImage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('task', task);
            formData.append('category', category);
            formData.append('note', note);
            formData.append('image', image);
            formData.append('dueDate', dueDate);
            formData.append('url', url); 
            formData.append('isCompleted', isCompleted); 
            // formData.append('isCompleted', isCompleted);
                // for (let [key, value] of formData.entries()) {
                //     console.log(key, value);
                // }
            
            const response = await axios.post('http://localhost:3001/tasks', {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
                task: task,
                category: category,
                note: note,  
                image: image,
                dueDate: dueDate,
                url: url,    
                isCompleted: false       
            })

            console.log('Task created:', response.data);
            addTask(response.data)
            closeModal();

            setTask('');
            setCategory('');
            setNote('');
            setImage(null);
            setDueDate(new Date());
            setUrl('');
            setIsCompleted(false)

        } catch (error) {
            console.error('Error creating task:', error);
            closeModal(); 
        }
    };
        // console.log(note);

        // addNote(note);

        // setNote("")

    const fileInputRef = React.createRef();     
    // const fileUploadHandler = (event) => {
    //     // event.preventDefault();
    //     const reader = new FileReader();
    //     const file = event.target.files[0]; 
    //     // // // 파일이 이미지인지 확인
    //     // // if (file) {
    //     // //     reader.onloadend = () => {
    //     // //         this.setState({
    //     // //             file : file,
    //     // //             previewURL : reader.result
    //     // //         });

    //     // //         this.props.handleImageUpload(reader.result);
    //     // //     }    
    //     //     reader.readAsDataURL(file);

        // const linkURL = () => {

        // }
        return (
            // <div className={`TaskModalContainer ${isOpen ? 'opened' : 'closed'}`}>
            <div className="TaskModalContainer">
                <button type="button" className="closeBtn" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
                <h3>Create a New Task</h3>
                <div className="TaskModalInnerContainer">
                    {/* <label for="category-select">Choose a category</label> */}
                    <p>Category</p>
                    <select id="category-select" name={category} value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="category">Select a Category</option>
                        <option value="daily">Daily</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="home">Home</option>
                        <option value="health">Health</option>
                        <option value="fitness">Fitness</option>                    
                    </select>
                    <p>Task Name</p>
                    <input className="taskInput" type="text" value={task} placeholder="What is your task?" onChange={(e) => setTask(e.target.value)} required maxLength="25"></input>                    
                    {/* <TodoForm onSubmit={handleSubmit} /> */}
                    <p>Note</p>
                    <textarea className="task-note" placeholder="Add some extra notes here..." autoFocus value={note} onChange={(e)=> setNote(e.target.value)}></textarea>
                    {/* console.log(e.target.value) */}
                    <AddImage handleImageChange={setImage} />
                    {/* <button type="button" className="add_img_btn"><FontAwesomeIcon icon={faImage} /></button> */}
                    {/* <input type="file" accept="image/jpg,image/png,image/jpeg" name="profile_img" onChange={this.fileUploadHandler} onClick={this.fileUploadHandler} className="profile" ref={this.fileInputRef} style={{ display: 'none'}} ></input>  */}      
                        <p>Due Date</p>
                        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} showTimeSelect dateFormat="yyyy-MM-dd h:mm aa" timeFormat="HH:mm" timeIntervals={60} className="datePicker" /> 
                        {/* <FontAwesomeIcon icon={faCalendar} className="calender-btn"/> */}

                        <p>URL</p>                        
                        <input type="text" value={url} className="task-url" onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
                        <a href={url}  target="_blank" rel="noopener noreferrer"></a>                        

                    <button type="button" className="create-btn" onClick={handleSubmit}>Create Task</button>
                    {/* {()=>console.log("Submit!")} */}
                </div>
            </div>
        )
    }