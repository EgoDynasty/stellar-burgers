import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@services/store';
import { fetchIngredients } from '@slices';
import { selectIngredientsLoading } from '@selectors';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(selectIngredientsLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
