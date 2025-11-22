import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('userName', res.user.name);
      setCookie('accessToken', res.accessToken);
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка авторизации'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('userName', res.user.name);
      setCookie('accessToken', res.accessToken);
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Неверный логин или пароль'
      );
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Не удалось загрузить пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(data);
      localStorage.setItem('userName', res.user.name);
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Не удалось обновить данные профиля'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');
      deleteCookie('accessToken');
      return undefined;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось выйти из профиля'
      );
    }
  }
);
