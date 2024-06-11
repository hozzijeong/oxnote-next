import { useToast } from '@/components/toast';
import { http } from '@/lib/api';
import { CustomError } from '@/lib/error';
import { MouseEventHandler } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

const useSubmitAnswer = (id: string) => {
	const addToast = useToast();
	const { trigger, isMutating, reset } = useSWRMutation<
		{ result: boolean },
		CustomError,
		Key,
		{ answer: boolean }
	>(`/api/quiz/${id}`, http.post, {
		onError: (e) => {
			addToast({ message: e.message });
		},
	});

	const submitAnswerHandler =
		(answer: boolean): MouseEventHandler<HTMLButtonElement> =>
		async (event) => {
			event.preventDefault();

			const { result } = await trigger({ answer });

			addToast({ message: result ? '맞았습니다' : '틀렸습니다' });
		};

	return { submitAnswerHandler, isMutating, reset };
};

export default useSubmitAnswer;
