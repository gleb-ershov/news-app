export interface NewsSummaryViewModel {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: {
		headline: string;
		shortUrl: string;
		thumbnail: string;
	};
}
