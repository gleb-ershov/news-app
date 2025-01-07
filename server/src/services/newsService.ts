import { injectable } from "inversify";
import fetch from "node-fetch";
import InternalServerError from "../domain/errors/InternalServerError";
import { NewsViewModel } from "../types/view-models/newsDetailViewModel";
import BadRequestError from "../domain/errors/BadRequestError";
import { NewsSectionViewModel } from "../types/view-models/newsSectionViewModel";
import NotFoundError from "../domain/errors/NotFoundError";
import { NewsItemDetailResponse } from "../types/newsApi/newsItemDetailResponse";
import { NewsItemSummaryResponse } from "../types/newsApi/newsItemSummaryResponse";
import { NewsSectionsResponse } from "../types/newsApi/newsSectionResponse";
import { NewsMapper } from "../mappers/newsMapper";

@injectable()
export class NewsService {
	constructor() {}
	base_link = "https://content.guardianapis.com/";

	async getLatestNews(page?: string): Promise<NewsViewModel[]> {
		const withPage = page ? `page=${page}&` : "";
		let isParamValid = /^\d+$/.test(page || "");
		if (page && !isParamValid) {
			throw new BadRequestError(
				"Page paramter does not support string type."
			);
		}

		try {
			const news = await fetch(
				`${this.base_link}search?${withPage}api-key=${process.env.GUARDIANS_API_KEY}`
			);
			const data = (await news.json()) as NewsItemSummaryResponse[];
			return NewsMapper.toSummaryItemViewModel(data);
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSingleItem(id: string): Promise<NewsViewModel> {
		if (!id) {
			throw new BadRequestError("News article id is not pro	vided.");
		}

		try {
			const news = await fetch(
				`${this.base_link}${id}?api-key=${process.env.GUARDIANS_API_KEY}&show-fields=all`
			);

			if (!news) {
				throw new NotFoundError("Requested article not found.");
			}

			const data = (await news.json()) as NewsItemDetailResponse;
			return NewsMapper.toDetailItemViewModel(data);
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSectionsByQuery(
		section: string
	): Promise<NewsSectionViewModel[]> {
		try {
			const sectionResponse = await fetch(
				`${this.base_link}sections?q=${section}&api-key=${process.env.GUARDIANS_API_KEY}`
			);

			if (!sectionResponse) {
				throw new NotFoundError(
					"News section with this name was not found."
				);
			}

			const data = (await sectionResponse.json()) as NewsSectionsResponse;
			return NewsMapper.toSectionViewModel(data);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	async getAllNewsSections(): Promise<NewsSectionViewModel[]> {
		try {
			const sections = await fetch(
				`${this.base_link}sections?api-key=${process.env.GUARDIANS_API_KEY}`
			);

			const data = (await sections.json()) as NewsSectionsResponse[];
			return NewsMapper.toSectionViewModelList(data);
		} catch (error) {
			throw new InternalServerError();
		}
	}
}
