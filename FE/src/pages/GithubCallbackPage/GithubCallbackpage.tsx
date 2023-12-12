import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';
import { Loading } from '../../components';
import { getWhoAmI, getGithubCallback } from '../../api';
import Swal from 'sweetalert2';

const GithubCallbackPage = () => {
  const { setAccessToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const githubCode = queryParams.get('code');

  const setLogin = async () => {
    if (!githubCode) {
      return navigate('/NOTFOUND');
    }

    try {
      const { accessToken } = await getGithubCallback(githubCode);
      setAccessToken(accessToken);

      const { Nickname: nickname, Points: points } = await getWhoAmI();
      localStorage.setItem('userInfo', JSON.stringify({ nickname, points }));

      Swal.fire({
        icon: 'success',
        title: '로그인이 완료되었습니다',
        showConfirmButton: false,
        toast: true,
        timer: 1000,
      });
      navigate('/');
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '소셜 로그인 실패',
        text: '다시 시도해주세요',
        showConfirmButton: false,
        toast: true,
        timer: 1000,
      });
      navigate('/login');
    }
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
