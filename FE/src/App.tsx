import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getWhoAmI } from './api';
import { router } from './router';

function App() {
  const setUserInfo = async () => {
    const data = await getWhoAmI();
    if (data) {
      const { Nickname: nickname, Points: points } = data;
      localStorage.setItem('userInfo', JSON.stringify({ nickname, points }));
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
