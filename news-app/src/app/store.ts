import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { articleReducer } from '../features/categoryArticle/articleSlice';
import { userReducer } from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
