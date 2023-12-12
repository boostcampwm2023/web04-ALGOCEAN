import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';
import { Loading } from '../../components';
import { getWhoAmI } from '../../api';

const GithubCallbackPage = () => {
  const { setAccessToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('accesstoken');

  const setLogin = async () => {
    if (!accessToken) {
      return navigate('/NOTFOUND');
    }
    setAccessToken(accessToken);

    try {
      const { Nickname: nickname, Points: points } = await getWhoAmI();
      localStorage.setItem('userInfo', JSON.stringify({ nickname, points }));
    } catch (e) {
      navigate('/notfound');
    }

    navigate('/');
  };

  useEffect(() => {
    setLogin();
  });

  return (
    <>
      <Loading />
    </>
  );
};

export default GithubCallbackPage;
