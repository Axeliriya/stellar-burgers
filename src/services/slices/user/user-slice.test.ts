import reducer, { initialState, setAuthChecked, setUser } from './user-slice';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from './user-actions';

const mockUser = {
  email: 'test@example.com',
  name: 'User'
};

const mockAuthResponse = {
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

describe('[userSlice]', () => {
  it('должен возвращать initialState при unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('registerUser - регистрация', () => {
    it('pending: isLoading = true', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled: пользователь авторизован', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected: сохраняет ошибку', () => {
      const error = 'Ошибка авторизации';
      const action = {
        type: registerUser.rejected.type,
        payload: error
      };
      const state = reducer(initialState, action);

      expect(state.error).toBe(error);
    });
  });

  describe('loginUser - авторизация', () => {
    it('pending: isLoading = true', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled: пользователь авторизован', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);

      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('rejected: сохраняет ошибку', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: 'Неверный логин или пароль'
      };
      const state = reducer(initialState, action);
      expect(state.error).toBe('Неверный логин или пароль');
    });
  });

  describe('getUser - загрузка пользователя', () => {
    it('fulfilled: пользователь загружен', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected: пользователь не авторизован, isAuthChecked = true', () => {
      const action = { type: getUser.rejected.type };
      const state = reducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser - обновление пользователя', () => {
    it('fulfilled: обновляет данные пользователя', () => {
      const updatedUser = { ...mockUser, name: 'New Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const initial = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };
      const state = reducer(initial, action);

      expect(state.user).toEqual(updatedUser);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logoutUser - выход', () => {
    it('fulfilled: пользователь выходит', () => {
      const action = { type: logoutUser.fulfilled.type };
      const filledState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        isAuthChecked: true
      };
      const state = reducer(filledState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  it('setAuthChecked устанавливает флаг проверки авторизации', () => {
    const state = reducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('setUser устанавливает пользователя и флаг авторизации', () => {
    const state = reducer(initialState, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);

    const state2 = reducer(initialState, setUser(null));
    expect(state2.isAuthenticated).toBe(false);
  });
});
