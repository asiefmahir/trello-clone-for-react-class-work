const boardReducer = (boards = [], action) => { // action === {type: 'CREATE_BOARD, payload: {id: "randomid", title: "first board"}}
    switch (action.type)  {
        case 'CREATE_BOARD' : {
            const board = {};
            board.id = action.payload.id;
            board.title = action.payload.title;
            board.lists = [];
            board.tasks = [];

            return [...boards, board]
        }
        case 'DELETE_BOARD': {
            return boards.filter(board => board.id !== action.payload.id)
        }
        case 'UPDATE_BOARD': {
            const board = boards.find(item => item.id === action.payload.id);
            board.title = action.payload.title || board.title;
            return [...boards]
        }
        case 'ADD_LIST_ID_TO_BOARD' : {
            const board = boards.find(item => item.id === action.payload.id);
            board.lists.push(action.payload.listId);
             return [...boards]
        }
        case 'ADD_TASK_ID_TO_BOARD' : {
            const board = boards.find(item => item.id === action.payload.id);
            board.tasks.push(action.payload.taskId);
            return [...boards]
        }
        case 'REMOVE_LIST_ID_FROM_A_BOARD' : {
            const board = boards.find(item => item.id === action.payload.id);
            board.lists = board.lists.filter(item => item !== action.payload.listId)
            return [...boards]
        }
        case 'REMOVE_TASK_ID_FROM_A_BOARD' : {
            const board = boards.find(item => item.id === action.payload.id);
            board.tasks = board.tasks.filter(item => item !== action.payload.taskId);
            return [...boards]
        }
        default : {
            return boards
        }
    }
}

export default boardReducer;

// let CREATE_BOARD = 'CREATE_BOARD'