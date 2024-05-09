import { http } from '@/lib/api';
import { Quiz, QuizInfo } from '@/types';
import { useCallback } from 'react';

type Props = {
	quizId: string;
};

type UpdateAbleQuizProperty = Pick<QuizInfo, 'favorite' | 'record'>;

type UpdateParameter = Partial<UpdateAbleQuizProperty>;

export const useUpdateQuizProperty = ({ quizId }: Props) => {
	const updateQuiz = useCallback(
		async (updateProperty: UpdateParameter) => {
			const result = await http.patch<void, UpdateParameter>(
				`/api/quiz/${quizId}`,
				updateProperty
			);

			return result;
		},
		[quizId]
	);

	return updateQuiz;
};
