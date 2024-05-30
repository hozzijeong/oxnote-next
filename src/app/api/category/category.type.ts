export type Category = {
	id: string;
	name: string;
};

export type CategoryInDB = {
	[key in Category['id']]: Category['name'];
};
