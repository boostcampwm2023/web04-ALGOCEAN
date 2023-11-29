export interface UniqueQuestionItem {
  type: 'today' | 'hot' | 'random';
  title: string;
  url: string;
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

export interface QuestionAnswerCardProps {
  cardData: {
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
  };
}

export interface QuestionAnswerFormCardProps {
  handleCancel: () => void;
  handleSubmit: (content: string) => void;
}
