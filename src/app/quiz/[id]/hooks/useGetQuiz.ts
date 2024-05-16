import { http } from '@/lib/api';
import { QuizInfo } from '@/types';
import useSWR from 'swr';

const useGetQuiz = (id: string) => {
	return useSWR(`/api/quiz/${id}`, http.get<QuizInfo>, {
		suspense: true,
	});
};

export default useGetQuiz;
