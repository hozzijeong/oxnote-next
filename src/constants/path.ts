export const URL_PATH = {
	HOME: '/',
	QUIZ_FORM: '/quiz-form',
	QUIZ: '/quiz',
	QUIZ_EDIT: '/quiz/edit/:id',
	QUIZ_FILTER: '/quiz/filter',
	CATEGORY: '/category',
	LOGIN: '/login',
	MY_PAGE: '/my-page',
};

export const NAVBAR_PAGE = [
	URL_PATH.QUIZ_FILTER,
	URL_PATH.CATEGORY,
	URL_PATH.MY_PAGE,
];

export const FIRE_STORE = {
	QUIZ: 'Quiz/data',
	CATEGORY: 'Category',
} as const;
