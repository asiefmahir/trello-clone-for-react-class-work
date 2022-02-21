import {useState, useContext} from 'react'
import {BoardContext} from '../contexts/boardContext'
import shortid  from 'shortid';

function BoardCreatingForm() {
    const [boardTitle, setBoardTitle] = useState('');
    const {dispatchBoardAction} = useContext(BoardContext)

    const submitHandler = (e) => {
        e.preventDefault();
        if(boardTitle) {
            dispatchBoardAction({type: 'CREATE_BOARD', payload: {id: shortid.generate(), title: boardTitle}})
            setBoardTitle('')
        } else {
            alert(`Please Provide a Board Name`)
        }
    }
    return (
        <div className="align-center m-top-md">
            <form onSubmit = {(e) => submitHandler(e)}>
                <input type="text" name="boardTitle" value = {boardTitle} onChange = {(e) => setBoardTitle(e.target.value)} id="" />
                <button type="submit" onClick= {(e) => submitHandler(e)} > Create Boards </button>
            </form>
        </div>
    )
}

export default BoardCreatingForm
