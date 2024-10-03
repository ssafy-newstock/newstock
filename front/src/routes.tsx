import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
// import NotFound from '@pages/NotFound';
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
import DayChart from '@pages/Stock/Chart/DayChart';
import WeekChart from '@pages/Stock/Chart/WeekChart';

import MonthChart from '@pages/Stock/Chart/MonthChart';
import ThreeMonthChart from '@pages/Stock/Chart/ThreeMonthChart';
import YearChart from '@pages/Stock/Chart/YearChart';
import ThreeYearChart from '@pages/Stock/Chart/ThreeYearChart';
import FiveYearChart from '@pages/Stock/Chart/FiveYearChart';

import MyStockPage from '@pages/Stock/MyStock';
import AllStockPage from '@pages/Stock/AllStock';
import SectionStockPage from '@pages/Stock/SectionStock';
import Auth from '@pages/Auth';
import NewsMainSkeleton from '@features/News/skeleton/NewsMainSkeleton';
import EconNewsSkeleton from '@features/News/skeleton/EconNewsSkeleton';
import StockNewsSkeleton from '@features/News/skeleton/StockNewsSkeleton';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
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
            path: 'economic-news/:id',
            element: <EconomicNewsDetailPage />,
          },
          { path: 'stock-news', element: <StockNewsPage /> },
          { path: 'stock-news/:id', element: <StockNewsDetailPage /> },
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
          { path: 'day-chart', element: <DayChart /> },
          {
            path: 'week-chart',
            element: <WeekChart />,
          },
          { path: 'month-chart', element: <MonthChart /> },
          { path: 'three-month-chart', element: <ThreeMonthChart /> },
          { path: 'year-chart', element: <YearChart /> },
          { path: 'three-year-chart', element: <ThreeYearChart /> },
          { path: 'five-year-chart', element: <FiveYearChart /> },
        ],
      },
      { path: 'my-stock', element: <MyStockPage /> },
      { path: 'skeleton', element: <NewsMainSkeleton /> },
      { path: 'econ-skeleton', element: <EconNewsSkeleton /> },
      { path: 'stock-skeleton', element: <StockNewsSkeleton /> },

    ],
  },
]);

export default router;
