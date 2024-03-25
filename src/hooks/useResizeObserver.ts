import { useEffect } from 'react';

type Props = {
	resizeObserverCallback: ResizeObserverCallback;
};

const useResizeObserver = ({ resizeObserverCallback }: Props) => {
	const root = document.body;

	useEffect(() => {
		const resizeObserver = new ResizeObserver(resizeObserverCallback);
		resizeObserver.observe(root);

		return () => {
			resizeObserver.disconnect();
		};
	}, [resizeObserverCallback, root]);
};

export default useResizeObserver;
