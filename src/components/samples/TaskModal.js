import React, { useState } from 'react'
import axios from 'axios' 
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import AddImage from './AddImage'
import { TodoForm } from './Todo/TodoForm'
// const addNote = (noteContent) => {
//     console.log(noteContent);
// };

export const TaskModal = () => {
    const [dueDate, setDueDate] = useState(new Date());   
    const [note, setNote] = useState("")
    // const [todos, setTodos] = useState([])
    // const addNote = note => {
    //     setNote([...note])
    //     console.log(note);
    // }
    // const [image, setImage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const formData = new FormData();
            // formData.append('image', image);
            // formData.append('dueDate', dueDate);
            // formData.append('note', note);

            const response = await axios.post('http://localhost:3001/tasks', {
                dueDate: dueDate,
                note: note                
            })

            // setDueDate([...dueDate, response.data]);
            // setNote([...note, response.data])
            console.log('Task created:', response.data);

            // setDueDate([
            //     // ...todos,
            //     {
            //         dueDate,
            //         note,
            //         ...response.data
            //     }
            // ]);            

            // console.log(formData)
            // handleAddTodo({
            //     dueDate,
            //     note,
            //     // image,
            //     ...response.data
            // });

            // handleClose();
        } catch (error) {
            console.error('Error creating task:', error);
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
            <div className="TaskModalContainer">
                <h3>Create a New Task</h3>
                {/* <TodoForm onSubmit={handleSubmit} /> */}
                <textarea className="task-note" placeholder="Add some extra notes here..." autoFocus value={note} onChange={(e)=> setNote(e.target.value)}></textarea>
                {/* console.log(e.target.value) */}
                {/* <AddImage onSelectedImage={setImage} /> */}
                {/* <button type="button" className="add_img_btn"><FontAwesomeIcon icon={faImage} /></button> */}
                {/* <input type="file" accept="image/jpg,image/png,image/jpeg" name="profile_img" onChange={this.fileUploadHandler} onClick={this.fileUploadHandler} className="profile" ref={this.fileInputRef} style={{ display: 'none'}} ></input>  */}
                <p>Add Due Date</p>
                <div className="due-date">       
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="datePicker" /> 
                    {/* <FontAwesomeIcon icon={faCalendar} className="calender-btn"/> */}
                </div>
                {/* <input type="input">url</input> */}
                <button type="submit" className="create-btn" onClick={handleSubmit}>Create Task</button>
                {/* {()=>console.log("Submit!")} */}
            </div>
        )
    }



// export default TaskModal