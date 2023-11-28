import { Container, Inner } from './QuestionAnswerRequestCard.styles';
import { QuestionAnswerRequestCardProps } from 'src/types/type';
import { SquareButton } from '../';

const ANSWER_REQUIRE_MENT = '님, 답변을 달아주세요!';
const POINT_RULE_INFORMATION =
  '답변하시면 포인트 10점을, 채택이 되면 포인트 10점을 추가로 더 드립니다.';

const QuestionAnswerRequestCard = ({
  nickname,
  onAnswerButtonClick,
}: QuestionAnswerRequestCardProps) => {
  return (
    <Container>
      <Inner>
        <div>
          <div>
            {nickname}
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
