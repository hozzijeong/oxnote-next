import { http } from '@/lib/api';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

type CreateQuizParams = {
	categoryId: string;
	title: string;
	explain: string;
	favorite: boolean;
	answer: boolean;
};

export const useCreateQuiz = () => {
	const { trigger, reset, isMutating } = useSWRMutation<
		CreateQuizParams & { id: string },
		Error,
		Key,
		CreateQuizParams
	>('/api/quiz', http.post);

	const createQuiz = async (params: CreateQuizParams) => {
		const result = await trigger(params);
		return result;
	};

	return { createQuiz, reset, isMutating };
};
