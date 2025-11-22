import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedOrders,
  selectFeedIsLoading
} from '../../services/slices/feed/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedIsLoading);
  const orders: TOrder[] = useSelector(selectFeedOrders);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
      )}
    </>
  );
};
