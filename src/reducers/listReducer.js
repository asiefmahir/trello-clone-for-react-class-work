const listReducer = (lists = [], action) => { // action === {type: 'CREATE_BOARD, payload: {id: "randomid", title: "first board"}}
    switch (action.type) {
        case 'CREATE_LIST': {
            const list = {};
            list.id = action.payload.id;
            list.title = action.payload.title;
            list.tasks = [];

            // [ "id1", "id2"]
            list.boardId = action.payload.boardId;
            return [...lists, list]
        }
        case 'DELETE_LIST': {
            return lists.filter(list => list.id !== action.payload.id)
        }
        case 'UPDATE_LIST': {
            const list = lists.find(item => item.id === action.payload.id);
            list.title = action.payload.title || list.title;
            return [...lists]
        }
        case 'ADD_TASK_ID_TO_LIST': {
            console.log('I am from add id');
            const list = lists.find(item => item.id === action.payload.id);
            list.tasks.push(action.payload.taskId);
            return [...lists]
        }
        case 'CHANGE_BOARD_ID_OF_A_LIST': {
            const list = lists.find(item => item.id === action.payload.id);
            list.boardId = action.payload.boardId;
            return [...lists]

        }
        case 'REMOVE_TASK_ID_FROM_LIST': {
            console.log('I am from remove id');

            const list = lists.find(item => item.id === action.payload.id);
            list.tasks = list.tasks.filter(item => item !== action.payload.taskId);
            return [...lists]
        }

        case 'SORT_TASK_ID_IN_LIST': {
            const {
                targetIndex,
                sourceIndex,
                droppableId
            } = action.payload;

            const targetList = lists.find(taskList => taskList.id === droppableId);
            const tasks = targetList.tasks.splice(sourceIndex, 1)
            targetList.tasks.splice(targetIndex, 0, ...tasks)

            return [...lists]
        }

        default: {
            return lists
        }
    }
}

export default listReducer;

// let CREATE_BOARD = 'CREATE_BOARD'