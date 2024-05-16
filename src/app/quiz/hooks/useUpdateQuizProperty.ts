import { http } from '@/lib/api';
import { QuizInfo } from '@/types';
import { useCallback } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

type UpdateAbleQuizProperty = Pick<QuizInfo, 'favorite' | 'record'>;

type UpdateParameter = Partial<UpdateAbleQuizProperty>;

export const useUpdateQuizProperty = (id: string) => {
	const { trigger, isMutating, reset } = useSWRMutation<
		void,
		Error,
		Key,
		UpdateParameter
	>(`/api/quiz/${id}`, http.patch);

	const updateQuiz = useCallback(
		async (updateProperty: UpdateParameter) => {
			const result = await trigger(updateProperty);
			return result;
		},
		[trigger]
	);

	return { updateQuiz, isMutating, reset };
};
