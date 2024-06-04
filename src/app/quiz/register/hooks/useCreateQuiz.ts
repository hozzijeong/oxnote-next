import { useToast } from '@/components/toast';
import { http } from '@/lib/api';
import { CustomError } from '@/lib/error';
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
	const addToast = useToast();

	const { trigger, reset, isMutating } = useSWRMutation<
		CreateQuizParams & { id: string },
		CustomError,
		Key,
		CreateQuizParams
	>('/api/quiz', http.post, {
		onError: (error) => {
			addToast({ message: error.message });
		},
	});

	const createQuiz = async (params: CreateQuizParams) => {
		const result = await trigger(params);
		return result;
	};

	return { createQuiz, reset, isMutating };
};
