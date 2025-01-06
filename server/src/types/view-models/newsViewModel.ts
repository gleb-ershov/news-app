export interface NewsViewModel {
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
		standfirst: string;
		trailText: string;
		byline: string;
		publication: string;
		shortUrl: string;
		thumbnail: string;
		bodyText: string;
	};
}
