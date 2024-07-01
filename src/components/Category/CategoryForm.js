import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const CategoryForm = ({addCategory}) => {
    const [value, setValue] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(value) 
        addCategory(value);

        setValue("")        
        
    } 

    // }
    return (
        <form className="CategoryForm" onSubmit={handleSubmit}>
            <input type="text" className="category-input" value={value} placeholder="Create a New Category" required autoFocus maxLength="25"
onChange={
                (e) => setValue(e.target.value)
                // console.log(e.target.value)
                // 
            }/>
        <button type="submit" className="category-btn"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff"}} /></button>           
        </form>
    )
}