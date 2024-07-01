import React, { useState } from 'react'; 
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserModal from './UserModal'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            userName: "User",
            defaultImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            previewURL: ''
        };
    }
    
    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleImageUpload = (url) => {
        this.setState({ previewURL: url });
    }

    render() {   
        const { defaultImage, previewURL } = this.state;
        return (
            <>
                <button className="User" onClick={this.openModal}>
                    {/* <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} className="user-icon"/> */}
                    {previewURL ? <img className="profile_preview" src={previewURL} alt="Preview" /> : <img className="profile_preview" src={defaultImage} alt="Default" />}
                </button>
                <UserModal isOpen={this.state.isModalOpen} close={this.closeModal} handleImageUpload={this.handleImageUpload} />
            </>
        )
    }
}

export default User


// // export const User = () => {
    
// //     return(
//         <div>
//             <button className="User" onClick={() => {
//                 // console.log("click!")
//                 // setOpenUserModal(true);
//             }}>
//                 <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} className="user-icon"/>
//             </button>
// //             {/* <UserModal /> */}
// //         </div>

// //     )
// // }
