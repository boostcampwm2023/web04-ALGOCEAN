import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemData } from '../../types/type';
import { getQuestionList } from '../../api';
import { Pagination, QuestionList } from '../../components';
import { Main, Header, InnerDiv } from './QuestionSearchPage.style';

const PAGINATION_SPLIT_NUMBER = 10;

const QuestionSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') as string;
  const page = Number(queryParams.get('page')) || 1;

  const [questionListData, setQuestionListData] = useState<
    ItemData[] | undefined
  >(undefined);
  const [wholePageCount, setwholePageCount] = useState<number | null>(null);

  const getQuestionListData = async () => {
    const { questions, totalPage } = await getQuestionList({
      page: page,
      title: searchQuery,
    });
    setQuestionListData(questions);
    setwholePageCount(totalPage);
  };

  const handleCurrentPage = (page: number) => {
    navigate(
      `/search?query=${encodeURIComponent(
        searchQuery,
      )}&page=${encodeURIComponent(page)}`,
    );
  };

  useEffect(() => {
    getQuestionListData();
  }, [searchQuery, page]);

  return (
    <Main>
      <InnerDiv className="inner">
        <Header>검색 결과</Header>
        <QuestionList questionListData={questionListData} />
        {!!wholePageCount && (
          <Pagination
            wholePageCount={wholePageCount}
            currentPage={page}
            handleCurrentPage={handleCurrentPage}
            splitNumber={PAGINATION_SPLIT_NUMBER}
          />
        )}
      </InnerDiv>
    </Main>
  );
};

export default QuestionSearchPage;
