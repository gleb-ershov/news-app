import { NewsController } from "../../controllers/newsController";
import { INewsService } from "../../services/interfaces/newsService.interface";
import { NewsService } from "../../services/newsService";
import { container } from "../container";

export const newsFactory = () => {
	container.bind<INewsService>("NewsService").to(NewsService);
	container.bind<NewsController>("NewsController").to(NewsController);
};
