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

export interface ICategoryStock {
  industryCode: string;
  industryName: string;
  bstpNmixPrpr: string;
  bstpNmixPrdyVrss: string;
  bstpNmixPrdyCtrt: string;
  acmlTrPbmn: string;
}

export interface IcatergoryImage {
  음식료품: string;
  '섬유·의복': string;
  '종이·목재': string;
  화학: string;
  의약품: string;
  비금속광물: string;
  '철강·금속': string;
  기계: string;
  '전기·전자': string;
  의료정밀: string;
  '운수·장비': string;
  유통업: string;
  '전기·가스업': string;
  건설업: string;
  '운수·창고': string;
  통신업: string;
  금융업: string;
  증권: string;
  보험: string;
  서비스업: string;
  제조업: string;
}

export interface IMore {
  path: string;
}