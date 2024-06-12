import { useToast } from '@/components/toast';
import { http } from '@/lib/api';
import { CustomError } from '@/lib/error';
import { QuizInfo } from '@/types';
import { useCallback } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

type UpdateAbleQuizProperty =
	| Pick<QuizInfo, 'favorite'>
	| Pick<QuizInfo, 'record'>
	| Omit<QuizInfo, 'record' | 'categoryId' | 'id'>;

export const useUpdateQuizProperty = (id: string) => {
	const addToast = useToast();

	const { trigger, isMutating, reset } = useSWRMutation<
		{ result: boolean },
		CustomError,
		Key,
		UpdateAbleQuizProperty
	>(`/api/quiz/${id}`, http.patch, {
		onError: (error) => {
			addToast({ message: error.message });
		},
	});

	const updateQuiz = useCallback(
		async (updateProperty: UpdateAbleQuizProperty) => {
			const result = await trigger(updateProperty);
			return result;
		},
		[trigger]
	);

	return { updateQuiz, isMutating, reset };
};
