import React from 'react'
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faImage } from '@fortawesome/free-solid-svg-icons'


class AddImage extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();        
    }
    
    state = {
            file: null,
            previewURL: '',
            name: ''
    };

    handleDefaultImageClick = () => {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();

        }
    }

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

                // 전달된 handleImageChange 함수 호출하여 부모 컴포넌트로 이미지 전달
                this.props.handleImageChange(reader.result);
            }    
            reader.readAsDataURL(file);
        }
    };

    render() {
            // const { isOpen, close } = this.props;
            const { previewURL } = this.state;
            const imgPreview = previewURL ?
                <img className="img_preview" src={previewURL} alt="Preview" /> : null;
                // <img className="profile_preview" src={defaultImage} alt="Default" onClick={this.handleDefaultImageClick} ref={this.fileInputRef}  />;
                // console.log(this.handleDefaultImageClick)
        return (
            <>
                <button onClick={this.handleDefaultImageClick} className="add_img_btn"><FontAwesomeIcon icon={faImage} /></button>{previewURL ? <img className="img_preview" src={previewURL} alt="Preview" /> : null}

                <input type="file" accept="image/jpg,image/png,image/jpeg" className="profile_img" onChange={this.fileUploadHandler} onClick={this.fileUploadHandler} ref={this.fileInputRef} style={{ display: 'none'}} ></input> 
            </>
        )
    }
}

export default AddImage