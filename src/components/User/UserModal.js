import React from 'react';
import { Component } from 'react';
// import Modal from 'react-modal';
import User from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();        
    }

    state = {
            file: null,
            defaultImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            previewURL: '',
            name: ''
    };

    // fileInputRef = React.createRef();

    handleDefaultImageClick = () => {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();

        }
    }

    loginHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    };


    // imageSelectedHandler = (event) => {
    //     // console.log(event.target.files[0]);           
    //         // selectedFile: event.target.files[0]
    // }
        
    // saveTasks = async (username, tasks) => {
    //     const { name } 
    // };

    fileUploadHandler = (event) => {
        // event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0]; 

        // 파일이 이미지인지 확인
        if (file) {
            reader.onloadend = () => {
                this.setState({
                    file : file,
                    previewURL : reader.result
                });

                this.props.handleImageUpload(reader.result);
            }    
            reader.readAsDataURL(file);
        }
    };

        // if (file) {
        //     reader.onloadend = () => {
        //         this.setState({
        //             file : file,
        //             previewURL : reader.result
        //         })
        //     }    
        //     reader.readAsDataURL(file);            
        // } else {
        //     console.log("No file selected")
        // }


        // console.log(event.target.files[0]);           
        // selectedFile: event.target.files[0];
        // axios.post('');

    render() {
            const { isOpen, close } = this.props;
            const { defaultImage, previewURL } = this.state;
            // const profilePreview = this.state.previewURL !== '' ? <img className="profile_preview" src={this.state.previewURL} alt="Preview" /> : null;
            const profilePreview = previewURL ?
                <img className="profile_preview" src={previewURL} alt="Preview" /> :
                <img className="profile_preview" src={defaultImage} alt="Default" onClick={this.handleDefaultImageClick} ref={this.fileInputRef}  />;
                // console.log(this.handleDefaultImageClick)
            return (   
                <>
                    { 
                        isOpen == true
                        ?  
                        <div className="modalBackground">
                            <button type="button" className="close" onClick={close}>x</button>
                            <div className="modalContainer">
                                {/* {profilePreview} */}
                                <button onClick={this.handleDefaultImageClick} className="User">{previewURL ? <img className="profile_preview" src={previewURL} alt="Preview" /> : <img className="profile_preview" src={defaultImage} alt="Default" />}</button>
                                {/* {profile_preview}<FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} className="user-icon"/> */}
                                <input type="file" accept="image/jpg,image/png,image/jpeg" name="profile_img" onChange={this.fileUploadHandler} onClick={this.fileUploadHandler} className="profile" ref={this.fileInputRef} style={{ display: 'none'}} ></input> 
                                <p className="UserName">User<button type="button" className="edit-btn" onChange={this.loginHandler}><FontAwesomeIcon icon={faPen} /></button></p>
                                <div className="Btns">
                                    {/* <button type="button" className="change-btn" >Change Name</button> */}
                                    <button type="button" className="save-btn" onClick={this.saveName}>Save Name</button> 
                                    <button type="button" className="logout-btn">Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>    
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </>
            );
    }        
}

export default UserModal
// export const UserModal = () => {
//     return (
        // <div className="modalBackground">
        //     <div className="modalContainer">
        //         <button type="button" className="close-btn">x</button>
        //         <User className="User" />
        //         <p class="UserName">User<button type="button" className="edit-btn"><FontAwesomeIcon icon={faPen} /></button></p>
        //         <div className="Btns">
        //             <button type="button" className="change-btn" >Change Name</button>
        //             <button type="button" className="save-btn">Save Name</button> 
        //             <button type="button" className="logout-btn">Logout</button>    
        //         </div>

        //     </div>
        // </div>
//     )
// }