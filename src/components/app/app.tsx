import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from '@services/store';
import { fetchIngredients, fetchUser } from '@slices';
import { selectIngredients, selectIsAuthenticated } from '@selectors';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, ProtectedRoute } from '@components';
import { IngredientDetails, OrderInfo } from '@components';
import { getCookie } from '@utils/cookie';
import '../../index.css';
import styles from './app.module.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken && !isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  const backgroundLocation = location.state?.background || { pathname: '/' };
  const isModalOpen =
    location.pathname.startsWith('/ingredients/') ||
    location.pathname.startsWith('/feed/') ||
    location.pathname.startsWith('/profile/orders/');

  const handleModalClose = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={isModalOpen ? backgroundLocation : location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {isModalOpen && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Details' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient Details' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Order Details' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
