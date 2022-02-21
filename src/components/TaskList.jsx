import React, { useState, useContext } from "react";
import shortid from "shortid";

import { Droppable } from "react-beautiful-dnd";



import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import TaskCard from "./TaskCard";
import { icons } from "../assets";

import { TaskContext } from "../contexts/taskContext";
import { ListContext } from "../contexts/listContext";
import { BoardContext } from "../contexts/boardContext";


function TaskList({ taskList }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  /**
   * {
   *    id,
   *     title,
   *    tasks: ["task-1", "task-2"],
   *     boardId
   * }
   */


  const { title } = taskList;
  const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
  const { dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext)

  const submitHandler = (e) => {
    e.preventDefault();
    const id = shortid.generate();
    const listId = taskList.id;
    const task = {
      id,
      title: taskTitle,
      listId,
      boardId: taskList.boardId,
    };
    dispatchTaskAction({ type: 'CREATE_TASK', payload: task })

    dispatchListAction({ type: 'ADD_TASK_ID_TO_LIST', payload: { id: listId, taskId: task.id } })

    dispatchBoardAction({ type: 'ADD_TASK_ID_TO_BOARD', payload: { id: task.boardId, taskId: task.id } })
    setTaskTitle("");
    setEditMode(false);
  };

  const removeListHandler = () => {
    dispatchListAction({ type: 'DELETE_LIST', payload: { id: taskList.id } });
    dispatchBoardAction({ type: 'REMOVE_LIST_ID_FROM_A_BOARD', payload: { id: taskList.boardId, listId: taskList.id } })
  }


  return (

    <Droppable droppableId = {taskList.id}>
      {(provided) => (
        <div ref = {provided.innerRef} {...provided.droppableProps} >
          <div className="list-container">
            <div className="list-title-container">
              <h5>{title}</h5>
              <img
                onClick={removeListHandler}
                className="add-item-icon"
                src={icons.crossIcon}
                alt=""
              />
            </div>
            {
              taskList
                ?.tasks?.map((item) => {
                  return allTasks.find(t => t.id === item)
                })?.map((task, index) => (
                  <TaskCard index={index} id={task.id} taskList={taskList} task={task} key={task.id} />
                ))
            }
            {editMode ? (
              <AddItemForm
                submitHandler={submitHandler}
                title={taskTitle}
                onChangeHandler={(e) => setTaskTitle(e.target.value)}
                setEditMode={setEditMode}
                editMode={editMode}
              />
            ) : (
              <AddItem setEditMode={setEditMode} />
            )}
          </div>
          {provided.placeholder}
        </div>
      )}

    </Droppable>


  );
}

export default TaskList;
