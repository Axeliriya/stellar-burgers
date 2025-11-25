import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import {
  selectUser,
  selectUserLoading
} from '../../services/slices/user/user-slice';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/user/user-actions';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isLoading || !isFormChanged) return;

    await dispatch(updateUser(values));
  };

  const handleCancel = async (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
