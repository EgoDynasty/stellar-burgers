import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder
} from './burgerConstructorSlice';
import { orderBurgerApi } from '@api';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const bun: TIngredient = {
    _id: 'bun1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 300,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const filling: TConstructorIngredient = {
    _id: 'filling1',
    name: 'Test Filling',
    type: 'main',
    proteins: 15,
    fat: 25,
    carbohydrates: 35,
    calories: 400,
    price: 150,
    image: '',
    image_large: '',
    image_mobile: '',
    uniqueId: 'uuid1'
  };

  const filling2: TConstructorIngredient = {
    _id: 'filling2',
    name: 'Test Filling 2',
    type: 'main',
    proteins: 20,
    fat: 30,
    carbohydrates: 40,
    calories: 500,
    price: 200,
    image: '',
    image_large: '',
    image_mobile: '',
    uniqueId: 'uuid2'
  };

  it('Обработка addIngredient для булочки', () => {
    const action = addIngredient(bun);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.constructorItems.bun).toEqual({
      ...bun,
      uniqueId: expect.any(String)
    });
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  it('Обработка addIngredient для начинки', () => {
    const action = addIngredient(filling);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.constructorItems.ingredients).toEqual([
      { ...filling, uniqueId: expect.any(String) }
    ]);
    expect(state.constructorItems.bun).toBeNull();
  });

  it('Обработка removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [filling]
      }
    };
    const action = removeIngredient('uuid1');
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  it('Обработка moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [filling, filling2]
      }
    };
    const action = moveIngredientUp(1);
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients).toEqual([filling2, filling]);
  });

  it('Обработка moveIngredientDown', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [filling, filling2]
      }
    };
    const action = moveIngredientDown(0);
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients).toEqual([filling2, filling]);
  });

  it('Обработка resetOrder', () => {
    const order: TOrder = {
      _id: 'order1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: ['bun1', 'filling1']
    };
    const stateWithData = {
      ...initialState,
      constructorItems: {
        bun,
        ingredients: [filling]
      },
      orderRequest: true,
      orderModalData: order,
      error: null
    };
    const state = burgerConstructorReducer(stateWithData, resetOrder());
    expect(state).toEqual(initialState);
  });
});
