import { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';
import { postDraftQuestionAPI } from '../../api';
import { WriteIcon } from '../../assets/icons';
import * as S from './MainNav.styles';
import Swal from 'sweetalert2';

const getCurrentNavItem = (pathname: string) => {
  if (pathname === '/ranking') return 'ranking';
  return 'question';
};

export function MainNav() {
  const { getAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentNavItem = getCurrentNavItem(pathname);

  const handleButtonClick = async () => {
    const isLogined = localStorage.getItem('userInfo');
    const accessToken = getAccessToken();
    if (!isLogined || !accessToken) {
      Swal.fire({
        width: 600,
        icon: 'question',
        title: '로그인 후 질문 작성이 가능합니다 😉',
        text: '로그인 페이지로 이동하시겠습니까?',
        showCancelButton: true,
        cancelButtonText: '취소',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate('/login');
        }
      });
      return;
    }

    // 여기에서 POST 요청을 수행
    const res = await postDraftQuestionAPI();

    // 페이지 이동
    navigate('/question/create', {
      state: {
        id: res.id,
      },
    });
  };

  const handleClick = (type: 'question' | 'ranking') => {
    if (type === currentNavItem) return;
    navigate(`/${type === 'ranking' ? 'ranking' : ''}`);
  };

  return (
    <S.MainNav>
      <div className="inner">
        <ol>
          <li
            className={currentNavItem === 'question' ? 'selected' : ''}
            onClick={() => handleClick('question')}
          >
            <Link to="/">질문 게시판</Link>
          </li>
          <li
            className={currentNavItem === 'ranking' ? 'selected' : ''}
            onClick={() => handleClick('ranking')}
          >
            <Link to="/ranking">랭킹 게시판</Link>
          </li>
        </ol>
        <button onClick={handleButtonClick}>
          <WriteIcon />
          <span>질문하기</span>
        </button>
      </div>
    </S.MainNav>
  );
}
