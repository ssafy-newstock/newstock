import styled from 'styled-components';
import { IApiStock, ICategoryStock } from '@features/Stock/types';
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
  TextLarge,
  TextLeft,
} from '@features/Stock/styledComponent';
import { useQueryClient } from '@tanstack/react-query';
import { formatUnit } from '@utils/formatUnit';
import blueLogo from '@assets/Stock/blueLogo.png';

interface ModalProps {
  onClose: () => void;
  category: ICategoryStock;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.stockBackgroundColor};
  /* background: white; */
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  max-width: 1000px;
  width: 100%;
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.textColor};
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  :hover {
  }
`;

const Modal: React.FC<ModalProps> = ({ onClose, category }) => {
  const defaultImage = {
    url: 'default-image-url',
    backgroundColor: 'default-bg-color',
  };
  const imageUrl =
    category.industryName in categoryImage
      ? categoryImage[category.industryName as keyof typeof categoryImage]
      : defaultImage;

  const queryClient = useQueryClient();

  // 캐시된 allStock 데이터를 가져옴
  const allStock = queryClient.getQueryData<IApiStock>(['allStockData']);
  console.log('allStock', allStock);
  // 선택한 카테고리에 맞는 주식 필터링
  const filteredStocks = allStock?.data.filter(
    (stock) => stock.stockIndustry === category.industryName
  );
  console.log('filteredStocks', filteredStocks);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {category && (
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <CategoryImgWrapper backgroundColor={imageUrl.backgroundColor}>
              <img src={imageUrl.url} alt="" />
            </CategoryImgWrapper>
            <CategoryCardRow style={{ cursor: 'default' }}>
              <Text>카테고리</Text>
              <Text>지수 현재가</Text>
              <Text>지수 전일 대비</Text>
              <Text>지수 등락률</Text>
              <Text>누적 거래 대금(백만)</Text>
            </CategoryCardRow>
            <CategoryCardRow>
              <TextLarge>{category.industryName}</TextLarge>
              <Text>{category.bstpNmixPrpr}</Text>
              <CategoryData
                isPositive={category.bstpNmixPrdyVrss
                  .toString()
                  .startsWith('-')}
              >
                {formatChange(category.bstpNmixPrdyVrss)}
              </CategoryData>
              <CategoryData
                isPositive={category.bstpNmixPrdyCtrt
                  .toString()
                  .startsWith('-')}
              >
                {formatChange(category.bstpNmixPrdyCtrt)}%
              </CategoryData>
              <Text>{formatNumber(category.acmlTrPbmn)}</Text>
            </CategoryCardRow>
              <Text style={{textAlign:"center"}}>해당 카테고리의 종목들</Text>
              <StockCardRow style={{ cursor: 'default' }}>
                <TextLeft>종목명</TextLeft>
                <Text>현재가</Text>
                <Text>등락률</Text>
                <Text>거래대금</Text>
                <Text>거래량</Text>
              </StockCardRow>
              {filteredStocks?.slice(0, 10).map((stock) => (
                <>
                  <StockCardRow>
                    <StockTitle>
                      <StockImage
                        src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                        onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
                      />
                      {stock.stockName}
                    </StockTitle>
                    <StckPrice>{formatNumber(stock.stckPrpr)}원</StckPrice>
                    <StockPrev
                      isPositive={stock.prdyVrss.toString().startsWith('-')}
                    >
                      {formatChange(formatNumber(stock.prdyVrss))}원 (
                      {stock.prdyCtrt}
                      %)
                    </StockPrev>
                    <Text>{formatUnit(stock.acmlTrPbmn)}</Text>
                    <Text>{formatNumber(stock.acmlVol)}주</Text>
                  </StockCardRow>
                </>
              ))}
          </div>
        )}
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
