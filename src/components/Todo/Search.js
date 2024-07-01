import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const Search = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
        console.log(e.target.value)
    }
        return (
            <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#a8a8a8",}} className="search-icon" />                
                <input type="search" className="search-input" placeholder="Search..." value={searchTerm} onChange={handleChange}></input>
            </div>
        )
    }

// &#xf002;
