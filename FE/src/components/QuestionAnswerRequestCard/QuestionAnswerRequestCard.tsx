import { Container, Inner } from './QuestionAnswerRequestCard.styles';
import { QuestionAnswerRequestCardProps } from 'src/types/type';
import { SquareButton } from '../';
import { useNavigate } from 'react-router-dom';

const ANSWER_REQUIRE_MENT = '님, 답변을 달아주세요!';
const LOGIN_REQUEST_MENT = '답변을 위해 로그인해 주세요!';
const POINT_RULE_INFORMATION =
  '답변하시면 포인트 10점을, 채택이 되면 포인트 10점을 추가로 더 드립니다.';

const LoginCard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>{LOGIN_REQUEST_MENT}</div>
        <span>{POINT_RULE_INFORMATION}</span>
      </div>
      <SquareButton
        content={'로그인 하러 가기'}
        handleClick={() => navigate('/login')}
      />
    </>
  );
};

const AnswerCard = ({
  onAnswerButtonClick,
}: QuestionAnswerRequestCardProps) => {
  const { nickname } = JSON.parse(localStorage.getItem('userInfo')!);
  return (
    <>
      <div>
        <div>
          {nickname}
          {ANSWER_REQUIRE_MENT}
        </div>
        <span>{POINT_RULE_INFORMATION}</span>
      </div>
      <SquareButton content="답변하기" handleClick={onAnswerButtonClick} />
    </>
  );
};

const QuestionAnswerRequestCard = ({
  onAnswerButtonClick,
}: QuestionAnswerRequestCardProps) => {
  const isLogined = !!localStorage.getItem('userInfo');

  return (
    <Container>
      <Inner>
        {isLogined && <AnswerCard onAnswerButtonClick={onAnswerButtonClick} />}
        {!isLogined && <LoginCard />}
      </Inner>
    </Container>
  );
};

export default QuestionAnswerRequestCard;
