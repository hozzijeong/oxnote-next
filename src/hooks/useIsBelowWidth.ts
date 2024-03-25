'use client';

import { useCallback, useState } from 'react';
import useResizeObserver from './useResizeObserver';

const useIsBelowWidth = (width: number) => {
	const [isBelowWidth, setIsBelowWidth] = useState<boolean>(
		window.innerWidth < width
	);

	const windowWidthChangeCallback = useCallback(
		(entries: ResizeObserverEntry[]) => {
			const windowWidth = entries[0].contentRect.width;
			setIsBelowWidth(windowWidth < width);
		},
		[width]
	);

	useResizeObserver({ resizeObserverCallback: windowWidthChangeCallback });

	return isBelowWidth;
};

export default useIsBelowWidth;
