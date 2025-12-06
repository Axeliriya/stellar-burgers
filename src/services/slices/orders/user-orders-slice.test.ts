import reducer, { fetchUserOrders, initialState } from './user-orders-slice';

const mockUserOrders = [
  {
    _id: 'order1',
    status: 'done',
    name: 'Space burger',
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-01-01T12:05:00.000Z',
    number: 12345,
    ingredients: ['ing1', 'ing2']
  },
  {
    _id: 'order2',
    status: 'pending',
    name: 'Cosmo Burger',
    createdAt: '2025-01-01T09:00:00.000Z',
    updatedAt: '2025-01-01T09:10:00.000Z',
    number: 11112,
    ingredients: ['ing3']
  }
];

describe('[userOrdersSlice]', () => {
  it('должен возвращать initialState при unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('fetchUserOrders', () => {
    it('pending: isLoading = true, error = null', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual([]);
    });

    it('fulfilled: сохраняет заказы пользователя', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: mockUserOrders
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockUserOrders);
      expect(state.error).toBeNull();
    });

    it('rejected: сохраняет ошибку из payload', () => {
      const errorMessage = 'Не удалось загрузить ваши заказы';
      const action = {
        type: fetchUserOrders.rejected.type,
        payload: errorMessage,
        error: { message: errorMessage }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });

    it('rejected: error может быть null (если payload не передан)', () => {
      const action = { type: fetchUserOrders.rejected.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
