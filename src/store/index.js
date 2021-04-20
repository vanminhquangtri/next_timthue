import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './root-reducer';
import { createWrapper } from 'next-redux-wrapper';

const persistConfig = {
    key: 'timthue',
    storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const makeStore = (context) => createStore(RootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore, { debug: false });
