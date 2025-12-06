import reducer, { fetchFeeds, initialState } from './feed-slice';
import { TOrdersData } from '@utils-types';

const mockOrdersData: TOrdersData = {
  orders: [
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
      name: 'Cosmo burger',
      createdAt: '2025-01-01T11:00:00.000Z',
      updatedAt: '2025-01-01T11:10:00.000Z',
      number: 12346,
      ingredients: ['ing3']
    }
  ],
  total: 9876,
  totalToday: 142
};

describe('[feedSlice]', () => {
  it('должен возвращать initialState при неизвестном экшене', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('fetchFeeds', () => {
    it('pending: isLoading = true, error = null', () => {
      const state = reducer(initialState, fetchFeeds.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ordersData).toEqual(initialState.ordersData);
    });

    it('fulfilled: сохраняет данные заказов и isLoading = false', () => {
      const state = reducer(
        initialState,
        fetchFeeds.fulfilled(mockOrdersData, '')
      );

      expect(state.isLoading).toBe(false);
      expect(state.ordersData).toEqual(mockOrdersData);
      expect(state.error).toBeNull();
    });

    it('rejected: isLoading = false, сохраняет ошибку', () => {
      const errorMessage = 'Сервер не отвечает';
      const state = reducer(
        initialState,
        fetchFeeds.rejected(null, '', undefined, errorMessage)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ordersData).toEqual(initialState.ordersData);
    });
  });

  it('rejected: использует сообщение по умолчанию, если payload отсутствует', () => {
    const state = reducer(
      initialState,
      fetchFeeds.rejected(null, '', undefined)
    );

    expect(state.error).toBe('Ошибка загрузки ленты');
  });
});
