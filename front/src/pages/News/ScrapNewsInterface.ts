export interface ScrapData {
  id: number;
  title: string;
  subtitle?: string | null;
  media?: string;
  description?: string;
  thumbnail?: string;
  uploadDatetime?: string;
  article?: string;
  sentiment?: string;
  industry?: string;
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
  newsType?: string;
  content?: string;
  newsId?: string;
}

export interface NewsData {
  id: string;
  title: string;
  subtitle?: string | null;
  media?: string;
  description?: string;
  thumbnail?: string;
  uploadDatetime?: string;
  article?: string;
  sentiment?: string;
  industry?: string;
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
  newsType?: string;
  content?: string;
  newsId?: string;
}
