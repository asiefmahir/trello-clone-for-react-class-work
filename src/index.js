import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import BoardProvider from './contexts/boardContext';
import ListProvider from './contexts/listContext';
import TaskProvider from './contexts/taskContext';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
   <BoardProvider>
     <ListProvider>
       <TaskProvider>
         <App />
       </TaskProvider>
     </ListProvider>
   </BoardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
