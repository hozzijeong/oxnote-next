import { Category } from '@/app/category/types';

export type Quiz = {
	title: string;
	explain: string;
	answer: boolean;
	categoryId: Category['id'];
	favorite: boolean;
};

export type QuizInfo = Quiz & {
	id: string;
	tryCount: number;
	wrongCount: number;
};

// export type QuizSelectFilter = Pick<QuizInfo, 'correctRate'> & {
// 	category: number[];
// 	isFirst?: UserAnswer;
// 	favorite?: UserAnswer;
// 	recentCorrect?: UserAnswer;
// };

// export type QuizListItem = Omit<
// 	QuizInfo,
// 	'category' | 'answer' | 'explain' | 'recentCorrect'
// >;

export type QuizFormType = 'edit' | 'add';
