import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://i11c103.p.ssafy.io',
});

interface ScrapData {
  title: string;
  context: string;
  droppedCard: {
    Title: string;
    Media: string;
    Date: string;
    keyword?: string;
  };
}

export const createScrap = async (scrapData: ScrapData) => {
  const response = await axiosInstance.post('/api/scrap/create', scrapData);
  return response.data;
};
