import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  clearConstructor
} from '../../services/slices/constructor/burger-constructor-slice';
import { selectIsAuthenticated } from '../../services/slices/user/user-slice';
import {
  createOrder,
  clearOrder,
  selectCurrentOrder,
  selectOrderDetailsLoading
} from '../../services/slices/orders/order-details-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderModalData = useSelector(selectCurrentOrder);
  const orderRequest = useSelector(selectOrderDetailsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const constructorItems = {
    bun,
    ingredients
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum: number, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  const isOrderDisabled = !bun || ingredients.length === 0;

  const onOrderClick = () => {
    if (!isAuthenticated) return navigate('/login');
    if (isOrderDisabled) return;

    const ids = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    dispatch(createOrder(ids));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/', { replace: true });
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isOrderDisabled={isOrderDisabled}
    />
  );
};
