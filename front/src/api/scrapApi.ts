import { axiosInstance } from '@api/axiosInstance';

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
