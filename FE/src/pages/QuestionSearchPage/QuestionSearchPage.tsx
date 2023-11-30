import { useLocation } from 'react-router-dom';
import { QuestionList } from '../../components';
import { Main, Header, InnerDiv } from './QuestionSearchPage.style';

const QuestionSearchPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  alert(searchQuery);

  return (
    <Main>
      <InnerDiv className="inner">
        <Header>검색 결과</Header>
        {/* <QuestionList isSearching={true} /> */}
      </InnerDiv>
    </Main>
  );
};

export default QuestionSearchPage;
