import {useContext} from 'react'
import { icons } from '../assets'

import {BoardContext} from '../contexts/boardContext'
import {ListContext} from '../contexts/listContext';
import {TaskContext} from '../contexts/taskContext'


function BoardItem({board}) {
    const {dispatchBoardAction} = useContext(BoardContext);
    const {lists, dispatchListAction} = useContext(ListContext);
    const {tasks, dispatchTaskAction} = useContext(TaskContext);



    const removeBoardHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const listsToBeDeleted = lists.filter(list => list.boardId === board.id);
        const tasksToBeDeleted = tasks.filter(task => task.boardId === board.id);
        dispatchBoardAction({type: 'DELETE_BOARD', payload: {id: board.id}});
        listsToBeDeleted.forEach((list) => {
            dispatchListAction({type: 'DELETE_LIST', payload: {id: list.id}})
        });
        tasksToBeDeleted.forEach((task) => {
            dispatchTaskAction({type: 'DELETE_TASK', payload: {id: task.id}})
        })
    }

    return (
        <div className="board-box d-flex flex-direction-column">
            <div className="d-flex justify-content-between">
                <h5 className="title-gap">{board.title}</h5>
                <img className="add-item-icon" onClick = {(e) => removeBoardHandler(e)} src= {icons.crossIcon} alt="Delete Board" />
            </div>
            <p className = "title-gap align-self-flex-end">This board has {board.lists.length} List</p>
        </div> 
    )
}

export default BoardItem