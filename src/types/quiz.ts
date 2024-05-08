import { Category } from '@/app/category/types';

export type Quiz = {
	id: string;
	title: string;
	explain: string;
	answer: boolean;
	categoryId: Category['id'];
	favorite: boolean;
};

export type QuizRecord = {
	tryCount: number;
	wrongCount: number;
};

export type QuizInfo = Quiz & {
	record: QuizRecord;
};

export type QuizFormType = 'edit' | 'add';
