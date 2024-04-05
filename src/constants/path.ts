/**
 * 24/03/11
 *  TODO: Quiz 페이지를 나타낼 때 quiz?quizId=''&와 같이 query 형식으로 나타내는 방식이 옳은가?
 *  query형식으로 나타내지 못하는 이유는 quizNavBar때문인데, 이 navBar가 동적으로 할당되고 있기 때문. 즉 navBar에서 적용될 값들이 query안에 있기 떄문에 필터링을 통해 데이터를 받아올 수 있음.
 *  SSR로 변경을 하게 된다면 어떻게 될 수 있을까? (궁금)
 *  */

export const URL_PATH = {
	HOME: '/',
	QUIZ_FORM: '/quiz-register',
	QUIZ: '/quiz',
	QUIZ_EDIT: '/quiz-edit/:id',
	QUIZ_FILTER: '/quiz-filter',
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
