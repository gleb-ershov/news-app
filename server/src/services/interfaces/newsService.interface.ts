import { NewsSectionViewModel } from "../../types/view-models/newsSectionViewModel";
import { NewsViewModel } from "../../types/view-models/newsDetailViewModel";

export interface INewsService {
	getLatestNews(page?: string): Promise<NewsViewModel[]>;
	getNewsSingleItem(id?: string): Promise<NewsViewModel>;
	getNewsSectionsByQuery(section: string): Promise<NewsSectionViewModel>;
	getAllNewsSections(): Promise<NewsSectionViewModel[]>;
}
