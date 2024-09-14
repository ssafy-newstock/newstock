import { ICategoryStock, IcategoryImage } from '@features/Stock/types';

// const baseUrl = "https://thumb.tossinvest.com/image/resized/96x0/";

export const categoryImage: IcategoryImage = {
  음식료품: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fhamburger-combo-area.png',
    backgroundColor: '#FFD4D6',
  }, //음식료
  '섬유·의복': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fclothing-area.png',
    backgroundColor: '#C9E2FF',
  }, //의류
  '종이·목재': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fpaper-area.png',
    backgroundColor: '#C9E2FF',
  }, //종이
  화학: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fchemical-beaker-area.png',
    backgroundColor: '#F2F4F6',
  }, //화학
  의약품: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fpharmaceutic-area.png',
    backgroundColor: '#C9E2FF',
  }, //제약
  비금속광물: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fconstruction-materials-area.png',
    backgroundColor: '#FFD4D6',
  }, //건설자재
  '철강·금속': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fsteel-bolt-area.png',
    backgroundColor: '#E5E8EB',
  }, //철강
  기계: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fmachine-blue-area.png',
    backgroundColor: '#90C2FF',
  }, //기계
  '전기·전자': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Felectrical-energy-area.png',
    backgroundColor: '#FFF9E7',
  }, // 전력에너지
  의료정밀: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fmedical-care-area.png',
    backgroundColor: '#90C2FF',
  }, // 의료서비스
  '운수·장비': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fcar-brand-area.png',
    backgroundColor: '#90C2FF',
  }, //자동차
  유통업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fwarehouse-circulation-area.png',
    backgroundColor: '#90C2FF',
  }, //유통
  '전기·가스업': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fpower-plant-yellow-area.png',
    backgroundColor: '#FFEFBF',
  }, //가스에너지
  건설업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fconstruction-company-area.png',
    backgroundColor: '#E5E8EB',
  }, //건설
  '운수·창고': {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Ftransportation-truck-box-area.png',
    backgroundColor: '#FFE0B0',
  }, //운송
  통신업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fphone-communication-area.png',
    backgroundColor: '#BCE9E9',
  }, //통신
  금융업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fcoin-financial-area.png',
    backgroundColor: '#FFEFBF',
  }, //금융
  증권: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fsecurity-area.png',
    backgroundColor: '#FEAFB4',
  }, //증권
  보험: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Finsurance-shield-blue-area.png',
    backgroundColor: '#C9E2FF',
  }, //보험
  서비스업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Foffice-desk-chair-area.png',
    backgroundColor: '#E5E8EB',
  }, //경영지원
  제조업: {
    url: 'https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fml-product%2Fsmartphone-parts-area.png',
    backgroundColor: '#C9E2FF',
  }, //스마트폰 부품
};

export const categoryStock: ICategoryStock[] = [
  {
    industryCode: '0021',
    industryName: '금융업',
    bstpNmixPrpr: '452.65',
    bstpNmixPrdyVrss: '2.33',
    bstpNmixPrdyCtrt: '0.52',
    acmlTrPbmn: '325015',
  },
  {
    industryCode: '0020',
    industryName: '통신업',
    bstpNmixPrpr: '427.69',
    bstpNmixPrdyVrss: '-1.12',
    bstpNmixPrdyCtrt: '-0.26',
    acmlTrPbmn: '27488',
  },
  {
    industryCode: '0009',
    industryName: '의약품',
    bstpNmixPrpr: '15844.39',
    bstpNmixPrdyVrss: '189.96',
    bstpNmixPrdyCtrt: '1.21',
    acmlTrPbmn: '404192',
  },
  {
    industryCode: '0008',
    industryName: '화학',
    bstpNmixPrpr: '3843.85',
    bstpNmixPrdyVrss: '33.87',
    bstpNmixPrdyCtrt: '0.89',
    acmlTrPbmn: '313678',
  },
  {
    industryCode: '0007',
    industryName: '종이·목재',
    bstpNmixPrpr: '262.86',
    bstpNmixPrdyVrss: '1.96',
    bstpNmixPrdyCtrt: '0.75',
    acmlTrPbmn: '1689',
  },
  {
    industryCode: '0006',
    industryName: '섬유·의복',
    bstpNmixPrpr: '216.90',
    bstpNmixPrdyVrss: '2.83',
    bstpNmixPrdyCtrt: '1.32',
    acmlTrPbmn: '4394',
  },
  {
    industryCode: '0005',
    industryName: '음식료품',
    bstpNmixPrpr: '3796.80',
    bstpNmixPrdyVrss: '38.26',
    bstpNmixPrdyCtrt: '1.02',
    acmlTrPbmn: '43342',
  },
  {
    industryCode: '0019',
    industryName: '운수·창고',
    bstpNmixPrpr: '1567.98',
    bstpNmixPrdyVrss: '5.76',
    bstpNmixPrdyCtrt: '0.37',
    acmlTrPbmn: '42277',
  },
  {
    industryCode: '0018',
    industryName: '건설업',
    bstpNmixPrpr: '71.39',
    bstpNmixPrdyVrss: '1.44',
    bstpNmixPrdyCtrt: '2.06',
    acmlTrPbmn: '169426',
  },
  {
    industryCode: '0017',
    industryName: '전기·가스업',
    bstpNmixPrpr: '765.26',
    bstpNmixPrdyVrss: '-1.21',
    bstpNmixPrdyCtrt: '-0.16',
    acmlTrPbmn: '41871',
  },
  {
    industryCode: '0016',
    industryName: '유통업',
    bstpNmixPrpr: '363.69',
    bstpNmixPrdyVrss: '1.10',
    bstpNmixPrdyCtrt: '0.30',
    acmlTrPbmn: '69137',
  },
  {
    industryCode: '0015',
    industryName: '운수·장비',
    bstpNmixPrpr: '2515.26',
    bstpNmixPrdyVrss: '43.35',
    bstpNmixPrdyCtrt: '1.75',
    acmlTrPbmn: '284857',
  },
  {
    industryCode: '0014',
    industryName: '의료정밀',
    bstpNmixPrpr: '1342.09',
    bstpNmixPrdyVrss: '46.65',
    bstpNmixPrdyCtrt: '3.60',
    acmlTrPbmn: '21885',
  },
  {
    industryCode: '0013',
    industryName: '전기·전자',
    bstpNmixPrpr: '25393.48',
    bstpNmixPrdyVrss: '630.94',
    bstpNmixPrdyCtrt: '2.55',
    acmlTrPbmn: '2827222',
  },
  {
    industryCode: '0012',
    industryName: '기계',
    bstpNmixPrpr: '1213.91',
    bstpNmixPrdyVrss: '32.98',
    bstpNmixPrdyCtrt: '2.79',
    acmlTrPbmn: '207016',
  },
  {
    industryCode: '0011',
    industryName: '철강·금속',
    bstpNmixPrpr: '4765.50',
    bstpNmixPrdyVrss: '125.16',
    bstpNmixPrdyCtrt: '2.70',
    acmlTrPbmn: '172042',
  },
  {
    industryCode: '0010',
    industryName: '비금속광물',
    bstpNmixPrpr: '3916.52',
    bstpNmixPrdyVrss: '32.96',
    bstpNmixPrdyCtrt: '0.85',
    acmlTrPbmn: '4225',
  },
  {
    industryCode: '0027',
    industryName: '제조업',
    bstpNmixPrpr: '6653.01',
    bstpNmixPrdyVrss: '135.65',
    bstpNmixPrdyCtrt: '2.08',
    acmlTrPbmn: '4311874',
  },
  {
    industryCode: '0026',
    industryName: '서비스업',
    bstpNmixPrpr: '989.22',
    bstpNmixPrdyVrss: '9.65',
    bstpNmixPrdyCtrt: '0.99',
    acmlTrPbmn: '298628',
  },
  {
    industryCode: '0025',
    industryName: '보험',
    bstpNmixPrpr: '21160.72',
    bstpNmixPrdyVrss: '69.04',
    bstpNmixPrdyCtrt: '0.33',
    acmlTrPbmn: '38370',
  },
  {
    industryCode: '0024',
    industryName: '증권',
    bstpNmixPrpr: '2184.16',
    bstpNmixPrdyVrss: '21.58',
    bstpNmixPrdyCtrt: '1.00',
    acmlTrPbmn: '20231',
  },
];
