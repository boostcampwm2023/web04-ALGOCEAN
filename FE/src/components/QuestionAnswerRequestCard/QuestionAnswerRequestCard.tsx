import { Container, Inner } from './QuestionAnswerRequestCard.styles';
import { QuestionAnswerRequestCardProps } from 'src/types/type';
import { SquareButton } from '../';

// ⚠️ 유저 정보를 전역으로 관리하는 로직 추가 필요
const GLOBAL_USER_NICKNAME = 'Snoopy';

const ANSWER_REQUIRE_MENT = '님, 답변을 달아주세요!';
const POINT_RULE_INFORMATION =
  '답변하시면 포인트 10점을, 채택이 되면 포인트 10점을 추가로 더 드립니다.';

const QuestionAnswerRequestCard = ({
  onAnswerButtonClick,
}: QuestionAnswerRequestCardProps) => {
  return (
    <Container>
      <Inner>
        <div>
          <div>
            {GLOBAL_USER_NICKNAME}
            {ANSWER_REQUIRE_MENT}
          </div>
          <span>{POINT_RULE_INFORMATION}</span>
        </div>
        <SquareButton content="답변하기" handleClick={onAnswerButtonClick} />
      </Inner>
    </Container>
  );
};

export default QuestionAnswerRequestCard;
