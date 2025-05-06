import { ingredientsReducer, fetchIngredients } from '@slices';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: 'ing1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 300,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  it('Обработка fetchIngredients в состоянии pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchIngredients в состоянии fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('Обработка fetchIngredients в состоянии rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });
});
