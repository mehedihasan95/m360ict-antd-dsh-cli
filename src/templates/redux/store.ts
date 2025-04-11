import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import api from './api/api.js';
import authSlice from './slice/authSlice.js';

const persistConfig = {
	key: 'ROOT_WEB_NAME',
	storage: localStorage,
	whitelist: ['auth'],
	version: 1,
	blacklist: [api.reducerPath],
};

const rootReducer = combineReducers({
	auth: authSlice,
	[api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(api.middleware),
	devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Type-safe hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
