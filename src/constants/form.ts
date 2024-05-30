import { UserAnswer, UserAnswerOption, YesOrNoOption } from '@/types/form';

export const ANSWER_OPTIONS: UserAnswerOption = {
	[UserAnswer.YES]: '예',
	[UserAnswer.NO]: '아니오',
	[UserAnswer.NONE]: '상관 없어요',
};

export const FAVORITE_SELECT: YesOrNoOption = {
	[UserAnswer.YES]: '등록할게요',
	[UserAnswer.NO]: '등록하지 않을래요',
};

export const QUIZ_ANSWER: YesOrNoOption = {
	[UserAnswer.YES]: 'O',
	[UserAnswer.NO]: 'X',
};
