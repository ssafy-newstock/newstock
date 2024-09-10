import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from '@pages/About';
import NotFound from '@pages/NotFound';
import OnBoardingPage from '@pages/OnBoarding';
import NewsMainPage from '@pages/NewsMain';
import EconomicNewsPage from '@pages/EconomicNews';
import EconomicNewsDetailPage from '@pages/EconomicNewsDetail';
import StockNewsPage from '@pages/StockNews';
import StockNewsDetailPage from '@pages/StockNewsDetail';
import SubNewsMainPage from '@pages/SubNewsMain';
import DailyReportPage from '@pages/DailyReport';
import AIChatBotPage from '@pages/AIChatBot';
import MyNewsPage from '@pages/MyNews';
import ScrapCreatePage from '@pages/ScrapCreate';
import ScrapDetailPage from '@pages/ScrapDetail';
import ScrapEditPage from '@pages/ScrapEdit';
import StockMainPage from '@pages/StockMain';
import StockDetailPage from '@pages/StockDetail';
import StockDetailGraphPage from '@pages/StockDetailGraph';
import StockDetailSimilarityPage from '@pages/StockDetailSimilarity';
import MyStockPage from '@pages/MyStock';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // { index: true, element: <Navigate to="/newsMain" replace /> },
      { path: 'onBoarding', element: <OnBoardingPage /> },
      { path: 'newsMain', element: <NewsMainPage /> },
      { 
        path: 'subNewsMain',
        element: <SubNewsMainPage />,
        children: [
          { path: 'economicNews', element: <EconomicNewsPage /> },
          { path: 'economicNewsDetail', element: <EconomicNewsDetailPage /> },
          { path: 'stockNews', element: <StockNewsPage /> },
          { path: 'stockNewsDetail', element: <StockNewsDetailPage /> },
        ],
      },
      { path: 'dailyReport', element: <DailyReportPage /> },
      { path: 'aiChatBot', element: <AIChatBotPage /> },
      { path: 'myNews', element: <MyNewsPage /> },
      { path: 'scrapDetail', element: <ScrapDetailPage /> },
      { path: 'scrapCreate', element: <ScrapCreatePage /> },
      { path: 'scrapEdit', element: <ScrapEditPage /> },
      { path: 'stockMain', element: <StockMainPage /> },
      { 
        path: 'stockDetail',
        element: <StockDetailPage />,
        children: [
          { path: 'stockDetailGraph', element: <StockDetailGraphPage /> },
          { path: 'stockDetailSimilarity', element: <StockDetailSimilarityPage /> },
        ]
      },
      { path: 'myStock', element: <MyStockPage /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

export default router;