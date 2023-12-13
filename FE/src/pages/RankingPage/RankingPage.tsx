import { Suspense } from 'react';
import { Loading, RankingItem } from '../../components';
import { getRankingListData, getUserRankingData } from '../../api';
import {
  useSuspenseQuery,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  Main,
  Header,
  InnerDiv,
  RankingHeader,
  MyRankingContainer,
  RankingTitle,
} from './RankingPage.style';

const RankingList = () => {
  const { data: rankingListData } = useSuspenseQuery({
    queryKey: ['rankingList'],
    queryFn: getRankingListData,
    refetchOnWindowFocus: false,
  });

  return (
    <ul>
      {!!rankingListData &&
        rankingListData.map((data: any) => (
          <RankingItem
            ranking={data.ranking}
            userInfo={data}
            key={data.userId}
          />
        ))}
    </ul>
  );
};
const RankingPage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const getMyRankingData = async () => {
    if (!userInfo.userId) return null;
    return await getUserRankingData(userInfo.userId);
  };

  const { data: myRankingData } = useQuery({
    queryKey: ['myRankingData'],
    queryFn: getMyRankingData,
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
        <Suspense fallback={<Loading />}>
          <RankingList />
        </Suspense>
      </InnerDiv>
    </Main>
  );
};

export default RankingPage;
