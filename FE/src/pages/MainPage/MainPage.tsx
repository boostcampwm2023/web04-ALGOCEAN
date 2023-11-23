import {
  UniqueQuestions,
  QuestionList,
  QuestionProfile,
} from '../../components';
import { UniqueQuestionItem as Question } from '../../types/type';
import dummyUniqueQuestions from '../../assets/uniqueQuestions.json';
import { Container, Inner, HeroBanner, Main } from './MainPage.styles';

export default function MainPage() {
  return (
    <Container>
      <Inner>
        <HeroBanner>
          <UniqueQuestions questions={dummyUniqueQuestions as Question[]} />
          <QuestionProfile />
        </HeroBanner>
        <Main>
          <QuestionList />
        </Main>
      </Inner>
    </Container>
  );
}
