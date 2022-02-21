import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Board from '../pages/Board'
import BoardDetails from './../pages/BoardDetails';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<Board />} />
                <Route path = '/:boardId' element = {<BoardDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;