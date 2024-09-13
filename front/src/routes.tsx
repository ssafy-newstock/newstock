import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from '@pages/About';
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
import StockDetailGraphPage from '@pages/Stock/StockDetailGraph';
import StockDetailSimilarityPage from '@pages/Stock/StockDetailSimilarity';
import MyStockPage from '@pages/Stock/MyStock';
import AllStockPage from '@pages/Stock/AllStock';
import FavoriteStockPage from '@pages/Stock/FavoriteStock';
import SectionStockPage from '@pages/Stock/SectionStock';
import Auth from '@pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // { index: true, element: <Navigate to="/newsMain" replace /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      { path: 'login/oauth2/code/*', element: <Auth /> },
      { path: 'news-main', element: <NewsMainPage /> },
      {
        path: 'subnews-main',
        element: <SubNewsMainPage />,
        children: [
          { path: 'economic-news', element: <EconomicNewsPage /> },
          { path: 'economic-news-detail', element: <EconomicNewsDetailPage /> },
          { path: 'stock-news', element: <StockNewsPage /> },
          { path: 'stock-news-detail', element: <StockNewsDetailPage /> },
        ],
      },
      { path: 'daily-report', element: <DailyReportPage /> },
      { path: 'ai-chat-bot', element: <AIChatBotPage /> },
      { path: 'my-news', element: <MyNewsPage /> },
      { path: 'scrap-detail', element: <ScrapDetailPage /> },
      { path: 'scrap-create', element: <ScrapCreatePage /> },
      { path: 'scrap-edit', element: <ScrapEditPage /> },
      { path: 'stock-main', element: <StockMainPage /> },
      { path: 'all-stock', element: <AllStockPage /> },
      { path: 'favorite-stock', element: <FavoriteStockPage /> },
      { path: 'section-stock', element: <SectionStockPage /> },
      {
        path: 'stock-detail',
        element: <StockDetailPage />,
        children: [
          { path: 'stock-detail-graph', element: <StockDetailGraphPage /> },
          {
            path: 'stock-detail-similarity',
            element: <StockDetailSimilarityPage />,
          },
        ],
      },
      { path: 'my-stock', element: <MyStockPage /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

export default router;
