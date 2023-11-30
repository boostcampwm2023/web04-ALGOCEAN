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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PAGE_TITLE = 'ALGOCEAN';

function Logo() {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate('/')}>
      <img src={logoIcon} alt="ALGOCEAN" />
      <h1>{PAGE_TITLE}</h1>
    </LogoContainer>
  );
}

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    // 검색어가 비어있으면 navigate를 하지 않음
    if (!searchValue.trim()) {
      return alert('검색어를 입력해주세요.');
    }
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  };
  return (
    <Searchbar>
      <SearchbarLabel htmlFor="searchInput"></SearchbarLabel>
      <SearchbarInput
        id="searchInput"
        placeholder="검색어를 입력해 주세요"
        value={searchValue}
        onChange={handleInputChange}
      />
      <SearchbarButton onClick={handleSearch}>
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
