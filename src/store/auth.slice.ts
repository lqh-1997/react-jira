import { RootState } from 'store';
import { bootstrapUser } from './../context/auth-context';
import { AppDispatch } from './index';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'screens/project-list/search-panel';
import { AuthForm } from 'context/auth-context';
import * as auth from 'auth-provider';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

// reducer里面还是放的同步操作 将payload赋值给state.user
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

// 选择器 用来到处当前state.user
export const selectUser = (state: RootState) => state.auth.user;

// 这里使用redux-thunk来处理类似login这类的异步操作 thunk在使用的时候要返回一个函数
// 可以查看thunk的源码 判断是否异步的方式就是通过判断传递过来的是否是一个函数
// 所以这里我们使用另一个函数将其包裹起来 https://github.com/reduxjs/redux-thunk/
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then((user) => dispatch(setUser(user)));
