import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';
import { postDraftQuestionAPI } from '../../api';
import writeIcon from '/icons/write.svg';
import * as S from './MainNav.styles';

const getCurrentNavItem = () => {
  const { pathname } = window.location;
  if (pathname === '/') return 'question';
  return 'question';
};

export function MainNav() {
  const { getAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentNavItem = getCurrentNavItem();

  const handleButtonClick = async () => {
    const isLogined = localStorage.getItem('userInfo');
    const accessToken = getAccessToken();
    if (!isLogined || !accessToken) {
      alert('로그인 후 질문 작성이 가능합니다 😉');
      return navigate('/login');
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

  return (
    <S.MainNav>
      <div className="inner">
        <ol>
          <li className={currentNavItem === 'question' ? 'selected' : ''}>
            질문 게시판
          </li>
          <li className={currentNavItem === 'ranking' ? 'selected' : ''}>
            랭킹 게시판
          </li>
          <li className={currentNavItem === 'point' ? 'selected' : ''}>
            포인트 상점
          </li>
        </ol>
        <button onClick={handleButtonClick}>
          <img src={writeIcon} alt="질문하기" />
          <span>질문하기</span>
        </button>
      </div>
    </S.MainNav>
  );
}
