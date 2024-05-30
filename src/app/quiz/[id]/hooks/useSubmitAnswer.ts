import { http } from '@/lib/api';
import { MouseEventHandler } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

const useSubmitAnswer = (id: string) => {
	const { trigger, isMutating, reset } = useSWRMutation<
		{ result: boolean },
		Error,
		Key,
		{ answer: boolean }
	>(`/api/quiz/${id}`, http.post);

	const submitAnswerHandler =
		(answer: boolean): MouseEventHandler<HTMLButtonElement> =>
		async (event) => {
			event.preventDefault();

			const { result } = await trigger({ answer });

			console.log(result ? '맞았습니다' : '틀렸습니다');
		};

	return { submitAnswerHandler, isMutating, reset };
};

export default useSubmitAnswer;
