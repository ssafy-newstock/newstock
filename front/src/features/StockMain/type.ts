export interface IStock {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: string;
  prdyVrss: string;
  prdyCtrt: string;
  acmlTrPbmn: string;
  acmlVol: string;
}

export interface ICategory {
  category: {
    industryName: string;
    bstpNmixPrpr: string;
    bstpNmixPrdyVrss: string;
    bstpNmixPrdyCtrt: string;
    acmlTrPbmn: string;
  };
  imageUrl: string;
}

export interface IMore {
  path: string;
}