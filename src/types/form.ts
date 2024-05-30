export enum UserAnswer {
	NO = 'false',
	YES = 'true',
	NONE = 'null',
}

export type UserAnswerOption = {
	[key in UserAnswer]: string;
};
export type YesOrNo = Exclude<UserAnswer, UserAnswer.NONE>;

export type YesOrNoOption = {
	[key in YesOrNo]: string;
};
