import express from "express";
import { container } from "../container/container";
import { NewsController } from "../controllers/newsController";
const newsRouter = express.Router();

const newsController = container.get<NewsController>("NewsController");

newsRouter.get("/api/news", (req, res) => {
	newsController.getLatestNews(req, res);
});

newsRouter.get("/api/news/single", (req, res) => {
	newsController.getNewsSingleItem(req, res);
});

newsRouter.get("/api/news/sections/:section", (req, res) => {
	newsController.getNewsSection(req, res);
});

export default newsRouter;
