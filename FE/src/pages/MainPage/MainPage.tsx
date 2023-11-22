import {
  UniqueQuestions,
  QuestionList,
  QuestionProfile,
} from '../../components';
import { UniqueQuestionItem as Question } from '../../types/type';
import dummyUniqueQuestions from '../../assets/uniqueQuestions.json';
import dummyQuestionList from '../../assets/questionlistMockdata.json';
import { Main } from './MainPage.styles';

export default function MainPage() {
  return (
    <Main>
      <div className="inner">
        <div>
          <UniqueQuestions questions={dummyUniqueQuestions as Question[]} />
          <QuestionList itemDatas={dummyQuestionList} />
        </div>
        <aside>
          <img
            className="banner"
            src="https://i.pinimg.com/originals/b0/df/95/b0df95cfc6f31293d002d4d6daac253c.jpg"
            alt="포인트 정보가 들어갈 배너"
          />
          <QuestionProfile />
        </aside>
      </div>
    </Main>
  );
}
