import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import { ListContext } from "../contexts/listContext";


import TaskList from "../components/TaskList";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";

import shortid from 'shortid';

function BoardDetails() {
    const [listTitle, setListTitle] = useState("");
    const [editMode, setEditMode] = useState(false);
    let { boardId } = useParams();
    const { lists, dispatchListAction } = useContext(ListContext);
  

    const submitHandler = (e) => {
        e.preventDefault();
        const list = {
            id: shortid.generate(),
            title: listTitle,
            boardId: boardId,
        }
        dispatchListAction({ type: 'CREATE_LIST', payload: list })
 
        setListTitle("");
        setEditMode(false);
    };

      const dragEndHandler = (result) => {
          const {destination, source, draggableId} = result;
          console.log(result);

          if(!destination) {
              return
          }

          if(destination.droppableId !== source.droppableId) {
              dispatchListAction({ type: 'REMOVE_TASK_ID_FROM_LIST', payload: {id: source.droppableId, taskId: draggableId}})
              dispatchListAction({ type: 'ADD_TASK_ID_TO_LIST', payload : {id: destination.droppableId, taskId: draggableId}})
          } else if (destination.droppableId === source.droppableId) {
            dispatchListAction({type: 'SORT_TASK_ID_IN_LIST', payload: {targetIndex: destination.index, sourceIndex: source.index, droppableId: source.droppableId}})
          }
      }

    return (

        <DragDropContext onDragEnd={dragEndHandler}>
            <div className="d-flex m-top-sm flex-direction-row">
                <Link to="/">Back to Boards</Link>

                {lists
                    ?.filter((item) => item.boardId === boardId)
                    ?.map((taskList) => (
                        <TaskList taskList={taskList} key={taskList.id} />
                    ))}
                {!editMode ? (
                    <AddItem listAddItem setEditMode={setEditMode} />
                ) : (
                    <AddItemForm
                        setEditMode={setEditMode}
                        listForm
                        submitHandler={submitHandler}
                        title={listTitle}
                        onChangeHandler={(e) => setListTitle(e.target.value)}
                    />
                )}
            </div>
        </DragDropContext>

    );
}

export default BoardDetails;
