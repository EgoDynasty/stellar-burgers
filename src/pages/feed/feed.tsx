import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@services/store';
import { fetchOrdersFeeds } from '@slices';
import {
  selectOrders,
  selectOrdersOrderRequest,
  selectOrderError
} from '@selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersOrderRequest);
  const error = useSelector(selectOrderError);

  useEffect(() => {
    dispatch(fetchOrdersFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchOrdersFeeds());
  };

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

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
