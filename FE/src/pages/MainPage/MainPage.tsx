import {
  UniqueQuestions,
  QuestionList,
  QuestionProfile,
  Pagination,
} from '../../components';
import { UniqueQuestionItem as Question } from '../../types/type';
import dummyUniqueQuestions from '../../assets/uniqueQuestions.json';
import { Container, Inner, HeroBanner, Main } from './MainPage.styles';
import { getQuestionList } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const PAGINATION_SPLIT_NUMBER = 10;

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const getQuestionListData = async () => {
    return await getQuestionList({ page: page });
  };

  const { data: questionListData } = useQuery({
    queryKey: ['questionList', page],
    queryFn: getQuestionListData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  const wholePageCount = questionListData?.totalPage || 0;

  const handleCurrentPage = (page: number) => {
    navigate(`/?page=${encodeURIComponent(page)}`);
  };

  return (
    <Container>
      <Inner>
        <HeroBanner>
          <UniqueQuestions questions={dummyUniqueQuestions as Question[]} />
          <QuestionProfile />
        </HeroBanner>
        <Main>
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
        </Main>
      </Inner>
    </Container>
  );
}
