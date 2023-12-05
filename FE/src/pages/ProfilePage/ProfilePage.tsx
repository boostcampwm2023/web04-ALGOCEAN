import {
  ProfileAnswerList,
  ProfileInfo,
  ProfileQuestionList,
} from '../../components';
import { Container, Inner } from './ProfilePage.styles';

export default function ProfilePage() {
  return (
    <Container>
      <Inner>
        <ProfileInfo />
        <ProfileQuestionList />
        <ProfileAnswerList />
      </Inner>
    </Container>
  );
}
