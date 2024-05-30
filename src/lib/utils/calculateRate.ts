export const calculateCorrectRate = (
	tryCount: number,
	wrongCount: number
): number => {
	if (tryCount === 0) {
		return 0;
	}
	const correctCount = tryCount - wrongCount;
	const correctRate = (correctCount / tryCount) * 100;

	return Math.floor(correctRate);
};
