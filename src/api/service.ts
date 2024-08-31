
import { Article } from '../types/Article';
import axios from 'axios';
const API_KEY =  process.env.REACT_APP_NEWSAPI_KEY
const BASE_URL = 'https://newsapi.org/v2/everything';




export const fetchArticles = async (query: string ): Promise<Article[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};
