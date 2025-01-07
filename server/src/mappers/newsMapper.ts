import { NewsItemDetailResponse } from "../types/newsApi/newsItemDetailResponse";
import { NewsItemSummaryResponse } from "../types/newsApi/newsItemSummaryResponse";
import { NewsSectionsResponse } from "../types/newsApi/newsSectionResponse";
import { NewsDetailViewModel } from "../types/view-models/newsDetailViewModel";
import { NewsSectionViewModel } from "../types/view-models/newsSectionViewModel";
import { NewsSummaryViewModel } from "../types/view-models/newsSummaryViewModel";

export class NewsMapper {
	constructor() {}

	static toSummaryItemViewModel(
		response: NewsItemSummaryResponse
	): NewsSummaryViewModel[] {
		const {
			response: { results },
		} = response;
		return results.map((article) => {
			return {
				id: article.id,
				type: article.type,
				sectionId: article.sectionId,
				sectionName: article.sectionName,
				webPublicationDate: article.webPublicationDate,
				webTitle: article.webTitle,
				webUrl: article.webUrl,
				apiUrl: article.apiUrl,
				fields: {
					headline: article.fields.headline,
					shortUrl: article.fields.shortUrl,
					thumbnail: article.fields.thumbnail,
				},
			};
		});
	}

	static toDetailItemViewModel(
		response: NewsItemDetailResponse
	): NewsDetailViewModel {
		const {
			response: { content },
		} = response;
		return {
			id: content.id,
			type: content.type,
			sectionId: content.sectionId,
			sectionName: content.sectionName,
			webPublicationDate: content.webPublicationDate,
			webTitle: content.webTitle,
			webUrl: content.webUrl,
			apiUrl: content.apiUrl,
			fields: {
				headline: content.fields.headline,
				standfirst: content.fields.standfirst,
				trailText: content.fields.trailText,
				byline: content.fields.byline,
				publication: content.publication,
				shortUrl: content.shortUrl,
				thumbnail: content.thumbnail,
				bodyText: content.bodyText,
			},
		};
	}

	static toSectionViewModels(
		response: NewsSectionsResponse
	): NewsSectionViewModel[] {
		const {
			response: { results },
		} = response;
		return results.map((section) => {
			return {
				id: section.id,
				webTitle: section.webTitle,
				webUrl: section.webUrl,
			};
		});
	}
}
