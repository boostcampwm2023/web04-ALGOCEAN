import searchIcon from '/icons/search.svg';
import logoIcon from '/images/logo.png';
import {
  Logo as LogoContainer,
  Searchbar,
  SearchbarButton,
  SearchbarInput,
  SearchbarLabel,
  MainHeaderContainer,
} from './MainHeader.styles';

const PAGE_TITLE = 'ALGOCEAN';
function Logo() {
  return (
    <LogoContainer>
      <img src={logoIcon} alt="ALGOCEAN" />
      <h1>{PAGE_TITLE}</h1>
    </LogoContainer>
  );
}

function SearchBar() {
  return (
    <Searchbar>
      <SearchbarLabel htmlFor="searchInput"></SearchbarLabel>
      <SearchbarInput id="searchInput" placeholder="검색어를 입력해 주세요" />
      <SearchbarButton onClick={(e) => e.preventDefault()}>
        <img src={searchIcon} alt="searchbar button" />
      </SearchbarButton>
    </Searchbar>
  );
}
export function MainHeader() {
  return (
    <MainHeaderContainer>
      <div className="inner">
        <Logo />
        <SearchBar />
      </div>
    </MainHeaderContainer>
  );
}
