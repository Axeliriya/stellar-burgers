import { rootReducer } from './store';

describe('[rootReducer]', () => {
  it('должен корректно инициализироваться при unknown action', () => {
    const initialState = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(initialState).toEqual({
      burgerConstructor: expect.any(Object),
      ingredients: expect.any(Object),
      feed: expect.any(Object),
      user: expect.any(Object),
      orderDetails: expect.any(Object),
      orderInfo: expect.any(Object),
      userOrders: expect.any(Object)
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });

    expect(initialState.feed).toEqual({
      ordersData: { orders: [], total: 0, totalToday: 0 },
      isLoading: false,
      error: null
    });

    expect(initialState.user).toEqual({
      user: null,
      isAuthChecked: false,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });

    expect(initialState.orderDetails).toEqual({
      order: null,
      isLoading: false,
      error: null
    });

    expect(initialState.orderInfo).toEqual({
      order: null,
      isLoading: false,
      error: null
    });

    expect(initialState.userOrders).toEqual({
      orders: [],
      isLoading: false,
      error: null
    });
  });
});
