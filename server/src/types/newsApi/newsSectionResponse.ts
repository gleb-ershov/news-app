export interface NewsSectionsResponse {
	response: {
		status: string;
		userTier: string;
		total: number;
		startIndex: number;
		pageSize: number;
		currentPage: number;
		pages: number;
		results: Result[];
	};
}

interface Result {
	id: string;
	type: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	sectionId: string;
	sectionName: string;
}
