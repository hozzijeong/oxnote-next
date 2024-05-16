import type { QuizListResponse } from '@/app/api/quiz/quiz.type';
import { http } from '@/lib/api';
import { setSessionStorage } from '@/lib/storage/session-storage';
import useSWR from 'swr';

type Params = {
	categoryId?: string;
	favorite?: boolean;
	first?: boolean;
	correctRate?: number;
};

export const useGetQuizList = (params: Params = {}) => {
	let query = '';

	for (const [param, value] of Object.entries(params)) {
		if (param === 'categoryId') {
			query += `category-id=${value}&`;
		}

		if (param === 'favorite') {
			query += `favorite=${value}&`;
		}

		if (param === 'first') {
			query += `first=${value}&`;
		}

		if (param === 'correctRate') {
			query += `first=${value}&`;
		}
	}

	return useSWR(`/api/quiz?${query}`, http.get<QuizListResponse[]>, {
		onSuccess: (data) => {
			setSessionStorage<string[]>(
				'quiz-id',
				data.map((quiz) => quiz.id)
			);
		},
		suspense: true,
	});
};
