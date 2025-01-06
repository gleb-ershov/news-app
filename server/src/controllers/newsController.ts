import { inject, injectable } from "inversify";
import { INewsService } from "../services/interfaces/newsService.interface";
import { Request, Response } from "express";
import InternalServerError from "../domain/errors/InternalServerError";
import BadRequestError from "../domain/errors/BadRequestError";

@injectable()
export class NewsController {
	constructor(@inject("NewsService") private newsService: INewsService) {}

	async getLatestNews(req: Request, res: Response) {
		try {
			let page;

			if (typeof req.query.page === "string") {
				page = req.query.page;
			}

			const news = await this.newsService.getLatestNews(page);

			return res.status(200).json(news);
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSingleItem(req: Request, res: Response) {
		try {
			let id;

			if (typeof req.query.id === "string") {
				id = req.query.id;
			}
			const news = await this.newsService.getNewsSingleItem(id);
			return res.status(200).json(news);
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async getNewsSection(req: Request, res: Response) {
		try {
			const section = req.params.section;
			const news = await this.newsService.getNewsSection(section);
			return res.status(200).json(news);
		} catch (error) {
			throw new InternalServerError();
		}
	}
}
