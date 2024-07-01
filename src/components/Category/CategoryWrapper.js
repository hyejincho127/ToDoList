import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Category } from './Category'
import { CategoryForm } from './CategoryForm'
import { EditCategoryForm } from './EditCategoryForm'
import { useNavigate } from 'react-router-dom';

// uuidv4();

export const CategoryWrapper = () => {
        const [categories, setCategories] = useState([])

        const addCategory = (category) => {
                setCategories([...categories, {id: categories.length+1, title: category, isEditing: false}])

                if(categories.length > 7) {
                        setCategories([...categories])
                }
        }
        
        // uuidv4()
        const editCategory = id => {
                setCategories(categories.map(category => category.id  === id ? {...category, isEditing: !category.isEditing} : category))
        }
        const deleteCategory = id => {
                setCategories(categories.filter(category => category.id !== id))
        }
        const editTitle = (title, id) => {
                setCategories(categories.map(category => category.id === id ? {...category, title, isEditing: !category.isEditing} : category ))
        }


        return ( 
                <div className="CategoryWrapper">        
                        <h3 className="title">Categories</h3>     
                        <CategoryForm addCategory={addCategory} /> 
                        {categories.map((category, index) => (
                                category.isEditing ? (
                                        <EditCategoryForm editCategory={editTitle} title={category} />
                                ) : (
                                <Category title={category} key={category.id} deleteCategory={deleteCategory} editCategory={editCategory} />                   
                                )
                                
                        ))}                                            
                </div>
        )
} 