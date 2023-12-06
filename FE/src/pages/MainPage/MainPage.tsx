import {
  UniqueQuestions,
  QuestionList,
  QuestionProfile,
  Pagination,
} from '../../components';
import { ItemData, UniqueQuestionItem as Question } from '../../types/type';
import dummyUniqueQuestions from '../../assets/uniqueQuestions.json';
import { Container, Inner, HeroBanner, Main } from './MainPage.styles';
import { useEffect, useState } from 'react';
import { getQuestionList } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGINATION_SPLIT_NUMBER = 10;

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;
  const [questionListData, setQuestionListData] = useState<
    ItemData[] | undefined
  >(undefined);
  const [wholePageCount, setwholePageCount] = useState<number | null>(null);
  const getQuestionListData = async () => {
    const { questions, totalPage } = await getQuestionList({
      page: page,
    });
    setQuestionListData(questions);
    setwholePageCount(totalPage);
  };

  const handleCurrentPage = (page: number) => {
    navigate(`/?page=${encodeURIComponent(page)}`);
  };

  useEffect(() => {
    getQuestionListData();
  }, [page]);

  return (
    <Container>
      <Inner>
        <HeroBanner>
          <UniqueQuestions questions={dummyUniqueQuestions as Question[]} />
          <QuestionProfile />
        </HeroBanner>
        <Main>
          <QuestionList questionListData={questionListData} />
          {!!wholePageCount && (
            <Pagination
              wholePageCount={wholePageCount}
              currentPage={page}
              handleCurrentPage={handleCurrentPage}
              splitNumber={PAGINATION_SPLIT_NUMBER}
            />
          )}
        </Main>
      </Inner>
    </Container>
  );
}
