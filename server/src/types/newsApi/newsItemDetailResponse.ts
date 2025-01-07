export interface NewsItemDetailResponse {
	response: {
		status: string;
		userTier: string;
		total: number;
		content: Content;
		isHosted: boolean;
		pillarId: string;
		pillarName: string;
	};
}

interface Content {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: Fields;
	newspaperPageNumber: string;
	wordcount: string;
	firstPublicationDate: string;
	isInappropriateForSponsorship: string;
	isPremoderated: string;
	lastModified: string;
	newspaperEditionDate: string;
	productionOffice: string;
	publication: string;
	shortUrl: string;
	shouldHideAdverts: string;
	showInRelatedContent: string;
	thumbnail: string;
	legallySensitive: string;
	lang: string;
	isLive: string;
	bodyText: string;
	charCount: string;
	shouldHideReaderRevenue: string;
	showAffiliateLinks: string;
	bylineHtml: string;
}

interface Fields {
	headline: string;
	standfirst: string;
	trailText: string;
	byline: string;
	main: string;
	body: string;
}
