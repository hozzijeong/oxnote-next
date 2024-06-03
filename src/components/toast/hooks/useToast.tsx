import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';

import { Toast, ToastProps } from '..';

const useToast = () => {
	const overlay = useOverlay();

	const addToast = useCallback(
		(params: Omit<ToastProps, 'onClose'>) => {
			overlay.open(({ exit }) => <Toast onClose={exit} {...params} />);
		},
		[overlay]
	);

	return addToast;
};

export default useToast;
