import WalkingPenguin from '/images/walking-penguin.webp';
import { LoadingContainer } from './Loading.styles';

const Loading = () => {
  return (
    <LoadingContainer>
      <picture>
        <source srcSet={WalkingPenguin} type="image/webp" />
        <img src="" />
      </picture>
    </LoadingContainer>
  );
};

export default Loading;
