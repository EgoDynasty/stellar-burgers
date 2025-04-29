import authReducer from './authSlice';
import { burgerConstructorReducer } from './burgerConstructorSlice';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';

// Экспортируем редьюсеры
export {
  authReducer,
  burgerConstructorReducer,
  ingredientsReducer,
  ordersReducer
};

// Экспортируем действия из authSlice
export { login, fetchUser, logout, updateUser } from './authSlice';

// Экспортируем действия из burgerConstructorSlice
export {
  placeOrder as placeOrderConstructor,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder as resetOrderConstructor
} from './burgerConstructorSlice';

// Экспортируем действия из ingredientsSlice
export { fetchIngredients } from './ingredientsSlice';

// Экспортируем действия из ordersSlice
export {
  fetchFeeds as fetchOrdersFeeds,
  fetchOrderByNumber as fetchOrderByNumberOrders,
  placeOrder as placeOrderOrders,
  fetchUserOrders,
  resetOrder as resetOrderOrders
} from './ordersSlice';
