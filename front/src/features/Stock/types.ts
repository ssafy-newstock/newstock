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

export interface IcategoryImage {
  음식료품: {
    url: string;
    backgroundColor: string;
  };
  '섬유·의복': {
    url: string;
    backgroundColor: string;
  };
  '종이·목재': {
    url: string;
    backgroundColor: string;
  };
  화학: {
    url: string;
    backgroundColor: string;
  };
  의약품: {
    url: string;
    backgroundColor: string;
  };
  비금속광물: {
    url: string;
    backgroundColor: string;
  };
  '철강·금속': {
    url: string;
    backgroundColor: string;
  };
  기계: {
    url: string;
    backgroundColor: string;
  };
  '전기·전자': {
    url: string;
    backgroundColor: string;
  };
  의료정밀: {
    url: string;
    backgroundColor: string;
  };
  '운수·장비': {
    url: string;
    backgroundColor: string;
  };
  유통업: {
    url: string;
    backgroundColor: string;
  };
  '전기·가스업': {
    url: string;
    backgroundColor: string;
  };
  건설업: {
    url: string;
    backgroundColor: string;
  };
  '운수·창고': {
    url: string;
    backgroundColor: string;
  };
  통신업: {
    url: string;
    backgroundColor: string;
  };
  금융업: {
    url: string;
    backgroundColor: string;
  };
  증권: {
    url: string;
    backgroundColor: string;
  };
  보험: {
    url: string;
    backgroundColor: string;
  };
  서비스업: {
    url: string;
    backgroundColor: string;
  };
  제조업: {
    url: string;
    backgroundColor: string;
  };
}

export interface ICategoryImgWrapper {
  backgroundColor?: string;
}
