import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { categoryImage } from '@features/Stock/category';
import {
  CategoryCardRow,
  CategoryData,
  CategoryImgWrapper,
  StckPrice,
  StockCardRow,
  StockImage,
  StockPrev,
  StockTitle,
  Text,
  TextBoldLeft,
  TextBold,
  CategoryModalOverlay,
  CategoryModalContent,
  CategoryCloseButton,
} from '@features/Stock/styledComponent';
import { formatUnit } from '@utils/formatUnit';
import blueLogo from '@assets/Stock/blueLogo.png';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryModalProps } from '@features/Stock/types';
import { mapIndustryNames } from '@features/Stock/SectionStock/modal/mapIndustryNames';
import { FlexGapRow } from '@components/styledComponent';

const Modal: React.FC<CategoryModalProps> = ({ onClose, category }) => {
  const navigate = useNavigate();

  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const defaultImage = {
    url: 'default-image-url',
    bgColor: 'default-bg-color',
  };

  const imageUrl =
    category.industryName in categoryImage
      ? categoryImage[category.industryName as keyof typeof categoryImage]
      : defaultImage;

  const wholeStock = useMemo(() => {
    return (allStock || []).concat(top10Stock || []);
  }, [allStock, top10Stock]);

  // 선택한 카테고리에 맞는 주식 필터링
  const filteredStocks = wholeStock
    ?.filter((stock) => {
      const mappedIndustry = mapIndustryNames[category.industryName];

      // 금융업의 경우 은행, 농업, 기타금융을 포함하는지 확인
      if (Array.isArray(mappedIndustry)) {
        return mappedIndustry.includes(stock.stockIndustry);
      }

      // 나머지 경우 매핑된 이름과 일치하는지 확인
      return stock.stockIndustry === mappedIndustry;
    })
    // 거래대금(acmlTrPbmn) 기준 내림차순 정렬
    .sort((a, b) => b.acmlTrPbmn - a.acmlTrPbmn)
    // 상위 10개만 선택
    .slice(0, 10);

  return (
    <CategoryModalOverlay onClick={onClose}>
      <CategoryModalContent onClick={(e) => e.stopPropagation()}>
        {category && (
          <FlexGapRow gap="0.4rem">
            <CategoryImgWrapper $bgColor={imageUrl.bgColor}>
              <img src={imageUrl.url} alt="" />
            </CategoryImgWrapper>

            <CategoryCardRow style={{ cursor: 'default' }}>
              <TextBold>카테고리</TextBold>
              <TextBold>지수 현재가</TextBold>
              <TextBold>지수 전일 대비</TextBold>
              <TextBold>지수 등락률</TextBold>
              <TextBold>누적 거래 대금(백만)</TextBold>
            </CategoryCardRow>

            <CategoryCardRow>
              <StockTitle style={{ justifyContent: 'center' }}>
                {category.industryName}
              </StockTitle>
              <Text>{category.bstpNmixPrpr}</Text>
              <CategoryData
                $isPositive={category.bstpNmixPrdyVrss
                  .toString()
                  .startsWith('-')}
              >
                {formatChange(category.bstpNmixPrdyVrss.toString())}
              </CategoryData>
              <CategoryData
                $isPositive={category.bstpNmixPrdyCtrt
                  .toString()
                  .startsWith('-')}
              >
                {formatChange(category.bstpNmixPrdyCtrt)}%
              </CategoryData>
              <Text>{formatNumber(category.acmlTrPbmn)}</Text>
            </CategoryCardRow>

            <Text
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              관련 종목
            </Text>
            <StockCardRow style={{ cursor: 'default' }}>
              <TextBoldLeft>종목명</TextBoldLeft>
              <TextBold>현재가</TextBold>
              <TextBold>등락률</TextBold>
              <TextBold>거래대금</TextBold>
              <TextBold>거래량</TextBold>
            </StockCardRow>

            {filteredStocks?.map((stock) => (
              <StockCardRow
                key={stock.stockCode}
                onClick={() =>
                  navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
                    state: { stock },
                  })
                }
              >
                <StockTitle>
                  <StockImage
                    src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                    onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
                  />
                  {stock.stockName}
                </StockTitle>
                <StckPrice>{formatNumber(stock.stckPrpr)}원</StckPrice>
                <StockPrev
                  $isPositive={stock.prdyVrss.toString().startsWith('-')}
                >
                  {formatChange(formatNumber(stock.prdyVrss))}원 (
                  {stock.prdyCtrt}
                  %)
                </StockPrev>
                <Text>{formatUnit(stock.acmlTrPbmn)}</Text>
                <Text>{formatNumber(stock.acmlVol)}주</Text>
              </StockCardRow>
            ))}
          </FlexGapRow>
        )}

        <CategoryCloseButton onClick={onClose}>X</CategoryCloseButton>
        
      </CategoryModalContent>
    </CategoryModalOverlay>
  );
};

export default Modal;
