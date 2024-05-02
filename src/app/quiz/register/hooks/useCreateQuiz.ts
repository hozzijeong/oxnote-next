import { http } from '@/lib/api';

type CreateQuizParams = {
	categoryId: string;
	title: string;
	explain: string;
	favorite: boolean;
	answer: boolean;
};

export const useCreateQuiz = () => {
	const createQuiz = async (params: CreateQuizParams) => {
		const data = await http.post<
			CreateQuizParams & { id: string },
			CreateQuizParams
		>('/api/quiz', params);

		return data;
	};

	return createQuiz;
};
