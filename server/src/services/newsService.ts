import { injectable } from "inversify";
import fetch from "node-fetch";
import InternalServerError from "../domain/errors/InternalServerError";
import { NewsViewModel } from "../types/view-models/newsViewModel";
import BadRequestError from "../domain/errors/BadRequestError";

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
			const data = await news.json();
			return data as NewsViewModel[];
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSingleItem(id?: string): Promise<NewsViewModel> {
		if (!id) {
			throw new BadRequestError("News article id is not provided.");
		}

		try {
			const news = await fetch(
				`${this.base_link}${id}?api-key=${process.env.GUARDIANS_API_KEY}&show-fields=all`
			);

			const data = await news.json();
			return data as NewsViewModel;
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSection(section: string): Promise<NewsViewModel[]> {
		try {
			const news = await fetch(
				`${this.base_link}sections?q=${section}&api-key=${process.env.GUARDIANS_API_KEY}`
			);

			const data = await news.json();
			return data as NewsViewModel[];
		} catch (error) {
			throw new InternalServerError();
		}
	}
}
