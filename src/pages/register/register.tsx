import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './../../services/slices/user/user-actions';
import {
  selectUserError,
  selectUserLoading
} from '../../services/slices/user/user-slice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isLoading || !email || !password || !userName) return;

    const result = await dispatch(
      registerUser({ email, password, name: userName })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
