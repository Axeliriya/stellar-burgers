import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeConstructorIngredient,
  moveUpConstructorIngredient,
  moveDownConstructorIngredient
} from '../../services/slices/constructor/burger-constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(removeConstructorIngredient(ingredient.id));
    };

    const handleMoveUp = () => {
      dispatch(moveUpConstructorIngredient(index));
    };

    const handleMoveDown = () => {
      dispatch(moveDownConstructorIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleClose={handleClose}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
      />
    );
  }
);
