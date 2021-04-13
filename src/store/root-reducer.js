import { combineReducers } from 'redux';
import appReducer from './app/reducer';

const RootReducer = combineReducers({
    App: appReducer,
});

export default RootReducer;
