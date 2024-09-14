import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { categoryImage, categoryStock } from '@features/Stock/category';
import {
  HrTag,
  StockGridColumn,
  StockGridRow,
  StockHeader,
  StockHeaderMore,
} from '@features/Stock/styledComponent';
import FavoriteStock from '@features/Stock/StockMain/FavoriteStock';
import { IStock } from '@features/Stock/types';
import { RealTimeStockFirstRow } from '@features/Stock/StockMain/RealTimeStock';
import RealTimeStock from '@features/Stock/StockMain/RealTimeStock';
import { CategoryFirstRow } from '@features/Stock/StockMain/CategoryStock';
import CategoryStock from '@features/Stock/StockMain/CategoryStock';
import More from '@features/Stock/More';

const stockData = [
  {
    stockCode: '039490',
    stockName: '키움증권',
    stockIndustry: '증권',
    stckPrpr: '125100',
    prdyVrss: '-7000',
    prdyCtrt: '-5.30',
    acmlTrPbmn: '38538368',
    acmlVol: '1332',
  },
  {
    stockCode: '005930',
    stockName: '삼성전자',
    stockIndustry: '반도체',
    stckPrpr: '66100',
    prdyVrss: '1200',
    prdyCtrt: '1.80',
    acmlTrPbmn: '38538368000',
    acmlVol: '111332',
  },
  {
    stockCode: '000660',
    stockName: 'SK하이닉스',
    stockIndustry: '전기전자',
    stckPrpr: '167700',
    prdyVrss: '10500',
    prdyCtrt: '6.68',
    acmlTrPbmn: '38538',
    acmlVol: '111',
  },
];

const StockMainPage = () => {
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>관심 종목</StockHeader>
        <HrTag />
        <StockGridColumn>
          {stockData.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock} />
          ))}
        </StockGridColumn>

        <StockHeaderMore>실시간 차트</StockHeaderMore>
        <More path="/all-stock" />
        <HrTag />
        <StockGridRow>
          <RealTimeStockFirstRow />
          {stockData.map((stock: IStock, index: number) => (
            <RealTimeStock key={index} stock={stock} />
          ))}
        </StockGridRow>

        <StockHeaderMore>카테고리</StockHeaderMore>
        <More path="/section-stock" />
        <HrTag />
        <StockGridRow>
          <CategoryFirstRow />
          {categoryStock.map((category, index: number) => {
            const imageUrl =
              category.industryName in categoryImage
                ? categoryImage[
                    category.industryName as keyof typeof categoryImage
                  ]
                : 'default-image'; // 기본 이미지 처리
            return (
              <CategoryStock key={index} category={category} imageUrl={imageUrl} />
            );
          })}
        </StockGridRow>
      </Center>
    </>
  );
};

export default StockMainPage;
