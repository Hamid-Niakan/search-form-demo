export const filters = [
  {
    type: 'text',
    name: 'productName',
    label: 'نام کالا',
    children: null,
    parent: null,
    options: [],
  },
  {
    type: 'checkbox-group',
    name: 'sellerType',
    label: 'نوع فروشنده',
    children: null,
    parent: null,
    options: [
      {
        title: 'فروشنده رسمی',
        value: 'officialSeller',
      },
      {
        title: 'فروشنده برگزیده',
        value: 'preferredSeller',
      },
      {
        title: 'دیجی کالا',
        value: 'digikala',
      },
      {
        title: 'کسب و کارهای بومی',
        value: 'localBusinesses',
      },
    ],
  },
  {
    type: 'checkbox',
    name: 'inStoreItems',
    label: 'فقط کالاهای موجود',
    children: ['store'],
    parent: null,
    options: [],
  },
  {
    type: 'dropdown',
    name: 'store',
    label: 'انبار',
    children: null,
    parent: 'inStoreItems',
    options: [
      {
        title: 'دیجی کالا',
        value: 'digikala',
      },
      {
        title: 'سایر',
        value: 'others',
      },
    ],
  },
  {
    type: 'dropdown',
    name: 'category',
    label: 'دسته‌بندی',
    children: ['brand', 'priceRange'],
    parent: null,
    options: [
      {
        title: 'کتاب و لوازم تحریر',
        value: 'booksAndStationery',
      },
      {
        title: 'کالای دیجیتال',
        value: 'digitalGoods',
      },
      {
        title: 'زیبایی و سلامت',
        value: 'beautyAndHealth',
      },
    ],
  },
  {
    type: 'checkbox-group',
    name: 'brand',
    label: 'برند',
    children: null,
    parent: 'category',
    options: [
      {
        title: 'فابرکاستل',
        value: 'booksAndStationery.fibercastel',
      },
      {
        title: 'پاپکو',
        value: 'booksAndStationery.papco',
      },
      {
        title: 'استدلر',
        value: 'booksAndStationery.stedler',
      },
      {
        title: 'پنتر',
        value: 'booksAndStationery.panter',
      },
      {
        title: 'اورال بی', 
        value: 'beautyAndHealth.oralb',
      },
      {
        title: 'سینره',
        value: 'beautyAndHealth.sinere',
      },
      {
        title: 'مای',
        value: 'beautyAndHealth.my',
      },
      {
        title: 'نیوآ',
        value: 'beautyAndHealth.nivea',
      },
      {
        title: 'اپل',
        value: 'digitalGoods.apple',
      },
      {
        title: 'سامسونگ',
        value: 'digitalGoods.samsung',
      },
      {
        title: 'هوآوی',
        value: 'digitalGoods.hoawi',
      },
      {
        title: 'شیائومی',
        value: 'digitalGoods.shiaomi',
      },
    ],
  },
  {
    type: 'number',
    name: 'priceRange',
    label: 'محدوده قیمت',
    children: null,
    parent: 'category',
    options: [],
  },
];