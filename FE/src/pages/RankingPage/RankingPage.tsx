import { RankingItem } from '../../components';
import { getRankingListData } from '../../api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Main, Header, InnerDiv, RankingHeader } from './RankingPage.style';

const RankingPage = () => {
  const { data: rankingListData } = useQuery({
    queryKey: ['rankingList'],
    queryFn: getRankingListData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <Main>
      <InnerDiv className="inner">
        <Header>👑 랭킹 게시판</Header>
        <RankingHeader>
          <div>순위</div>
          <div>닉네임</div>
          <div>포인트</div>
          <div>등급</div>
        </RankingHeader>
        {rankingListData && (
          <ul>
            {rankingListData.map((data: any, idx: number) => (
              <RankingItem ranking={idx + 1} userInfo={data} />
            ))}
          </ul>
        )}
      </InnerDiv>
    </Main>
  );
};

export default RankingPage;
