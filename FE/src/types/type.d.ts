export interface UniqueQuestionItem {
  type: 'today' | 'hot' | 'random';
  title: string;
  id: number;
}

export interface QuestionDetailData {
  id: number;
  title: string;
  nickname: string;
  tag: string;
  createdAt: string;
  programmingLanguage: string;
  isAdopted: boolean;
  viewCount: number;
  likeCount: number;
  isLiked: boolean;
  content: string;
}

export interface QuestionDetailContentProps {
  questionData: QuestionDetailData;
}

export interface TagbuttonProps {
  content: string;
  initialState?: 'select' | 'unselect';
  isInteractive?: boolean;
  handleToggle?: (isSelected: boolean) => void;
}

export interface QuestionData {
  title: string;
  content: string;
  tag: string;
  programmingLanguage: string;
  originalLink: string;
  draftId: number;
}

export interface QuestionAnswerRequestCardProps {
  onAnswerButtonClick: () => void;
}

export interface SquareButtonProps {
  content: string;
  type?: 'fill' | 'stroke';
  handleClick?: () => void;
}

export interface QuestionAnswerData {
  Id: number;
  User: {
    Id: number;
    Nickname: string;
    ProfileImage: string;
  };
  Content: string;
  VideoLink: string;
  IsAdopted: boolean;
  CreatedAt: string;
}

export interface QuestionAnswerCardProps {
  cardData: QuestionAnswerData;
}

export interface QuestionAnswerFormCardProps {
  handleCancel: () => void;
  handleSubmit: (content: string) => void;
}

export interface LoginFetchData {
  userId: string;
  password: string;
}

export interface SignupFetchData extends LoginFetchData {
  nickname: string;
}

export interface AuthContextValue {
  getAccessToken: () => string | null;
  setAccessToken: (nextAuthToken: string) => void;
  deleteAccessToken: () => void;
}

export interface ItemData {
  id: number;
  title: string;
  nickname: string;
  tag: string;
  createdAt: string;
  programmingLanguage: string;
  isAdopted: number;
  viewCount: number;
  likeCount: number;
}

export interface GetQuestionListOptions {
  page?: number;
  tag?: string;
  ProgrammingLanguage?: string;
  isAdopted?: 1 | 0;
  sortByCreatedAt?: 'desc' | 'asc';
  sortByViewCount?: 'desc' | 'asc';
  [key: string]: number | string | undefined;
}

export interface QuestionList {
  id: number;
  title: string;
  createdAt: string;
  tag: string;
  programmingLanguage: string;
  isAdopted: boolean;
  viewCount: number;
  likeCount: number;
}

export interface AnswerList {
  id: number;
  title: string;
  content: string;
  isAdopted: boolean;
  createdAt: string;
}

export interface RankingItemProps {
  ranking: number | null;
  userInfo: {
    userId: string;
    nickname: string;
    points: number;
    profileImage: string | null;
    grade: string;
  };
  isMyData?: boolean;
}

interface DraftData {
  title: string;
  content: string;
  tag: string;
  programmingLanguage: string;
  originalLink: string;
}
