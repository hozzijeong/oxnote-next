import {
	getSessionStorage,
	setSessionStorage,
} from '@/lib/storage/session-storage';
import { useCallback, useEffect, useState } from 'react';

const useSessionStorage = <T>(
	key: string,
	initialValue: T
): [T, (val: T) => void] => {
	const [state, setState] = useState<T>(getSessionStorage(key, initialValue));

	const updateState = useCallback(
		(newValue: T) => {
			setState(newValue);
			setSessionStorage(key, newValue);
		},
		[key]
	);

	return [state, updateState];
};

export default useSessionStorage;
