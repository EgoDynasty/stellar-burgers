import { authReducer, login, fetchUser, updateUser, logout } from '@slices';
import { TUser } from '@utils-types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockAuthResponse = {
    user: mockUser,
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken'
  };

  it('Обработка fetchUser в состоянии pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchUser в состоянии fulfilled', () => {
    const action = { type: fetchUser.fulfilled.type, payload: mockUser };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchUser в состоянии rejected', () => {
    const errorMessage = 'Failed to fetch user';
    const action = {
      type: fetchUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка login в состоянии pending', () => {
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка login в состоянии fulfilled', () => {
    const action = { type: login.fulfilled.type, payload: mockUser };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка login в состоянии rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: login.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка updateUser в состоянии pending', () => {
    const action = { type: updateUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка updateUser в состоянии fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('Обработка updateUser в состоянии rejected', () => {
    const errorMessage = 'Failed to update user';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка logout в состоянии pending', () => {
    const action = { type: logout.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка logout в состоянии fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = authReducer(
      { ...initialState, user: mockUser, isAuthenticated: true },
      action
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Обработка logout в состоянии rejected', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: logout.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(
      { ...initialState, user: mockUser, isAuthenticated: true },
      action
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
