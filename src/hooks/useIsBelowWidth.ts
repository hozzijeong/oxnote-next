import { useCallback, useEffect, useState } from 'react';

const useIsBelowWidth = (width: number) => {
	const [isBelowWidth, setIsBelowWidth] = useState(false);
	const handleResize = useCallback(
		() => setIsBelowWidth(width > window.innerWidth),
		[width]
	);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return isBelowWidth;
};

export default useIsBelowWidth;
