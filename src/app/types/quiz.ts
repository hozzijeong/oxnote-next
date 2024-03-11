import { Category } from '../category/types';
import { UserAnswer, YesOrNo } from './form';

export interface Quiz {
	quiz: string;
	explain: string;
	answer?: YesOrNo;
	favorite?: YesOrNo;
	category: Category['id'];
}

export interface QuizInfo extends Quiz {
	id: string;
	recentCorrect?: number;
	tryCount: number;
	wrongCount: number;
	correctRate?: number;
}

export type QuizSelectFilter = Pick<QuizInfo, 'correctRate'> & {
	category: number[];
	isFirst?: UserAnswer;
	favorite?: UserAnswer;
	recentCorrect?: UserAnswer;
};

export type QuizListItem = Omit<
	QuizInfo,
	'category' | 'answer' | 'explain' | 'recentCorrect'
>;

export type QuizFormType = 'edit' | 'add';
