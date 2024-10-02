// const baseUrl = "https://thumb.tossinvest.com/image/resized/96x0/";

import { IcategoryImage } from '@features/Stock/types';

const baseUrl = 'https://thumb.tossinvest.com/image/resized/96x0/';
const imagePaths = {
  음식료품: 'hamburger-combo-area.png',
  '섬유·의복': 'clothing-area.png',
  '종이·목재': 'paper-area.png',
  화학: 'chemical-beaker-area.png',
  의약품: 'pharmaceutic-area.png',
  비금속광물: 'construction-materials-area.png',
  '철강·금속': 'steel-bolt-area.png',
  기계: 'machine-blue-area.png',
  '전기·전자': 'electrical-energy-area.png',
  의료정밀: 'medical-care-area.png',
  '운수·장비': 'car-brand-area.png',
  유통업: 'warehouse-circulation-area.png',
  '전기·가스업': 'power-plant-yellow-area.png',
  건설업: 'construction-company-area.png',
  '운수·창고': 'transportation-truck-box-area.png',
  통신업: 'phone-communication-area.png',
  금융업: 'coin-financial-area.png',
  증권: 'security-area.png',
  보험: 'insurance-shield-blue-area.png',
  서비스업: 'office-desk-chair-area.png',
  제조업: 'smartphone-parts-area.png',
};

const bgColors = {
  red: '#FFD4D6',
  blue: '#C9E2FF',
  gray: '#E5E8EB',
  lightBlue: '#90C2FF',
  yellow: '#FFEFBF',
  lightYellow: '#FFF9E7',
  lightOrange: '#FFE0B0',
  white: '#F2F4F6',
  pink: '#FEAFB4',
  mint: '#BCE9E9',
};

export const categoryImage: IcategoryImage = {
  음식료품: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.음식료품)}`,
    bgColor: bgColors.red,
  },
  '섬유·의복': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['섬유·의복'])}`,
    bgColor: bgColors.blue,
  },
  '종이·목재': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['종이·목재'])}`,
    bgColor: bgColors.blue,
  },
  화학: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.화학)}`,
    bgColor: bgColors.white,
  },
  의약품: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.의약품)}`,
    bgColor: bgColors.blue,
  },
  비금속광물: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.비금속광물)}`,
    bgColor: bgColors.red,
  },
  '철강·금속': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['철강·금속'])}`,
    bgColor: bgColors.gray,
  },
  기계: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.기계)}`,
    bgColor: bgColors.lightBlue,
  },
  '전기·전자': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['전기·전자'])}`,
    bgColor: bgColors.lightYellow,
  },
  의료정밀: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.의료정밀)}`,
    bgColor: bgColors.lightBlue,
  },
  '운수·장비': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['운수·장비'])}`,
    bgColor: bgColors.lightBlue,
  },
  유통업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.유통업)}`,
    bgColor: bgColors.lightBlue,
  },
  '전기·가스업': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['전기·가스업'])}`,
    bgColor: bgColors.yellow,
  },
  건설업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.건설업)}`,
    bgColor: bgColors.gray,
  },
  '운수·창고': {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths['운수·창고'])}`,
    bgColor: bgColors.lightOrange,
  },
  통신업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.통신업)}`,
    bgColor: bgColors.mint,
  },
  금융업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.금융업)}`,
    bgColor: bgColors.yellow,
  },
  증권: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.증권)}`,
    bgColor: bgColors.pink,
  },
  보험: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.보험)}`,
    bgColor: bgColors.blue,
  },
  서비스업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.서비스업)}`,
    bgColor: bgColors.gray,
  },
  제조업: {
    url: `${baseUrl}${encodeURIComponent('https://static.toss.im/ml-product/' + imagePaths.제조업)}`,
    bgColor: bgColors.blue,
  },
};
