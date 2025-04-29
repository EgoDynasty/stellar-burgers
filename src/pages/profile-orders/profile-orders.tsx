import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@services/store';
import { fetchUserOrders } from '@slices';
import {
  selectUserOrders,
  selectOrdersOrderRequest,
  selectOrderError,
  selectIsAuthenticated
} from '@selectors';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders: TOrder[] = useSelector(selectUserOrders);
  const isLoading = useSelector(selectOrdersOrderRequest);
  const error = useSelector(selectOrderError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium text_color_error'>
        Ошибка загрузки: {error}
      </div>
    );
  }

  if (!orders.length) {
    return <div className='text text_type_main-medium'>Заказов пока нет</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
