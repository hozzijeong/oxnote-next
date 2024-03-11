const COLORS = ['#d9d9d9', '#a64029', '#1bcc66', '#eb4d3d', '#63c5da'].map(
	(c) => c + '33'
);

export const getRandomColor = () => {
	const index = Math.floor(Math.random() * COLORS.length);
	return COLORS[index];
};
