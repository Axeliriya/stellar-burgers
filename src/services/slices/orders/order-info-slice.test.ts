import reducer, {
  fetchOrderByNumber,
  clearOrderInfo,
  initialState
} from './order-info-slice';

const mockOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Space burger',
  createdAt: '2025-01-01T12:00:00.000Z',
  updatedAt: '2025-01-01T12:05:00.000Z',
  number: 12345,
  ingredients: ['ing1', 'ing2']
};

describe('[orderInfoSlice]', () => {
  it('должен возвращать initialState при unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('fetchOrderByNumber', () => {
    it('pending: isLoading = true', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    it('fulfilled: сохраняет заказ', () => {
      const state = reducer(
        initialState,
        fetchOrderByNumber.fulfilled(mockOrder, '', 12345)
      );
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('rejected: сохраняет ошибку', () => {
      const error = 'Заказ не найден';
      const state = reducer(
        initialState,
        fetchOrderByNumber.rejected(null, '', 999, error)
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  it('clearOrderInfo очищает состояние', () => {
    const filled = { order: mockOrder, isLoading: false, error: 'err' };
    const state = reducer(filled as any, clearOrderInfo());
    expect(state).toEqual(initialState);
  });
});
