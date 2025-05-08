import { ordersReducer, fetchUserOrders } from '@slices';
import {
  fetchFeeds,
  fetchOrderByNumber,
  placeOrder,
  resetOrder
} from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    userOrders: [],
    feed: null,
    currentOrder: null,
    feedsLoading: false,
    userOrdersLoading: false,
    orderByNumberLoading: false,
    placeOrderLoading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: 'order1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ing1']
  };

  const mockFeed = {
    orders: [mockOrder],
    total: 1,
    totalToday: 1
  };

  it('Обработка fetchFeeds в состоянии pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.feedsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchFeeds в состоянии fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeed };
    const state = ordersReducer(initialState, action);
    expect(state.feedsLoading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.feed).toEqual({
      total: mockFeed.total,
      totalToday: mockFeed.totalToday
    });
    expect(state.error).toBeNull();
  });

  it('Обработка fetchFeeds в состоянии rejected', () => {
    const errorMessage = 'Failed to fetch feeds';
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = ordersReducer(initialState, action);
    expect(state.feedsLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });

  it('Обработка fetchUserOrders в состоянии pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.userOrdersLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchUserOrders в состоянии fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = ordersReducer(initialState, action);
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrders).toEqual([mockOrder]);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchUserOrders в состоянии rejected', () => {
    const errorMessage = 'Failed to fetch user orders';
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = ordersReducer(initialState, action);
    expect(state.userOrdersLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка fetchOrderByNumber в состоянии pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.orderByNumberLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchOrderByNumber в состоянии fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderByNumberLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchOrderByNumber в состоянии rejected', () => {
    const errorMessage = 'Failed to fetch order';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderByNumberLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка placeOrder в состоянии pending', () => {
    const action = { type: placeOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.placeOrderLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка placeOrder в состоянии fulfilled', () => {
    const action = { type: placeOrder.fulfilled.type, payload: mockOrder };
    const state = ordersReducer(initialState, action);
    expect(state.placeOrderLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.userOrders).toEqual([mockOrder]);
    expect(state.error).toBeNull();
  });

  it('Обработка placeOrder в состоянии rejected', () => {
    const errorMessage = 'Failed to place order';
    const action = {
      type: placeOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = ordersReducer(initialState, action);
    expect(state.placeOrderLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('Обработка resetOrder', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrder: mockOrder
    };
    const state = ordersReducer(stateWithOrder, resetOrder());
    expect(state.currentOrder).toBeNull();
  });
});
