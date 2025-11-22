import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../services/slices/ingredients/ingredients-slice';
import {
  fetchOrderByNumber,
  clearOrderInfo,
  selectOrderInfo,
  selectOrderInfoLoading
} from '../../services/slices//orders/order-info-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orderData = useSelector(selectOrderInfo);
  const loading = useSelector(selectOrderInfoLoading);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
    return () => {
      dispatch(clearOrderInfo());
    };
  }, [number, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  return (
    <>
      {loading || !orderInfo ? (
        <Preloader />
      ) : (
        <OrderInfoUI orderInfo={orderInfo} />
      )}
    </>
  );
};
