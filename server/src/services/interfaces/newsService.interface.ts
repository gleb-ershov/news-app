import { NewsSectionViewModel } from "../../types/view-models/newsSectionViewModel";
import { NewsViewModel } from "../../types/view-models/newsViewModel";

export interface INewsService {
	getLatestNews(page?: string): Promise<NewsViewModel[]>;
	getNewsSingleItem(id?: string): Promise<NewsViewModel>;
	getNewsSection(section: string): Promise<NewsSectionViewModel>;
	getAllNewsSections(): Promise<NewsSectionViewModel[]>;
}
