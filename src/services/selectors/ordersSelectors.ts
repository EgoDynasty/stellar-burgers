import { RootState } from '@services/store';
import { TOrder } from '@utils-types';

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectFeed = (state: RootState) => state.orders.feed;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectOrderRequest = (state: RootState) => state.orders.isLoading;
export const selectOrderError = (state: RootState) => state.orders.error;
