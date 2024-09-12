export interface IStock {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: string;
  prdyVrss: string;
  prdyCtrt: string;
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