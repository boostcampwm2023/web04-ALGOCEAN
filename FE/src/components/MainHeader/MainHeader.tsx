import logoIcon from '/icons/logo.svg';
import searchIcon from '/icons/search.svg';

import * as S from './MainHeader.styles';

const PAGE_TITLE = 'ALGOCEAN';
function Logo() {
  return (
    <S.Logo>
      <img src={logoIcon} alt="" />
      <h1>{PAGE_TITLE}</h1>
    </S.Logo>
  );
}

function SearchBar() {
  return (
    <S.Searchbar>
      <label htmlFor="searchInput"></label>
      <input id="searchInput" placeholder="검색어를 입력해 주세요" />
      <button onClick={(e) => e.preventDefault()}>
        <img src={searchIcon} alt="searchbar button" />
      </button>
    </S.Searchbar>
  );
}
export function MainHeader() {
  return (
    <S.Container>
      <Logo />
      <SearchBar />
    </S.Container>
  );
}
