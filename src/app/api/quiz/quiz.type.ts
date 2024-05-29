export type QuizFilterParams = {
	categoryId?: string;
	favorite?: boolean;
	isFirst?: boolean;
	correctRate?: number;
};

export type Quiz = {
	id: string;
	category_id: string;
	title: string;
	explain: string;
	answer: boolean;
	favorite: boolean;
	record: QuizRecord;
};

export type QuizRecord = {
	try_count: number;
	wrong_count: number;
	recent_correct?: boolean;
	correct_rate?: number;
};

export type QuizListResponse = {
	id: string;
	title: string;
	favorite: boolean;
	correctRate: number;
};

export type QuizResponse = Omit<Quiz, 'record' | 'category_id'> & {
	correctRate: number;
	categoryId: string;
};
