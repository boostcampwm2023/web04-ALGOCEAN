import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getWhoAmI } from './api';
import { router } from './router';

function App() {
  const setUserInfo = async () => {
    const userInfo = await getWhoAmI();
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  };

  useEffect(() => {
    const isLogined = !!localStorage.getItem('userInfo');
    if (isLogined) {
      setUserInfo();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
