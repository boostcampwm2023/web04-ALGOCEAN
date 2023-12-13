import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestionList } from '../../api';
import { Pagination, QuestionList } from '../../components';
import { Main, Header, InnerDiv } from './QuestionSearchPage.style';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { QuestionSearchPageMetas } from '../../metas/metas';

const PAGINATION_SPLIT_NUMBER = 10;

const QuestionSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') as string;
  const page = Number(queryParams.get('page')) || 1;

  const getQuestionListData = async () => {
    return await getQuestionList({ page: page, title: searchQuery });
  };

  const { data: questionListData } = useQuery({
    queryKey: ['questionList', searchQuery, page],
    queryFn: getQuestionListData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  const wholePageCount = questionListData?.totalPage || 0;

  const handleCurrentPage = (page: number) => {
    navigate(
      `/search?query=${encodeURIComponent(
        searchQuery,
      )}&page=${encodeURIComponent(page)}`,
    );
  };

  return (
    <Main>
      <QuestionSearchPageMetas />
      <InnerDiv className="inner">
        <Header>검색 결과</Header>
        {questionListData && (
          <>
            <QuestionList questionListData={questionListData.questions} />
            {!!wholePageCount && (
              <Pagination
                wholePageCount={wholePageCount}
                currentPage={page}
                handleCurrentPage={handleCurrentPage}
                splitNumber={PAGINATION_SPLIT_NUMBER}
              />
            )}
          </>
        )}
      </InnerDiv>
    </Main>
  );
};

export default QuestionSearchPage;
