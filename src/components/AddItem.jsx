import React from 'react'
import {icons} from '../assets'

function AddItem({listAddItem, setEditMode}) {
    return (
        <div onClick={() => setEditMode(true)} className = {listAddItem ? 'add-item list-add-item' : 'add-item task-add-item'}>
            <img src={icons.plusIcon} className = "add-item-icon" alt="" />
            <p className = "add-item-text"> {listAddItem ? 'Add another list' : 'Add a card' } </p>
        </div>
    )
}

export default AddItem
