import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredientById } from '../../services/slices/ingredients/ingredients-slice';

type Params = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();

  const ingredientData = useSelector((state) => {
    if (!id) return;

    return selectIngredientById(state, id);
  });

  return (
    <>
      {!ingredientData ? (
        <Preloader />
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
