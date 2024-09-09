import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@pages/Home';
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
    path: '/onBoarding',
    element: <OnBoardingPage />,
    errorElement: <NotFound />,
  },
  // 질문 1. Home이 있어야 할까? 우린 NewsMain과 StockMain이 Home일 것 같다..
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/newsMain',
    element: <NewsMainPage />,
    errorElement: <NotFound />,
  },
  { 
    path: '/subNewsMain',
    element: <SubNewsMainPage />,
    errorElement: <NotFound />,
    children: [
      { path: 'economicNews', element: <EconomicNewsPage />, errorElement: <NotFound />},
      { path: 'economicNewsDetail', element: <EconomicNewsDetailPage />, errorElement: <NotFound />},
      { path: 'stockNews', element: <StockNewsPage />, errorElement: <NotFound />},
      { path: 'stockNewsDetail', element: <StockNewsDetailPage />, errorElement: <NotFound />},
    ],
  },
  {
    path: '/dailyReport',
    element: <DailyReportPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/aiChatBot',
    element: <AIChatBotPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/myNews',
    element: <MyNewsPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/scrapDetail',
    element: <ScrapDetailPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/scrapCreate',
    element: <ScrapCreatePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/scrapEdit',
    element: <ScrapEditPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/stockMain',
    element: <StockMainPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/stockDetail',
    element: <StockDetailPage />,
    errorElement: <NotFound />,
    children: [
      { path: 'stockDetailGraph', element: <StockDetailGraphPage />, errorElement: <NotFound />},
      { path: 'stockDetailSimilarity', element: <StockDetailSimilarityPage />, errorElement: <NotFound />},
    ]
  },
  {
    path: '/myStock',
    element: <MyStockPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <NotFound />,
  },
]);

const RoutesConfig = () => {
  return <RouterProvider router={router} />;
};

export default RoutesConfig;