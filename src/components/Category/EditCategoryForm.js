import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const EditCategoryForm = ({editCategory, title}) => {
    const [value, setValue] = useState(title.title)
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(value)
        editCategory(value, title.id);
        
        setValue("")
    }
    return (
        <div>
            <form className="EditCategoryForm" onSubmit={handleSubmit}><input type="text" className="title-update-input" value={value} placeholder="Update Category" required autoFocus maxLength="13" style={{ background: 'none', border: 'none', width: '200px'}} onChange={
                (e) => setValue(e.target.value)
                // console.log(e.target.value)
            } 
            />
            <button type="submit" className="category-btn"><FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff"}} /></button>           
        </form>
        </div>
    )
}
