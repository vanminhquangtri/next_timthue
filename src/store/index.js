import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './root-reducer';

const persistConfig = {
    key: 'vm',
    storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
