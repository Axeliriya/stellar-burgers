import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/user/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  const userName = localStorage.getItem('userName') || user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
