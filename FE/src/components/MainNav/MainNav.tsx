import writeIcon from '/icons/write.svg';
import * as S from './MainNav.styles';

const getCurrentNavItem = () => {
  const { pathname } = window.location;
  if (pathname === '/') return 'question';
  return 'question';
};

export function MainNav() {
  const currentNavItem = getCurrentNavItem();

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
        <button>
          <img src={writeIcon} alt="질문하기" />
          <span>질문하기</span>
        </button>
      </div>
    </S.MainNav>
  );
}
