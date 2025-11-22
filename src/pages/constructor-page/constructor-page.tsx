import { useSelector } from '../../services/store';

import { FC } from 'react';
import { selectIngredientsLoading } from '../../services/slices/ingredients/ingredients-slice';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(selectIngredientsLoading);

  return <ConstructorPageUI isIngredientsLoading={isLoading} />;
};
