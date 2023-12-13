import { RankingItem } from '../../components';
import { getRankingListData, getUserRankingData } from '../../api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  Main,
  Header,
  InnerDiv,
  RankingHeader,
  MyRankingContainer,
  RankingTitle,
} from './RankingPage.style';

const RankingPage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const { data: rankingListData } = useQuery({
    queryKey: ['rankingList'],
    queryFn: getRankingListData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  const getMyRankingData = async () => {
    if (!userInfo) return;
    return await getUserRankingData(userInfo.userId);
  };

  const { data: myRankingData } = useQuery({
    queryKey: ['myRankingData'],
    queryFn: getMyRankingData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <Main>
      <InnerDiv className="inner">
        <Header>👑 랭킹 게시판</Header>
        {!!myRankingData && (
          <MyRankingContainer>
            <RankingTitle>내 랭킹</RankingTitle>
            <RankingItem
              ranking={myRankingData.ranking || null}
              userInfo={myRankingData}
              isMyData={true}
            />
          </MyRankingContainer>
        )}
        <RankingTitle>전체 랭킹</RankingTitle>
        <RankingHeader>
          <div>순위</div>
          <div>닉네임</div>
          <div>포인트</div>
          <div>등급</div>
        </RankingHeader>
        {!!rankingListData && (
          <ul>
            {rankingListData.map((data: any, idx: number) => (
              <RankingItem
                ranking={idx + 1}
                userInfo={data}
                key={data.userId}
              />
            ))}
          </ul>
        )}
      </InnerDiv>
    </Main>
  );
};

export default RankingPage;
