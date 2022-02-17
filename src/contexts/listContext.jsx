import {createContext, useReducer} from 'react';
import listReducer from './../reducers/listReducer';

export const ListContext = createContext();

const ListProvider = (props) => {
    const [lists, dispatchListAction] = useReducer(listReducer, []);

    return (
        <ListContext.Provider value = {{lists, dispatchListAction}}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListProvider;