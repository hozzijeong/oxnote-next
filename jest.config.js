module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/src/__test__/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
