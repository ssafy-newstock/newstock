import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import NotFound from '@pages/NotFound';
import OnBoardingPage from '@pages/OnBoarding';
import NewsMainPage from '@pages/News/NewsMain';
import EconomicNewsPage from '@pages/News/EconomicNews';
import EconomicNewsDetailPage from '@pages/News/EconomicNewsDetail';
import StockNewsPage from '@pages/News/StockNews';
import StockNewsDetailPage from '@pages/News/StockNewsDetail';
import SubNewsMainPage from '@pages/News/SubNewsMain';
import DailyReportPage from '@pages/Etc/DailyReport';
import AIChatBotPage from '@pages/Etc/AIChatBot';
import MyNewsPage from '@pages/News/MyNews';
import ScrapCreatePage from '@pages/Etc/ScrapCreate';
import ScrapDetailPage from '@pages/Etc/ScrapDetail';
import ScrapEditPage from '@pages/Etc/ScrapEdit';
import StockMainPage from '@pages/Stock/StockMain';
import StockDetailPage from '@pages/Stock/StockDetail';
import StockDailyChart from '@pages/Stock/StockDailyChart';
import StockLiveUpdates from '@pages/Stock/StockLiveUpdates';
import MyStockPage from '@pages/Stock/MyStock';
import AllStockPage from '@pages/Stock/AllStock';
import SectionStockPage from '@pages/Stock/SectionStock';
import Auth from '@pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/onboarding" replace /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      { path: 'login/oauth2/code/*', element: <Auth /> },

      // 뉴스 관련
      { path: 'news-main', element: <NewsMainPage /> },
      {
        path: 'subnews-main',
        element: <SubNewsMainPage />,
        children: [
          { path: 'economic-news', element: <EconomicNewsPage /> },
          {
            path: 'economic-news/:newsId',
            element: <EconomicNewsDetailPage />,
          },
          { path: 'stock-news', element: <StockNewsPage /> },
          { path: 'stock-news/:newsId', element: <StockNewsDetailPage /> },
        ],
      },
      // 기타 기능
      { path: 'daily-report', element: <DailyReportPage /> },
      { path: 'ai-chat-bot', element: <AIChatBotPage /> },

      // 스크랩 관련
      { path: 'my-news', element: <MyNewsPage /> },
      { path: 'scrap-detail', element: <ScrapDetailPage /> },
      { path: 'scrap-create', element: <ScrapCreatePage /> },
      { path: 'scrap-edit', element: <ScrapEditPage /> },
      
      //주식 관련
      { path: 'stock-main', element: <StockMainPage /> },
      { path: 'all-stock', element: <AllStockPage /> },
      { path: 'section-stock', element: <SectionStockPage /> },
      {
        path: 'stock-detail/:stockCode',
        element: <StockDetailPage />,
        children: [
          { path: 'daily-chart', element: <StockDailyChart /> },
          {
            path: 'live-updates',
            element: <StockLiveUpdates />,
          },
        ],
      },
      { path: 'my-stock', element: <MyStockPage /> },
    ],
  },
]);

export default router;
