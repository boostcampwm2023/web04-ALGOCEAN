import { useNavigate } from 'react-router-dom';
import writeIcon from '/icons/write.svg';
import * as S from './MainNav.styles';
import { postDraftQuestionAPI } from '../../api';

const getCurrentNavItem = () => {
  const { pathname } = window.location;
  if (pathname === '/') return 'question';
  return 'question';
};

export function MainNav() {
  const currentNavItem = getCurrentNavItem();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
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
