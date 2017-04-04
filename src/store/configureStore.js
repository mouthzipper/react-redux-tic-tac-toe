import {createStore, applyMiddleware} from 'redux';
import ticTacToeReducer from '../reducers/ticTacToeReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        ticTacToeReducer,
        applyMiddleware(thunk)
    );
}