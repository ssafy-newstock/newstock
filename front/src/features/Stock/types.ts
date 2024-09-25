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
