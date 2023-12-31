import {
  UniqueQuestions,
  QuestionList,
  QuestionProfile,
  Pagination,
} from '../../components';
import { UniqueQuestionItem as Question } from '../../types/type';
import { Container, Inner, HeroBanner, Main } from './MainPage.styles';
import { getQuestionList } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getRandomQuestionAPI,
  getTodayQuestionAPI,
  getTrendingQuestionAPI,
} from '../../api/questionService';
import { MainPageMetas } from '../../metas/metas';

const PAGINATION_SPLIT_NUMBER = 10;
const UNIQUE_QUESTION_INITIAL_DATA = [
  {
    type: 'hot',
    title: '',
    id: 0,
  },
  {
    type: 'today',
    title: '',
    id: 0,
  },
  {
    type: 'random',
    title: '',
    id: 0,
  },
];

const MainContent = ({ page }: { page: number }) => {
  const navigate = useNavigate();

  const getQuestionListData = async () => {
    return await getQuestionList({ page: page });
  };

  const { data: questionListData } = useQuery({
    queryKey: ['questionList', page],
    queryFn: getQuestionListData,
    placeholderData: keepPreviousData,
  });

  const wholePageCount = questionListData?.totalPage || 0;

  const handleCurrentPage = (page: number) => {
    navigate(`/?page=${encodeURIComponent(page)}`);
  };

  return (
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
  );
};

export default function MainPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const getNavQuestionData = async () => {
    try {
      const [
        todayQuestionResult,
        randomQuestionResult,
        trendingQuestionResult,
      ] = await Promise.all([
        getTodayQuestionAPI(),
        getRandomQuestionAPI(),
        getTrendingQuestionAPI(),
      ]);
      return [
        {
          type: 'hot',
          title: trendingQuestionResult.title,
          id: trendingQuestionResult.id,
        },
        {
          type: 'today',
          title: todayQuestionResult.title,
          id: todayQuestionResult.id,
        },
        {
          type: 'random',
          title: randomQuestionResult.title,
          id: randomQuestionResult.id,
        },
      ];
    } catch (error) {
      console.error('Error fetching Nav Question data: ', error);
    }
  };

  const { data: navQuestionData } = useQuery({
    queryKey: ['navQuestion'],
    queryFn: getNavQuestionData,
    staleTime: 0,
    initialData: () => UNIQUE_QUESTION_INITIAL_DATA,
    placeholderData: keepPreviousData,
  });

  return (
    <Container>
      <MainPageMetas />
      <Inner>
        <HeroBanner>
          <UniqueQuestions questions={navQuestionData as Question[]} />
          <QuestionProfile />
        </HeroBanner>
        <MainContent page={page} />
      </Inner>
    </Container>
  );
}
