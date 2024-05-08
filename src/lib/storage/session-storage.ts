export const setSessionStorage = <T>(key: string, value: T): void => {
	try {
		const serializedValue = JSON.stringify(value);
		sessionStorage.setItem(key, serializedValue);
	} catch (error) {
		console.error(`Error setting session storage key "${key}":`, error);
	}
};

export const getSessionStorage = <T>(key: string, initialData: T): T => {
	try {
		const serializedValue = sessionStorage.getItem(key);
		return serializedValue ? (JSON.parse(serializedValue) as T) : initialData;
	} catch (error) {
		console.error(`Error getting session storage key "${key}":`, error);

		return initialData;
	}
};
