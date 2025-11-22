import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  ProtectedRoute
} from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetails, OrderInfo, Modal } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';

import { AppHeader } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { selectIsAuthChecked } from '../../services/slices/user/user-slice';
import { initializeApp } from '../../services/app-init';
import { Preloader } from '@ui';
import { clearOrderInfo } from '../../services/slices/orders/order-info-slice';
import { ModalType, MODAL_TITLES } from '../../constants/modal-title';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  const closeModal = () => {
    const currentPath = location.pathname;

    if (
      currentPath.includes('/feed/') ||
      currentPath.includes('/profile/orders/')
    ) {
      dispatch(clearOrderInfo());
    }

    navigate(-1);
  };

  return (
    <>
      {!isAuthChecked ? (
        <div className={styles.app}>
          <AppHeader />
          <Preloader />
        </div>
      ) : (
        <div className={styles.app}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />

            <Route element={<ProtectedRoute onlyUnAuth />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/orders' element={<ProfileOrders />} />
              <Route path='/profile/orders/:number' element={<OrderInfo />} />
            </Route>

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal
                    title={MODAL_TITLES[ModalType.FeedOrder]}
                    onClose={closeModal}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal
                    title={MODAL_TITLES[ModalType.ProfileOrder]}
                    onClose={closeModal}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal
                    title={MODAL_TITLES[ModalType.Ingredient]}
                    onClose={closeModal}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      )}
    </>
  );
};

export default App;
