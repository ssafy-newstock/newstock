export interface IStock {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlTrPbmn: number;
  acmlVol: number;
}

export interface IApiStock {
  success: boolean;
  data: IStock[];
}

export interface IApiCategory {
  success: boolean;
  data: ICategoryStock[];
}

export interface ICategory {
  category: {
    industryCode: string;
    industryName: string;
    bstpNmixPrpr: string;
    bstpNmixPrdyVrss: string;
    bstpNmixPrdyCtrt: string;
    acmlTrPbmn: string;
  };
  imageUrl: string;
  imageBgColor: string;
  onClick?: () => void;
}

export interface ICategoryStock {
  industryCode: string;
  industryName: string;
  bstpNmixPrpr: string;
  bstpNmixPrdyVrss: string;
  bstpNmixPrdyCtrt: string;
  acmlTrPbmn: string;
}

interface IcategoryDetails {
  url: string;
  bgColor: string;
}
export interface IcategoryImage {
  [key: string]: IcategoryDetails;
}

export interface ICategoryImgWrapper {
  bgColor?: string;
}

export interface IFavoriteStock {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}

export interface IMutationContext {
  previousFavoriteList: IFavoriteStock[] | undefined;
}

export interface IDaily {
  stockId: number;
  stockCode: string;
  stockCandleId: number;
  stockCandleDay: string; // 날짜 형식이 문자열이므로 string으로 처리
  stockCandleOpen: number;
  stockCandleClose: number;
  stockCandleHigh: number;
  stockCandleLow: number;
}

export interface ILive {
  id: string;
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: string;
  time: string; // 시간 형식이 문자열로 제공됨
}

export interface IChartData {
  stockCandleDtoList: IDaily[];
  stocksPriceLiveDailyChartRedisDtoList: ILive[];
}

export interface OutletContext {
  chartData: IChartData; // IChartData는 stockCandleDtoList를 포함하는 데이터 구조
}

export interface FormValues {
  price: number;
  amount: number;
}

export interface TradeFormProps {
  price: number;
  stockCode: string;
}