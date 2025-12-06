import reducer, {
  createOrder,
  clearOrder,
  initialState
} from './order-details-slice';

const mockOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Space burger',
  createdAt: '2025-01-01T12:00:00.000Z',
  updatedAt: '2025-01-01T12:05:00.000Z',
  number: 12345,
  ingredients: ['ing1', 'ing2']
};

describe('[orderDetailsSlice]', () => {
  it('должен возвращать initialState при unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('createOrder', () => {
    it('pending: isLoading = true', () => {
      const action = { type: createOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled: сохраняет заказ', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('rejected: сохраняет ошибку', () => {
      const error = 'Не удалось оформить заказ';
      const action = {
        type: createOrder.rejected.type,
        payload: error,
        error: { message: error }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  it('clearOrder очищает состояние', () => {
    const filledState = {
      order: mockOrder,
      isLoading: false,
      error: 'some error'
    };
    const state = reducer(filledState as any, clearOrder());
    expect(state).toEqual(initialState);
  });
});
