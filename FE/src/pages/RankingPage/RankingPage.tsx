import { getRankingListData } from '../../api';
import { Main, Header, InnerDiv } from './RankingPage.style';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

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
        <Header>랭킹 게시판</Header>
        {rankingListData && (
          <>
            <div>{JSON.stringify(rankingListData)}</div>
          </>
        )}
      </InnerDiv>
    </Main>
  );
};

export default RankingPage;
