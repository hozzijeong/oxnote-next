import { http } from '@/lib/api';
import { QuizInfo } from '@/types';
import { useCallback } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

type UpdateAbleQuizProperty =
	| Pick<QuizInfo, 'favorite'>
	| Pick<QuizInfo, 'record'>
	| Omit<QuizInfo, 'record' | 'categoryId' | 'id'>;

export const useUpdateQuizProperty = (id: string) => {
	const { trigger, isMutating, reset } = useSWRMutation<
		void,
		Error,
		Key,
		UpdateAbleQuizProperty
	>(`/api/quiz/${id}`, http.patch);

	const updateQuiz = useCallback(
		async (updateProperty: UpdateAbleQuizProperty) => {
			const result = await trigger(updateProperty);
			return result;
		},
		[trigger]
	);

	return { updateQuiz, isMutating, reset };
};
