import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUserError,
  selectUserLoading
} from '../../services/slices/user/user-slice';
import { loginUser } from '../../services/slices/user/user-actions';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const { email, password } = values;

  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || isLoading) return;

    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
