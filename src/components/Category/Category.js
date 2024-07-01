import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan }  from '@fortawesome/free-solid-svg-icons'
export const Category = ({title, deleteCategory, editCategory}) => {
    // console.log(category.id)
    // console.log(title.id)
    return (
            <div className="Category">
                    {/* <div className="title-wrapper">  */}
                    {/* <FontAwesomeIcon icon={faCircle} className="circle-icon"/> */}

                    <li key={title.id}>
                        <Link to={`/category/${title.id}`}>{title.title}</Link>      
                    </li>
                    <div>
                        <button type="button">
                            <FontAwesomeIcon icon={faPen} onClick={() => editCategory(title.id)} />   
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteCategory(title.id)}/>
                        </button>  
                    </div>                  
            </div>
    )
}