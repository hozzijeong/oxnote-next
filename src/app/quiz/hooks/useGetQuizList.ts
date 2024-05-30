import type { QuizListResponse } from '@/app/api/quiz/quiz.type';
import { http } from '@/lib/api';
import { setSessionStorage } from '@/lib/storage/session-storage';
import useSWR from 'swr';

// NOTE: 주로 url에 맞춰져 있는 케이스를 따르느라 카멜 케이스를 사용하지 않았는데 이게 괜찮은지 의문임
type Params = {
	'category-id'?: string;
	favorite?: boolean;
	first?: boolean;
	'correct-rate'?: number;
	'recent-correct'?: boolean;
};

export const useGetQuizList = (params: Params = {}) => {
	let query = '';

	for (const [param, value] of Object.entries(params)) {
		query += `${param}=${value}&`;
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
