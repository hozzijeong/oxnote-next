import { http } from '@/lib/api';
import { useCallback } from 'react';
import { Key } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

type BodyParams = {
	uid: string;
	email: string | null;
	userName: string | null;
};

type Params<D> = Pick<SWRMutationConfiguration<D, Error>, 'onSuccess'>;

export const useLogin = ({ onSuccess }: Params<void> = {}) => {
	const { trigger, isMutating, reset } = useSWRMutation<
		void,
		Error,
		Key,
		BodyParams
	>('/api/auth', http.post, { onSuccess });

	const login = useCallback(
		async (params: BodyParams) => {
			const result = await trigger(params);
			return result;
		},
		[trigger]
	);

	return { login, isMutating, reset };
};
