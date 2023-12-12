import { useNavigate } from 'react-router-dom';
import { RankingItemProps } from '../../types/type';
import { Container } from './RankingItem.styles';

const RankingItem = ({ ranking, userInfo }: RankingItemProps) => {
  const { userId, nickname, points, profileImage, grade } = userInfo;
  const navigate = useNavigate();
  const onNicknameClick = () => {
    navigate(`/proilfe/${userId}`);
  };

  return (
    <Container>
      <div>{ranking}위</div>
      {!!profileImage && (
        <img src={profileImage} alt={`${nickname}의 프로필 이미지`} />
      )}
      <div onClick={onNicknameClick}>{nickname}</div>
      <div>{points}</div>
      <div>{grade}</div>
    </Container>
  );
};

export default RankingItem;
